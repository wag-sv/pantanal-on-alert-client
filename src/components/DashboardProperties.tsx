import React, { useState } from 'react';
import styled from 'styled-components';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { Loading } from './Loading';
import { api } from '../Services/api';
import { colors } from '../resources/theme';

const H1 = styled.h1`
  color: white;
  font-weight: 500;
  margin: 15px 0px 5px 0px;
`;

const Line = styled.div`
  background-color: ${colors.yellow};
  height: 1px;
  width: 90px;
`;

const DashboardSearch = styled.div`
  margin: 20px 0px;
  width: 100%;

  input {
    border: none;
    box-sizing: border-box;
    height: 40px;
    margin: 0px 20px 10px 0px;
    padding-left: 15px;
    width: 100%;
  }

  h2 {
    color: ${colors.yellow};
    font-size: smaller;
    margin: 0px 0px;
  }
`;

const InputLabel = styled.label`
  color: white;
  font-size: smaller;
`;

const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: flex-start;
  margin: 0px 0px 20px 0px;
  width: 100%;
`;

const Item = styled.div`
  align-items: flex-start;
  background-color: ${colors.hover};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  align-items: center;
  background-color: ${colors.hover};
  border: none;
  box-sizing: border-box;
  color: white;
  display: flex;
  font-size: smaller;
  height: 40px;
  justify-content: space-between;
  padding: 0px 15px;
  width: 100%;

  @media (max-width: 600px) {
    font-size: 11px;
  }
`;

const Icon = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 30px;
  justify-content: center;
  width: 30px;

  &:hover {
    background-color: ${colors.hover};
  }
`;

const Data = styled.div`
  align-items: center;
  border: none;
  box-sizing: border-box;
  color: ${colors.yellow};
  display: flex;
  font-size: smaller;
  justify-content: flex-start;
  padding: 5px 15px;
  width: 100%;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const Label = styled.span`
  color: ${colors.yellow};
  font-weight: 700;
  margin-right: 15px;
  white-space: nowrap;
`;

const Info = styled.span`
  color: ${colors.yellow};
`;

const Divider = styled.div`
  border-style: dotted none none none;
  border-top: solid 1px ${colors.yellow};
  margin-left: 15px;
  width: calc(100% - 30px);
`;

const Content = styled.div`
  align-items: flex-start;
  background-color: ${colors.red};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 30px 50px 30px 50px;
  width: 700px;

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

const YellowButton100px = styled.button`
  background-color: ${colors.yellow};
  border: none;
  color: ${colors.red};
  cursor: pointer;
  height: 30px;
  margin-bottom: 10px;
  margin-right: 10px;
  width: 100px;
`;

const GreenButton100px = styled.button`
  background-color: ${colors.green};
  border: none;
  color: white;
  cursor: pointer;
  height: 30px;
  margin-bottom: 10px;
  margin-right: 10px;
  width: 100px;
`;

export default function DashboardProperties({ properties, getProperties }: any) {
  const [negotiating, setNegotiating] = useState(false);
  const [expand, setExpand] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? properties
    : properties.filter(
      (property: any) => property.properties.COD_IMOVEL.toLowerCase().includes(
        searchTerm.toLocaleLowerCase(),
      )
          || property.properties.NOM_MUNICI.toLowerCase().includes(
            searchTerm.toLocaleLowerCase(),
          ),
    );

  const handleProperty = async (propertyId: any, action: any) => {
    try {
      setNegotiating(true);
      await api.post('/handle_property', {
        propertyId,
        action,
      });

      await getProperties();
      setNegotiating(false);
    } catch (err) {
      console.error(err);
      setNegotiating(false);
    }
  };

  return (
    <Content>
      {negotiating && <Loading />}
      <H1>Propriedades</H1>
      <Line />

      <DashboardSearch>
        <InputLabel>CAR ou Município</InputLabel>
        <input
          type="text"
          placeholder="Digite aqui para pesquisar"
          value={searchTerm}
          onChange={handleChange}
        />
        <h2>
          Mostrando
          {' '}
          {results.length}
          {' '}
          {results.length === 1 ? 'propriedade' : 'propriedades'}
          .
        </h2>
      </DashboardSearch>

      <Wrapper>
        {results.map((property: any) => (
          <Item key={property._id}>
            <Title>
              <span>{property.properties.COD_IMOVEL}</span>
              {expand !== property._id && (
                <IconContext.Provider
                  value={{ color: '#fdf117', size: '20px' }}
                >
                  <Icon
                    onClick={() => {
                      setExpand(property._id);
                    }}
                  >
                    <MdExpandMore />
                  </Icon>
                </IconContext.Provider>
              )}
              {expand === property._id && (
                <IconContext.Provider
                  value={{ color: '#fdf117', size: '20px' }}
                >
                  <Icon
                    onClick={() => {
                      setExpand('');
                    }}
                  >
                    <MdExpandLess />
                  </Icon>
                </IconContext.Provider>
              )}
            </Title>
            {expand === property._id && (
              <>
                <Data>
                  <Label>Município:</Label>
                  {' '}
                  <Info>{property.properties.NOM_MUNICI}</Info>
                  {' '}
                </Data>
                <Divider />
                <Data>
                  <Label>Estado:</Label>
                  {' '}
                  <Info>{property.properties.COD_ESTADO}</Info>
                  {' '}
                </Data>
                <Divider />
                <Data>
                  <Label>Status no Sistema:</Label>
                  {' '}
                  <Info>{property.disabled ? 'DESATIVADA' : 'ATIVA'}</Info>
                  {' '}
                </Data>
                <Data>
                  {!property.disabled && (
                    <YellowButton100px
                      onClick={() => handleProperty(property._id, 'disable')}
                    >
                      DESATIVAR
                    </YellowButton100px>
                  )}
                  {property.disabled && (
                    <GreenButton100px
                      onClick={() => handleProperty(property._id, 'enable')}
                    >
                      ATIVAR
                    </GreenButton100px>
                  )}
                </Data>
              </>
            )}
          </Item>
        ))}
      </Wrapper>
    </Content>
  );
}
