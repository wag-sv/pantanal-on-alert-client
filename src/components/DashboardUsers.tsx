import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { api } from '../Services/api';
import { Loading } from './Loading';

import UsersReport from '../reports/UsersReport';
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
  background-color: ${colors.darkRed};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  align-items: center;
  background-color: ${colors.darkRed};
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
    background-color: ${colors.darkRed};
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

const GreenButton100px = styled.button`
  background-color: ${colors.green};
  border: none;
  color: white;
  cursor: pointer;
  height: 40px;
  margin-bottom: 10px;
  width: 100px;
`;

export default function DashboardUsers() {
  const [negotiating, setNegotiating] = useState(false);
  const [users, setUsers] = useState([]);
  const [expand, setExpand] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const dashboardInfo = async () => {
      try {
        setNegotiating(true);
        const response = await api.get('/dashboard_users');
        setUsers([...response.data.users]);
        setNegotiating(false);
      } catch (err) {
        console.error(err);
        setNegotiating(false);
      }
    };

    dashboardInfo();
  }, []);

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? users
    : users.filter(
      (user) => user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
          || user.cpf.toLowerCase().includes(searchTerm.toLocaleLowerCase())
          || user.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
          || user.cellPhone
            ?.toLowerCase()
            .includes(searchTerm.toLocaleLowerCase())
          || (user.isAdmin
            && 'administrador'.includes(searchTerm.toLocaleLowerCase())),
    );

  return (
    <Content>
      {negotiating && <Loading />}
      <H1>Usuários</H1>
      <Line />

      <DashboardSearch>
        <InputLabel>CPF, Nome, Email ou Celular</InputLabel>
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
          {results.length === 1 ? 'usuário' : 'usuários'}
          .
        </h2>
      </DashboardSearch>

      <GreenButton100px
        onClick={() => {
          UsersReport(results);
        }}
      >
        Gerar PDF
      </GreenButton100px>

      <Wrapper>
        {results.map((user) => (
          <Item key={user._id}>
            <Title>
              <span>{user.name}</span>
              {expand !== user._id && (
                <IconContext.Provider
                  value={{ color: '#fdf117', size: '20px' }}
                >
                  <Icon
                    onClick={() => {
                      setExpand(user._id);
                    }}
                  >
                    <MdExpandMore />
                  </Icon>
                </IconContext.Provider>
              )}
              {expand === user._id && (
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
            {expand === user._id && (
              <>
                <Data>
                  <Label>CPF:</Label>
                  {' '}
                  <Info>{user.cpf}</Info>
                  {' '}
                </Data>
                <Divider />
                <Data>
                  <Label>Email:</Label>
                  {' '}
                  <Info>{user.email}</Info>
                  {' '}
                </Data>
                <Divider />
                <Data>
                  <Label>Celular:</Label>
                  {' '}
                  <Info>{user.cellPhone || 'Não cadastrado'}</Info>
                  {' '}
                </Data>
                <Divider />
                <Data>
                  <Label>Tipo de Usuário:</Label>
                  {' '}
                  <Info>{user.isAdmin ? 'Administrador' : 'Padrão'}</Info>
                  {' '}
                </Data>
                <Divider />
                <Data>
                  <Label>Cadastrado em:</Label>
                  {' '}
                  <Info>{new Date(user.createdAt).toLocaleString()}</Info>
                  {' '}
                </Data>
              </>
            )}
          </Item>
        ))}
      </Wrapper>
    </Content>
  );
}
