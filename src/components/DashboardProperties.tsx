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

  const handleDisabled = async (property: any) => {
    try {
      setNegotiating(true);
      const propertyId = property._id;
      const disabled = !property.disabled;
      await api.post('/handle_disabled', { propertyId, disabled });
      await runGetProperties();
      setNegotiating(false);
    } catch (catched: any) {
      setNegotiating(false);
      setError('Erro inesperado. Tente novamente em alguns instantes.');
    }
  };

  const handlePriority = async (property: any) => {
    try {
      setNegotiating(true);
      const propertyId = property._id;
      const priority = !property.priority;
      await api.post('/handle_priority', { propertyId, priority });
      await runGetProperties();
      setNegotiating(false);
    } catch (catched: any) {
      setNegotiating(false);
      setError('Erro inesperado. Tente novamente em alguns instantes.');
    }
  };

  const handleIgnitionPoint = async (property: any) => {
    try {
      setNegotiating(true);
      const propertyId = property._id;
      const ignitionPoint = !property.ignitionPoint;
      await api.post('/handle_ignition_point', { propertyId, ignitionPoint });
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
          Prioritária: property.priority ? 'SIM' : 'NÃO',
          'Ponto de ignição': property.ignitionPoint ? 'SIM' : 'NÃO',
        };

        return (
          <ExpandableItem key={id} id={id} title={title} content={content} show={show} setShow={setShow} setError={setError}>
            {error && <YellowParagraph>{error}</YellowParagraph>}
            <FlexStartButtons>
              <SmallYellowButton onClick={() => handleDisabled(property)}>{property.disabled ? 'ATIVAR' : 'DESATIVAR'}</SmallYellowButton>
              <SmallYellowButton onClick={() => handlePriority(property)}>{property.priority ? 'NÃO É PRIORITÁRIA' : 'É PRIORITÁRIA'}</SmallYellowButton>
              <SmallYellowButton onClick={() => handleIgnitionPoint(property)}>{property.ignitionPoint ? 'NÃO É PONTO DE IGNIÇÃO' : 'É PONTO DE IGNIÇÃO'}</SmallYellowButton>
            </FlexStartButtons>
          </ExpandableItem>
        );
      })}
    </Box>
  );
}
