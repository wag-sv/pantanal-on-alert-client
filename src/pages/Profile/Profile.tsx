import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'pantanal-client/src/contexts/authContext';

import styled from 'styled-components';

import PersonalData from 'pantanal-client/src/components/PersonalData';
import MyEmail from 'pantanal-client/src/components/MyEmail';
import MyCellPhone from 'pantanal-client/src/components/MyCellPhone';
import MySubscriptions from 'pantanal-client/src/components/MySubscriptions';
import { api } from 'pantanal-client/src/apis/api';
import bgProfile from '../images/bg/bgProfile.jpg';

const Content = styled.div`
  background-color: white;
  width: 100%;
  height: var(--main-height);
  box-sizing: border-box;
  padding: 0px;
  position: absolute;
  top: var(--header-height);
  z-index: 5000;
`;

const InnerContent = styled.div`
  background-image: url(${bgProfile});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 40px 5%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: auto;
  gap: 30px;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--red);
    background-image: -webkit-linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 0.3) 50%,
      transparent,
      transparent
    );
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const Menu = styled.div`
  background-color: var(--red);
  width: 300px;
  min-width: 270px;
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

const Options = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
  margin: 25px 0px 20px 0px;
`;

const Option = styled.div`
  height: 40px;
  width: 100%;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  div {
    width: 150px;
    padding-left: 10px;
  }

  &:hover {
    background-color: var(--hover);
  }
`;

const ExitOption = styled.div`
  height: 40px;
  width: 100%;
  color: var(--yellow);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  div {
    width: 150px;
    padding-left: 10px;
  }

  &:hover {
    background-color: var(--hover);
  }
`;

export function Profile() {
  const history = useHistory();

  const authContext = useContext(AuthContext);

  const refreshUser = async () => {
    if (authContext.authenticatedUser.token) {
      try {
        const response = await api.post(
          '/refresh_user',
          authContext.authenticatedUser.user,
        );

        authContext.setAuthenticatedUser({ ...response.data });
        localStorage.setItem(
          'authenticatedUser',
          JSON.stringify({ ...response.data }),
        );
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const [state, setState] = useState({
    name: '',
    cpf: '',
    email: '',
    cellPhone: '',
    password: '',
    passwordConfirmation: '',
    emailToken: '',
    cellPhoneToken: '',
    provisionalEmail: '',
    provisionalCellPhone: '',
  });

  const [error, setError] = useState({ error: '' });
  const [option, setOption] = useState('personalData');

  function handleChange(event) {
    setError({ error: '' });
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  function handleLogout() {
    localStorage.removeItem('authenticatedUser');
    authContext.setAuthenticatedUser({});

    history.push('/');
  }

  return (
    <Content>
      <InnerContent>
        <Menu>
          <H1>Meu Perfil</H1>
          <Line />
          <Options>
            <Option onClick={() => setOption('personalData')}>
              <div>Dados Pessoais</div>
            </Option>
            <Option onClick={() => setOption('myEmail')}>
              <div>Meu E-mail</div>
            </Option>

            <Option onClick={() => setOption('myCellPhone')}>
              <div>Meu Celular</div>
            </Option>

            <Option onClick={() => setOption('mySubscriptions')}>
              <div>Minhas Inscrições</div>
            </Option>

            {/* <Option>
              <div>Meus Alertas</div>
            </Option>
            <Option>
              <div>Alterar Senha</div>
            </Option> */}
            <ExitOption onClick={handleLogout}>
              <div>Sair</div>
            </ExitOption>
          </Options>
        </Menu>

        {option === 'personalData' && (
          <PersonalData
            state={state}
            setState={setState}
            error={error}
            setError={setError}
            handleChange={handleChange}
          />
        )}

        {option === 'myEmail' && (
          <MyEmail
            state={state}
            setState={setState}
            error={error}
            setError={setError}
            handleChange={handleChange}
          />
        )}

        {option === 'myCellPhone' && (
          <MyCellPhone
            state={state}
            setState={setState}
            error={error}
            setError={setError}
            handleChange={handleChange}
          />
        )}

        {option === 'mySubscriptions' && <MySubscriptions />}
      </InnerContent>
    </Content>
  );
}
