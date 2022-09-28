import React from 'react';
import { AppContext } from '../contexts/AppContext';
import { api } from '../Services/api';
import { getProperties } from '../modules/getProperties';
import { Loading } from './Loading';
import { Box } from './Box';
import { WhiteH2 } from './H2';
import { Form } from './Form';
import { Input } from './Input';
import { YellowParagraph } from './Paragraph';
import { ExpandableItem } from './ExpandableItem';
import { FlexStartButtons } from './Buttons';
import { SmallYellowButton } from './Button';
import { colors } from '../resources/theme';

export function DashboardProperties() {
  const { appState, setAppState }: any = React.useContext(AppContext);
  const [error, setError] = React.useState('');
  const [negotiating, setNegotiating] = React.useState(false);
  const [show, setShow] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');

  const runGetProperties = async () => {
    const properties = await getProperties();
    if (properties.error) {
      setError(properties.error);
      return;
    }
    setAppState({ ...appState, properties: properties.data });
  };

  const handleEnableProperty = async (propertyId: string) => {
    try {
      setNegotiating(true);
      const disabled = false;
      await api.post('/handle_property', { propertyId, disabled });
      await runGetProperties();
      setNegotiating(false);
    } catch (catched: any) {
      setNegotiating(false);
      setError('Erro inesperado. Tente novamente em alguns instantes.');
    }
  };

  const handleDisableProperty = async (propertyId: string) => {
    try {
      setNegotiating(true);
      const disabled = true;
      await api.post('/handle_property', { propertyId, disabled });
      await runGetProperties();
      setNegotiating(false);
    } catch (catched: any) {
      setNegotiating(false);
      setError('Erro inesperado. Tente novamente em alguns instantes.');
    }
  };

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value.toUpperCase());
  };

  const result = !searchTerm
    ? appState.properties
    : appState.properties.filter(
      (property: any) => property.properties.COD_IMOVEL.toUpperCase().includes(searchTerm.toUpperCase())
        || property.properties.NOM_MUNICI.toUpperCase().includes(searchTerm.toUpperCase()),
    );

  return (
    <Box backgroundColor={colors.red} width="700px">
      {negotiating && <Loading />}
      <WhiteH2>PROPRIEDADES</WhiteH2>
      <Form onSubmit={() => {}}>
        <Input
          label="CAR OU MUNICÍPIO"
          id="searchTerm"
          name="searchTerm"
          maxLength={20}
          autoComplete="off"
          type="text"
          placeholder="Digite aqui para pesquisar"
          value={searchTerm}
          onChange={handleChange}
        />
        <YellowParagraph>{`Mostrando ${result.length} ${result.length === 1 ? 'propriedade' : 'propriedades'}.`}</YellowParagraph>
      </Form>
      {result.map((property: any) => {
        const { _id: id } = property;
        const title = property.properties.COD_IMOVEL;
        const content = {
          Município: property.properties.NOM_MUNICI,
          Estado: property.properties.COD_ESTADO,
          'Status no sistema': property.disabled ? 'DESATIVADA' : 'ATIVADA',
        };

        return (
          <ExpandableItem key={id} id={id} title={title} content={content} show={show} setShow={setShow}>
            {error && <YellowParagraph>{error}</YellowParagraph>}
            <FlexStartButtons>
              {property.disabled && <SmallYellowButton onClick={() => handleEnableProperty(id)}>ATIVAR</SmallYellowButton>}
              {!property.disabled && <SmallYellowButton onClick={() => handleDisableProperty(id)}>DESATIVAR</SmallYellowButton>}
            </FlexStartButtons>
          </ExpandableItem>
        );
      })}
    </Box>
  );
}
