import React, { useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../contexts/AppContext';
import { colors } from '../resources/theme';
import { api } from '../Services/api';
import { Box } from './Box';
import { GreenButton, YellowButton } from './Button';
import { FlexStartButtons } from './Buttons';
import { WhiteH2 } from './H2';
import { RedH3 } from './H3';
import { Loading } from './Loading';
import { RedParagraph, WhiteParagraph, YellowParagraph } from './Paragraph';
import { SuccessAndLogout } from './SuccessAndLogout';
import { YellowWarningBox } from './WarningBox';

const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: flex-start;
  margin: 0px 0px 20px 0px;
  width: 100%;
`;

const Input = styled.input`
  background-color: ${colors.darkRed};
  border: none;
  cursor: pointer;
  width: 100%;
`;

export function DashboardPropertiesLoader() {
  const { appState, setAppState }: any = React.useContext(AppContext);
  const [negotiating, setNegotiating] = useState(false);
  const [newProperties, setNewProperties] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const nonStandardCoordinates = (result: any) => {
    const lastPolygonPosition = result.features.length - 1 || -1;
    const firstPolygonCoordinates = result?.features[0]?.geometry?.coordinates[0][0] || [];
    const lastPolygonCoordinates = result?.features[lastPolygonPosition]?.geometry?.coordinates[0][0] || [];
    const firstPolygonTest = firstPolygonCoordinates.some((coordinate: any) => coordinate[0].toString().split('.')[1].length > 7 || coordinate[1].toString().split('.')[1].length > 7);
    const lastPolygonTest = lastPolygonCoordinates.some((coordinate: any) => coordinate[0].toString().split('.')[1].length > 7 || coordinate[1].toString().split('.')[1].length > 7);
    return firstPolygonTest || lastPolygonTest;
  };

  const handleFile = (event: any) => {
    const { files } = event.target;
    const reader = new FileReader();
    setError('');
    reader.addEventListener('load', () => {
      if (files[0].type !== 'application/json') setError('O formato de arquivo precisa ser JSON.');
      else {
        const result = typeof reader.result === 'string' ? JSON.parse(reader.result) : null;
        if (result) {
          if (!result?.features || result?.features.length <= 0) setError('Lista de CARS inexistente.');
          else if (!result?.crs?.properties?.name?.includes('4674')) setError('O formato das coordenadas precisa ser EPSG 4674.');
          else if (nonStandardCoordinates(result)) setError('As coordenadas precisam ter no m??ximo 7 casas decimais.');
          else {
            const propertiesWithCorrectedNames = result.features.map((feature: any) => {
              const property = {
                type: feature.type,
                geometry: feature.geometry,
                properties: {
                  COD_IMOVEL: feature.properties.COD_IMOVEL,
                  COD_ESTADO: feature.properties.COD_ESTADO,
                  NOM_MUNICI: feature.properties.NOM_MUNICI,
                  SITUACAO: feature.properties.SITUACAO,
                },
              };
              if (property.properties.NOM_MUNICI === "Gl????????ria D'Oeste") property.properties.NOM_MUNICI = "Gl??ria D'Oeste";
              if (property.properties.NOM_MUNICI === 'Porto Esperidi????????o') property.properties.NOM_MUNICI = 'Porto Esperidi??o';
              if (property.properties.NOM_MUNICI === 'Santo Ant????????nio do Leverger') property.properties.NOM_MUNICI = 'Santo Ant??nio do Leverger';
              if (property.properties.NOM_MUNICI === 'Pocon????????') property.properties.NOM_MUNICI = 'Pocon??';
              if (property.properties.NOM_MUNICI === 'Curvel????????ndia') property.properties.NOM_MUNICI = 'Curvel??ndia';
              if (property.properties.NOM_MUNICI === 'C????????ceres') property.properties.NOM_MUNICI = 'C??ceres';
              if (property.properties.NOM_MUNICI === 'Bar????????o de Melga????????o') property.properties.NOM_MUNICI = 'Bar??o de Melga??o';
              if (property.properties.NOM_MUNICI === 'Lad????????rio') property.properties.NOM_MUNICI = 'Lad??rio';
              if (property.properties.NOM_MUNICI === 'Corumb????????') property.properties.NOM_MUNICI = 'Corumb??';
              return property;
            });
            setNewProperties(propertiesWithCorrectedNames);
          }
        } else setError('Erro no carregamento do arquivo.');
      }
    });
    reader.readAsText(files[0]);
  };

  const uploadProperties = async () => {
    setNegotiating(true);
    try {
      const response = await api.post('/upload_properties', { newProperties });
      setAppState({ ...appState, properties: response.data.newProperties });
      setNewProperties([]);
      setSuccess(true);
      setNegotiating(false);
    } catch (catched: any) {
      setNegotiating(false);
      setError('Erro no procedimento');
    }
  };

  return (
    <>
      {negotiating && <Loading />}
      {success && <SuccessAndLogout />}
      <Box backgroundColor={colors.red} width="700px">
        <WhiteH2>CARREGAR CARS</WhiteH2>
        <Wrapper>
          <YellowWarningBox>
            <RedH3>Aten????o!</RedH3>
            <RedParagraph>O carregamento de CARS substitui todas as propriedades existentes no BANCO DE DADOS. Tenha cautela!</RedParagraph>
            <RedParagraph>O arquivo dever?? estar no formato JSON, com coordenadas no formato EPSG 4674 contendo at?? 7 casas decimais de precis??o.</RedParagraph>
          </YellowWarningBox>
          {error && <YellowParagraph>{error}</YellowParagraph>}
          {newProperties.length <= 0 && <Input type="file" accept="application/json" onChange={handleFile} />}
          {newProperties.length > 0 && (
          <>
            <WhiteParagraph>Confirmar substitui????o de CARS no Banco de Dados?</WhiteParagraph>
            <FlexStartButtons>
              <GreenButton onClick={uploadProperties}>Confirmar</GreenButton>
              <YellowButton onClick={() => setNewProperties([])}>Cancelar</YellowButton>
            </FlexStartButtons>
          </>
          )}
        </Wrapper>
      </Box>
    </>
  );
}
