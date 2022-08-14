import React, { useState, useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../apis/api';
import { AuthContext } from '../contexts/authContext';

import Loader from './Loader';

import bgAuthenticate from '../images/bg/bgAuthenticate.jpg';

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
  background-image: url(${bgAuthenticate});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 40px 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: auto;

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

const AuthenticateForm = styled.form`
  background-color: var(--red);
  width: 450px;
  box-sizing: border-box;
  padding: 30px 50px 30px 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 600px) {
    width: 100%;
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

const Inputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  margin: 25px 0px 20px 0px;
`;

const Row = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  gap: 15px;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Label = styled.label`
  font-size: smaller;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border: none;
  padding-left: 15px;
`;

const GreenButton = styled.button`
  background-color: var(--green);
  width: 100%;
  height: 40px;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Redirect = styled.div`
  color: white;
  font-size: 14px;
  margin-top: 10px;
`;

const StyledFormLink = styled(NavLink)`
  color: var(--yellow);
  text-decoration: none;
  font-weight: 700;
  padding: 3px;
`;

const ErrorMessage = styled.div`
  background-color: var(--red);
  color: yellow;
  width: 100%;
  text-align: center;
  font-size: small;
  margin-bottom: 5px;
`;

export function Authenticate() {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ cpf: '', password: '' });
  const [error, setError] = useState({ error: '' });
  const [negotiating, setNegotiating] = useState(false);

  function handleChange(event) {
    setError({ error: '' });
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!state.cpf || !state.password) {
      setError({
        error: 'Preencha o usuário e a senha para prosseguir.',
      });
    } else {
      setNegotiating(true);
      try {
        const response = await api.post('/authenticate', state);

        authContext.setAuthenticatedUser({ ...response.data });
        localStorage.setItem(
          'authenticatedUser',
          JSON.stringify({ ...response.data }),
        );

        setNegotiating(false);
        history.push('/');
      } catch (err) {
        setNegotiating(false);
        // console.error(err.response.data);
        setError({ ...err.response.data });
      }
    }
  }

  return (
    <Content>
      {negotiating && <Loader />}
      <InnerContent>
        <AuthenticateForm onSubmit={handleSubmit}>
          <H1>Entrar</H1>
          <Line />
          <Inputs>
            <Row>
              <Column>
                <Label>CPF</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  type="tel"
                  value={state.cpf}
                  onChange={handleChange}
                  placeholder="CPF"
                  maxLength="11"
                  autoComplete="off"
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <Label>Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={state.password}
                  onChange={handleChange}
                  placeholder="Senha"
                  maxLength="22"
                  autoComplete="off"
                />
              </Column>
            </Row>
          </Inputs>
          {error.error && <ErrorMessage>{error.error}</ErrorMessage>}
          <GreenButton type="submit">ENTRAR</GreenButton>

          <Redirect>
            Esqueceu a senha? &rarr;
            {' '}
            <StyledFormLink to="/reset">REDEFINIR</StyledFormLink>
          </Redirect>

          <Redirect>
            Não possui cadastro? &rarr;
            {' '}
            <StyledFormLink to="/register">CADASTRAR</StyledFormLink>
          </Redirect>
        </AuthenticateForm>
      </InnerContent>
    </Content>
  );
}
