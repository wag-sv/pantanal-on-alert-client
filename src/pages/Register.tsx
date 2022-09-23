import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { unMask } from 'node-masker';
import { AuthContext } from '../contexts/AuthContext';
import { isValidCPF } from '../modules/isValidCPF';
import { Loading } from '../components/Loading';
import { api } from '../Services/api';
import { Background } from '../components/Background';
import { Box } from '../components/Box';
import { YellowH1 } from '../components/H1';
import { WhiteParagraph, YellowParagraph } from '../components/Paragraph';
import { Form } from '../components/Form';
import { GridLayout } from '../components/GridLayout';
import { Input } from '../components/Input';
import { VerificationInput } from '../components/VerificationInput';
import { AHundredPerCentButton } from '../components/Buttons';
import { GreenButton, LinkButton } from '../components/Button';
import pantanal from '../assets/images/background/pantanal.jpg';
import { colors } from '../resources/theme';

export function Register() {
  const navigate = useNavigate();
  const { setAuthenticatedUser } = React.useContext(AuthContext);
  const [error, setError] = React.useState('');
  const [negotiating, setNegotiating] = React.useState(false);
  const [step, setStep] = React.useState('register');
  const [newUser, setNewUser] = React.useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    emailToken: '',
  });

  const handleChange = (event: any) => {
    setError('');
    const { name, value } = event.target;
    if (name === 'cpf') setNewUser({ ...newUser, [name]: unMask(value) });
    else if (name === 'email') setNewUser({ ...newUser, [name]: value.toLowerCase() });
    else setNewUser({ ...newUser, [name]: value.toUpperCase() });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!newUser.name || newUser.name.length > 50) setError('O nome é obrigatório e deve ter no máximo 50 caracteres.');
    else if (!newUser.name.includes(' ')) setError('Digite o seu nome completo.');
    else if (!newUser.cpf || newUser.cpf.length !== 11) setError('O CPF é obrigatório e deve conter 11 números.');
    else if (!isValidCPF(newUser.cpf)) setError('CPF inválido.');
    else if (!newUser.email || !newUser.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) setError('O e-mail é obrigatório e deve ser um endereço de e-mail válido.');
    else if (!newUser.password || !newUser.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&.]{8,}$/)) setError('A senha é obrigatória, deve ter pelo menos 8 caracteres, uma letra e um número.');
    else if (newUser.password !== newUser.passwordConfirmation) setError('As senhas digitadas são diferentes.');
    else {
      try {
        setNegotiating(true);
        await api.post('/register', newUser);
        setNegotiating(false);
        setNewUser({ ...newUser, emailToken: '' });
        setStep('activate');
      } catch (catched: any) {
        setNegotiating(false);
        setError(catched.response.data.error);
      }
    }
  };

  const handleCancelEmailUpdate = () => {
    setStep('register');
    setError('');
  };

  const handleResendEmailToken = async (event: any) => {
    event.preventDefault();
    try {
      setNegotiating(true);
      await api.post('/resend_activation_token', { cpf: newUser.cpf, email: newUser.email });
      setNegotiating(false);
    } catch (catched: any) {
      setNegotiating(false);
      setError(catched.response.data.error);
    }
  };

  const handleActivate = async (event: any) => {
    event.preventDefault();
    if (!newUser.emailToken) setError('O código de verificação é obrigatório.');
    else {
      try {
        setNegotiating(true);
        const response = await api.post('/activate', newUser);
        const { user, token } = response.data;
        setAuthenticatedUser({ user, token });
        localStorage.setItem('authenticatedUser', JSON.stringify({ user, token }));
        setNegotiating(false);
        setError('');
        navigate('/profile');
      } catch (catched: any) {
        setNegotiating(false);
        setError(catched.response.data.error);
      }
    }
  };

  return (
    <Background backgroundImage={pantanal}>
      {negotiating && <Loading />}
      {step === 'register' && (
        <Box bgColor={colors.red} width="700px">
          <YellowH1>CADASTRAR</YellowH1>
          <WhiteParagraph>Cadastre-se para receber alertas de possíveis incêndios.</WhiteParagraph>
          <Form onSubmit={handleSubmit}>
            <GridLayout
              gridTemplateColumns="1fr 1fr"
              gridTemplateAreas='
                "area1 area1"
                "area2 area2"
                "area3 area3"
                "area4 area5"
              '
            >
              <Input
                label="NOME"
                id="name"
                name="name"
                type="text"
                maxLength={50}
                placeholder="Digite aqui"
                autoComplete="off"
                value={newUser.name}
                onChange={handleChange}
                gridArea="area1"
              />
              <Input
                label="CPF"
                id="cpf"
                name="cpf"
                type="tel"
                maxLength={14}
                placeholder="Digite aqui"
                autoComplete="off"
                value={newUser.cpf}
                mask="999.999.999-99"
                onChange={handleChange}
                gridArea="area2"
              />
              <Input
                label="E-MAIL"
                id="email"
                name="email"
                type="email"
                maxLength={50}
                placeholder="Digite aqui"
                autoComplete="off"
                value={newUser.email}
                onChange={handleChange}
                gridArea="area3"
              />
              <Input
                label="SENHA"
                id="password"
                name="password"
                type="password"
                maxLength={22}
                placeholder="Digite aqui"
                autoComplete="off"
                value={newUser.password}
                onChange={handleChange}
                gridArea="area4"
              />
              <Input
                label="CONFIRMAR SENHA"
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                maxLength={22}
                placeholder="Digite aqui"
                autoComplete="off"
                value={newUser.passwordConfirmation}
                onChange={handleChange}
                gridArea="area5"
              />
            </GridLayout>
            {error && <YellowParagraph>{error}</YellowParagraph>}
            <AHundredPerCentButton>
              <GreenButton type="submit">CADASTRAR</GreenButton>
            </AHundredPerCentButton>
            <LinkButton><Link to="/authenticate">JÁ SOU CADASTRADO</Link></LinkButton>
          </Form>
        </Box>
      )}
      {step === 'activate' && (
        <Box bgColor={colors.red} width="700px">
          <YellowH1>VERIFICAR EMAIL</YellowH1>
          <WhiteParagraph>Para finalizar seu cadastro insira o código enviado para o email.</WhiteParagraph>
          <Form onSubmit={handleActivate}>
            <VerificationInput
              label="CÓDIGO DE VERIFICAÇÃO"
              id="emailToken"
              name="emailToken"
              type="tel"
              maxLength={6}
              placeholder="Digite aqui"
              autoComplete="off"
              value={newUser.emailToken}
              mask="999999"
              onChange={handleChange}
              resend={handleResendEmailToken}
              onCancel={handleCancelEmailUpdate}
            />
            {error && <YellowParagraph>{error}</YellowParagraph>}
          </Form>
        </Box>
      )}
    </Background>
  );
}
