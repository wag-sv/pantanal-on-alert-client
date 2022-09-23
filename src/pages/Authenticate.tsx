import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { unMask } from 'node-masker';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../Services/api';
import { Loading } from '../components/Loading';
import { Background } from '../components/Background';
import { Box } from '../components/Box';
import { YellowH1 } from '../components/H1';
import { Form } from '../components/Form';
import { Input } from '../components/Input';
import { YellowParagraph } from '../components/Paragraph';
import { AHundredPerCentButton } from '../components/Buttons';
import { GreenButton, LinkButton } from '../components/Button';
import pantanal from '../assets/images/background/pantanal.jpg';
import { colors } from '../resources/theme';

export function Authenticate() {
  const navigate = useNavigate();
  const { setAuthenticatedUser } = React.useContext(AuthContext);

  const [authenticationData, setAuthenticationData] = React.useState({ cpf: '', password: '' });
  const [error, setError] = React.useState('');
  const [negotiating, setNegotiating] = React.useState(false);

  const handleChange = (event: any) => {
    setError('');
    const { name, value } = event.target;
    if (name === 'cpf') setAuthenticationData({ ...authenticationData, [name]: unMask(value) });
    else setAuthenticationData({ ...authenticationData, [name]: value });
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
    } catch (catched: any) {
      setNegotiating(false);
      setError(catched.response.data.error);
    }
  };

  return (
    <Background backgroundImage={pantanal}>
      {negotiating && <Loading />}
      <Box bgColor={colors.red} width="500px">
        <YellowH1>ENTRAR</YellowH1>
        <Form onSubmit={handleSubmit}>
          <Input
            label="CPF"
            id="cpf"
            name="cpf"
            type="tel"
            maxLength={14}
            placeholder="Digite aqui"
            autoComplete="off"
            value={authenticationData.cpf}
            mask="999.999.999-99"
            onChange={handleChange}
            gridArea="area1"
          />
          <Input
            label="SENHA"
            id="password"
            name="password"
            type="password"
            maxLength={22}
            placeholder="Digite aqui"
            autoComplete="off"
            value={authenticationData.password}
            onChange={handleChange}
            gridArea="area2"
          />
          {error && <YellowParagraph>{error}</YellowParagraph>}
          <AHundredPerCentButton>
            <GreenButton type="submit">ENTRAR</GreenButton>
          </AHundredPerCentButton>
          <LinkButton><Link to="/reset">ESQUECI MINHA SENHA</Link></LinkButton>
          <LinkButton><Link to="/register">QUERO ME CADASTRAR</Link></LinkButton>
        </Form>
      </Box>
    </Background>
  );
}
