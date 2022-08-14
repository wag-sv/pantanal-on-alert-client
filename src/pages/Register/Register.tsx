import React, { useState, useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { AuthContext } from 'pantanal-client/src/contexts/authContext';

import Loader from 'pantanal-client/src/components/Loader';
import styled from 'styled-components';
import { api } from 'pantanal-client/src/apis/api';

import bgRegister from '../images/bg/bgRegister.jpg';

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
  background-image: url(${bgRegister});
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
  align-items: flex-end;
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

const RegisterForm = styled.form`
  background-color: var(--red);
  width: 600px;
  box-sizing: border-box;
  padding: 30px 50px 30px 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 800px) {
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

const P = styled.p`
  color: white;
  font-size: medium;
  font-weight: 400;
  margin: 25px 0px 0px 0px;
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

export function Register() {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    registerTokenConfirmation: '',
  });

  const [error, setError] = useState({ error: '' });
  const [negotiating, setNegotiating] = useState(false);

  const [step, setStep] = useState('register');

  function handleChange(event) {
    setError({ error: '' });
    if (event.currentTarget.name === 'name') {
      setState({
        ...state,
        [event.currentTarget.name]: event.currentTarget.value.toUpperCase(),
      });
    } else if (event.currentTarget.name === 'email') {
      setState({
        ...state,
        [event.currentTarget.name]: event.currentTarget.value.toLowerCase(),
      });
    } else {
      setState({
        ...state,
        [event.currentTarget.name]: event.currentTarget.value,
      });
    }
  }

  function isValidCPF(cpf) {
    if (typeof cpf !== 'string') return false;
    cpf = cpf.replace(/[\s.-]*/gim, '');
    if (
      !cpf
      || cpf.length !== 11
      || cpf === '00000000000'
      || cpf === '11111111111'
      || cpf === '22222222222'
      || cpf === '33333333333'
      || cpf === '44444444444'
      || cpf === '55555555555'
      || cpf === '66666666666'
      || cpf === '77777777777'
      || cpf === '88888888888'
      || cpf === '99999999999'
    ) {
      return false;
    }
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

  async function handleRegister(event) {
    event.preventDefault();

    if (!state.name || state.name.length > 50) {
      setError({
        error: 'O nome é obrigatório e deve ter no máximo 50 caracteres.',
      });
    } else if (!state.name.includes(' ')) {
      setError({ error: 'Digite o seu nome completo.' });
    } else if (!state.cpf || state.cpf.length !== 11) {
      setError({ error: 'O CPF é obrigatório e deve conter 11 números.' });
    } else if (!isValidCPF(state.cpf)) {
      setError({ error: 'CPF inválido.' });
    } else if (
      !state.email
      || !state.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
    ) {
      setError({
        error:
          'O e-mail é obrigatório e deve ser um endereço de e-mail válido.',
      });
    } else if (
      !state.password
      || !state.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&.]{8,}$/)
    ) {
      setError({
        error:
          'A senha é obrigatória, deve ter pelo menos 8 caracteres, uma letra e um número.',
      });
    } else if (state.password !== state.passwordConfirmation) {
      setError({ error: 'As senhas digitadas são diferentes.' });
    } else {
      setNegotiating(true);
      try {
        await api.post('/register', state);

        setNegotiating(false);
        setStep('activate');
      } catch (err) {
        setNegotiating(false);

        // console.error(err.response.data);
        // setError({ ...err.response.data });
      }
    }
  }

  async function handleActivate(event) {
    event.preventDefault();

    if (!state.registerTokenConfirmation) {
      setError({
        error: 'O código de verificação é obrigatório.',
      });
    } else {
      setNegotiating(true);
      try {
        const response = await api.post('/activate', state);

        authContext.setAuthenticatedUser({ ...response.data });
        localStorage.setItem(
          'authenticatedUser',
          JSON.stringify({ ...response.data }),
        );
        setNegotiating(false);

        history.push('/profile');
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
        {step === 'register' && (
          <RegisterForm onSubmit={handleRegister}>
            <H1>Cadastrar</H1>
            <Line />
            <P>Cadastre-se para receber alertas de possíveis incêndios.</P>
            <Inputs>
              <Row>
                <Column>
                  <Label>Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={state.name}
                    onChange={handleChange}
                    placeholder="Nome completo"
                    maxLength="50"
                    autoComplete="off"
                  />
                </Column>
              </Row>
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
                  <Label>E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    maxLength="50"
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

                <Column>
                  <Label>Confirmar senha</Label>
                  <Input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    value={state.passwordConfirmation}
                    onChange={handleChange}
                    placeholder="Confirmar senha"
                    maxLength="22"
                    autoComplete="off"
                  />
                </Column>
              </Row>
            </Inputs>
            {error.error && <ErrorMessage>{error.error}</ErrorMessage>}
            <GreenButton type="submit">CADASTRAR</GreenButton>

            <Redirect>
              Já é cadastrado? &rarr;
              {' '}
              <StyledFormLink to="/authenticate">ENTRAR</StyledFormLink>
            </Redirect>
          </RegisterForm>
        )}

        {step === 'activate' && (
          <RegisterForm onSubmit={handleActivate}>
            <H1>Verificar Email</H1>
            <Line />
            <P>
              Para finalizar seu cadastro insira o código enviado para o email.
            </P>
            <Inputs>
              <Row>
                <Column>
                  <Label>Código de verificação</Label>
                  <Input
                    id="registerTokenConfirmation"
                    name="registerTokenConfirmation"
                    type="tel"
                    value={state.registerTokenConfirmation}
                    onChange={handleChange}
                    placeholder="Código de verificação"
                    maxLength="6"
                    autoComplete="off"
                  />
                </Column>
              </Row>
            </Inputs>
            {error.error && <ErrorMessage>{error.error}</ErrorMessage>}
            <GreenButton type="submit">CONFIRMAR</GreenButton>
          </RegisterForm>
        )}
      </InnerContent>
    </Content>
  );
}
