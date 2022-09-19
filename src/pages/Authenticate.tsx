import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../Services/api';
import { Loading } from '../components/Loading';
import { Background } from '../components/Background';
import { Box } from '../components/Box';
import { Form } from '../components/Form';
import { GridLayout } from '../components/GridLayout';
import { Input } from '../components/Input';
import { AHundredPerCentButton } from '../components/Buttons';
import { GreenButton } from '../components/Button';
import bgAuthenticate from '../assets/images/bg/bgAuthenticate.jpg';
import { WhiteH1 } from '../components/H1';

export function Authenticate() {
  const navigate = useNavigate();
  const { setAuthenticatedUser } = React.useContext(AuthContext);

  const [authenticationData, setAuthenticationData] = React.useState({ cpf: '', password: '' });
  const [error, setError] = React.useState('');
  const [negotiating, setNegotiating] = React.useState(false);

  const handleChange = (event: any) => {
    setError('');
    const { name, value } = event.target;
    setAuthenticationData({ ...authenticationData, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!authenticationData.cpf || !authenticationData.password) {
      setError('Preencha o usuário e a senha para prosseguir.');
      return;
    }
    try {
      setNegotiating(true);
      const response = await api.post('/authenticate', authenticationData);
      setNegotiating(false);
      if (response.data.error) {
        setError(response.data.error);
        return;
      }
      const { user, token } = response.data;
      setAuthenticatedUser({ user, token });
      localStorage.setItem('authenticatedUser', JSON.stringify({ user, token }));
      navigate('/');
    } catch (authenticationError: any) {
      setNegotiating(false);
      setError(authenticationError.response.data.error);
    }
  };

  return (
    <Background backgroundImage={bgAuthenticate}>
      {negotiating && <Loading />}
      <Box bgColor="var(--red)" width="500px">
        <WhiteH1>ENTRAR</WhiteH1>
        <Form onSubmit={handleSubmit}>
          <GridLayout
            gridTemplateColumns="1fr"
            gridTemplateAreas='
              "area1"
              "area2"
            '
          >
            <Input
              label="CPF"
              id="cpf"
              name="cpf"
              type="tel"
              maxLength={11}
              placeholder="CPF"
              autoComplete="off"
              value={authenticationData.cpf}
              onChange={handleChange}
              gridArea="area1"
            />
            <Input
              label="Senha"
              id="password"
              name="password"
              type="password"
              maxLength={22}
              placeholder="Senha"
              autoComplete="off"
              value={authenticationData.password}
              onChange={handleChange}
              gridArea="area2"
            />
          </GridLayout>
          <AHundredPerCentButton>
            <GreenButton type="submit">ENTRAR</GreenButton>
          </AHundredPerCentButton>

          {error && <div>{error}</div>}
          <div>
            Esqueceu a senha? &rarr;
            <Link to="/reset">REDEFINIR</Link>
          </div>
          <div>
            Não possui cadastro? &rarr;
            <Link to="/register">CADASTRAR</Link>
          </div>
        </Form>
      </Box>
    </Background>
  );
}
