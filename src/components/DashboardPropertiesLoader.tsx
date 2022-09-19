import React, { useState } from 'react';
import styled from 'styled-components';
import { api } from '../Services/api';
import { Loading } from './Loading';

const H1 = styled.h1`
  color: white;
  font-weight: 500;
  margin: 15px 0px 5px 0px;
`;

const Line = styled.div`
  width: 90px;
  background-color: var(--yellow);
  height: 1px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  margin: 0px 0px 20px 0px;
`;

const Content = styled.div`
  background-color: var(--red);
  width: 700px;
  box-sizing: border-box;
  padding: 30px 50px 30px 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 900px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    padding: 20px 50px 20px 50px;
  }

  @media (max-width: 400px) {
    padding: 20px 30px 20px 30px;
  }
`;

const Caution = styled.div`
  background-color: var(--yellow);
  color: var(--red);
  width: 100%;
  height: 80px;
  border: none;
  border-radius: 7px;
  margin: 30px 0px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Input = styled.input`
  background-color: var(--hover);
  width: 100%;
  border: none;
  cursor: pointer;
`;

const Confirmation = styled.div`
  width: 100%;
  color: white;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const YellowButton100px = styled.button`
  background-color: var(--yellow);
  width: 100px;
  height: 30px;
  color: var(--red);
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 10px;
`;

const GreenButton100px = styled.button`
  background-color: var(--green);
  width: 100px;
  height: 30px;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export default function DashboardPropertiesLoader({ getProperties }: any) {
  const [negotiating, setNegotiating] = useState(false);
  const [newProperties, setNewProperties] = useState([]);
  const [fileError, setFileError] = useState('');

  const handleFile = (event: any) => {
    const { files } = event.target;
    const reader = new FileReader();
    setFileError('');

    reader.addEventListener('load', () => {
      if (files[0].type !== 'application/json') {
        setFileError('O formato de arquivo precisa ser JSON.');
      } else {
        const result = JSON.parse(reader.result);

        if (!result?.crs?.properties?.name?.includes('4674')) {
          setFileError('O formato das coordenadas precisa ser EPSG 4674.');
        } else if (!result?.features || result?.features.length <= 0) {
          setFileError('Lista de CARS inexistente.');
        } else if (
          result?.features[0]?.geometry?.coordinates[0][0]?.some(
            (coordinate) => coordinate[0].toString().split('.')[1].length > 7
              || coordinate[1].toString().split('.')[1].length > 7,
          )
          || result?.features[
            result?.features.length - 1
          ]?.geometry?.coordinates[0][0]?.some(
            (coordinate) => coordinate[0].toString().split('.')[1].length > 7
              || coordinate[1].toString().split('.')[1].length > 7,
          )
        ) {
          setFileError(
            'As coordenadas precisam ter no máximo 7 casas decimais.',
          );
        } else {
          const formattedProperties = result.features.map((feature: any) => {
            if (feature.properties.NOM_MUNICI === "GlÃƒÂ³ria D'Oeste") {
              feature.properties.NOM_MUNICI = "Glória D'Oeste";
            }

            if (feature.properties.NOM_MUNICI === 'Porto EsperidiÃƒÂ£o') {
              feature.properties.NOM_MUNICI = 'Porto Esperidião';
            }

            if (
              feature.properties.NOM_MUNICI === 'Santo AntÃƒÂ´nio do Leverger'
            ) {
              feature.properties.NOM_MUNICI = 'Santo Antônio do Leverger';
            }

            if (feature.properties.NOM_MUNICI === 'PoconÃƒÂ©') {
              feature.properties.NOM_MUNICI = 'Poconé';
            }

            if (feature.properties.NOM_MUNICI === 'CurvelÃƒÂ¢ndia') {
              feature.properties.NOM_MUNICI = 'Curvelândia';
            }

            if (feature.properties.NOM_MUNICI === 'CÃƒÂ¡ceres') {
              feature.properties.NOM_MUNICI = 'Cáceres';
            }

            if (feature.properties.NOM_MUNICI === 'BarÃƒÂ£o de MelgaÃƒÂ§o') {
              feature.properties.NOM_MUNICI = 'Barão de Melgaço';
            }

            if (feature.properties.NOM_MUNICI === 'LadÃƒÂ¡rio') {
              feature.properties.NOM_MUNICI = 'Ladário';
            }

            if (feature.properties.NOM_MUNICI === 'CorumbÃƒÂ¡') {
              feature.properties.NOM_MUNICI = 'Corumbá';
            }

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

            return property;
          });

          setNewProperties([...formattedProperties]);
        }
      }
      event.target.value = null;
    });

    reader.readAsText(files[0]);
  };

  const uploadProperties = async () => {
    setNegotiating(true);
    try {
      await api.post('/upload_properties', { newProperties });

      getProperties();
      setNewProperties([]);
      setNegotiating(false);
    } catch (err) {
      console.error(err);
      setFileError('Erro de comunicação. Tente novamente mais tarde.');
      setNegotiating(false);
    }
  };

  return (
    <Content>
      {negotiating && <Loading />}
      <H1>Carregar</H1>
      <Line />

      <Wrapper>
        <Caution>
          <strong>Atenção!</strong>
          {' '}
          O carregamento de CARS substitui todas as
          propriedades existentes no BANCO DE DADOS. Tenha cautela!
        </Caution>
        {newProperties.length <= 0 && (
          <Input type="file" accept="application/json" onChange={handleFile} />
        )}

        {fileError && <div>{fileError}</div>}

        {newProperties.length > 0 && (
          <>
            <Confirmation>
              Confirmar substituição de CARS no Banco de Dados?
            </Confirmation>
            <Buttons>
              <GreenButton100px onClick={uploadProperties}>
                Confirmar
              </GreenButton100px>
              <YellowButton100px
                onClick={() => {
                  setNewProperties([]);
                }}
              >
                Cancelar
              </YellowButton100px>
            </Buttons>
          </>
        )}
      </Wrapper>
    </Content>
  );
}
