import React, { useState } from 'react';
import styled from 'styled-components';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { Loading } from './Loading';
import { api } from '../Services/api';

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

const DashboardSearch = styled.div`
  width: 100%;
  margin: 20px 0px;

  input {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    border: none;
    padding-left: 15px;
    margin: 0px 20px 10px 0px;
  }

  h2 {
    font-size: smaller;
    color: var(--yellow);
    margin: 0px 0px;
  }
`;

const InputLabel = styled.label`
  font-size: smaller;
  color: white;
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

const Item = styled.div`
  background-color: var(--hover);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled.div`
  background-color: var(--hover);
  font-size: smaller;
  color: white;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border: none;
  padding: 0px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    font-size: 11px;
  }
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--hover);
  }
`;

const Data = styled.div`
  font-size: smaller;
  color: var(--yellow);
  width: 100%;
  box-sizing: border-box;
  border: none;
  padding: 5px 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const Label = styled.span`
  color: var(--yellow);
  font-weight: 700;
  margin-right: 15px;
  white-space: nowrap;
`;

const Info = styled.span`
  color: var(--yellow);
`;

const Divider = styled.div`
  width: calc(100% - 30px);
  border-top: solid 1px var(--yellow);
  border-style: dotted none none none;
  margin-left: 15px;
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
