import React from 'react';
import { AppContext } from '../contexts/AppContext';
import { api } from '../Services/api';
import { getProperties } from '../modules/getProperties';
import { Loading } from './Loading';
import { Box } from './Box';
import { WhiteH2 } from './H2';
import { ExpandableItem } from './ExpandableItem';
import { colors } from '../resources/theme';
import { FlexStartButtons } from './Buttons';
import { SmallYellowButton } from './Button';
import { YellowParagraph } from './Paragraph';

export default function DashboardProperties() {
  const { appState, setAppState }: any = React.useContext(AppContext);
  const [error, setError] = React.useState('');
  const [negotiating, setNegotiating] = React.useState(false);

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
      setError(catched.response.data.error);
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
      setError(catched.response.data.error);
    }
  };

  return (
    <Box backgroundColor={colors.red} width="700px">
      {negotiating && <Loading />}
      <WhiteH2>PROPRIEDADES</WhiteH2>
      {appState.properties.map((property: any) => {
        const { _id: id } = property;
        const title = property.properties.COD_IMOVEL;
        const content = {
          Município: property.properties.NOM_MUNICI,
          Estado: property.properties.COD_ESTADO,
          'Status no sistema': property.disabled ? 'DESATIVADA' : 'ATIVADA',
        };

        return (
          <ExpandableItem key={id} title={title} content={content}>
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
