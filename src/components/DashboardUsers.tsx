import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { api } from '../Services/api';
import { Loading } from './Loading';

import UsersReport from '../reports/UsersReport';

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

const GreenButton100px = styled.button`
  background-color: var(--green);
  width: 100px;
  height: 40px;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
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
