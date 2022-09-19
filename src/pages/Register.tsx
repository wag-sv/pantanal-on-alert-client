import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { isValidCPF } from '../modules/isValidCPF';
import { Loading } from '../components/Loading';
import { api } from '../Services/api';
import { Background } from '../components/Background';
import { Box } from '../components/Box';
import { Form } from '../components/Form';
import { GridLayout } from '../components/GridLayout';
import { Input } from '../components/Input';
import { AHundredPerCentButton } from '../components/Buttons';
import { GreenButton, YellowButton } from '../components/Button';
import bgRegister from '../assets/images/bg/bgRegister.jpg';
import { WhiteH1 } from '../components/H1';
import { WhiteParagraph } from '../components/Paragraph';

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
    if (name === 'name') setNewUser({ ...newUser, [name]: value.toUpperCase() });
    else if (name === 'email') setNewUser({ ...newUser, [name]: value.toLowerCase() });
    else setNewUser({ ...newUser, [name]: value });
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
      } catch (registrationError: any) {
        setNegotiating(false);
        setError(registrationError.response.data.error);
      }
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
      } catch (activationError: any) {
        setNegotiating(false);
        setError(activationError.response.data.error);
      }
    }
  };

  return (
    <Background backgroundImage={bgRegister}>
      {negotiating && <Loading />}
      {step === 'register' && (
        <Box bgColor="var(--red)" width="700px">
          <WhiteH1>CADASTRAR</WhiteH1>
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
                label="Nome"
                id="name"
                name="name"
                type="text"
                maxLength={50}
                placeholder="Nome completo"
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
                maxLength={11}
                placeholder="CPF"
                autoComplete="off"
                value={newUser.cpf}
                onChange={handleChange}
                gridArea="area2"
              />
              <Input
                label="E-mail"
                id="email"
                name="email"
                type="email"
                maxLength={50}
                placeholder="E-mail"
                autoComplete="off"
                value={newUser.email}
                onChange={handleChange}
                gridArea="area3"
              />
              <Input
                label="Senha"
                id="password"
                name="password"
                type="password"
                maxLength={22}
                placeholder="Senha"
                autoComplete="off"
                value={newUser.password}
                onChange={handleChange}
                gridArea="area4"
              />
              <Input
                label="Confirmar senha"
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                maxLength={22}
                placeholder="Confirmar senha"
                autoComplete="off"
                value={newUser.passwordConfirmation}
                onChange={handleChange}
                gridArea="area5"
              />
            </GridLayout>
            <AHundredPerCentButton>
              <GreenButton type="submit">CADASTRAR</GreenButton>
            </AHundredPerCentButton>
            {error && <div>{error}</div>}
            <div>
              Já é cadastrado? &rarr;
              <Link to="/authenticate">ENTRAR</Link>
            </div>
          </Form>
        </Box>
      )}
      {step === 'activate' && (
        <Box bgColor="var(--red)" width="700px">
          <WhiteH1>VERIFICAR EMAIL</WhiteH1>
          <WhiteParagraph>Para finalizar seu cadastro insira o código enviado para o email.</WhiteParagraph>
          <Form onSubmit={handleActivate}>
            <GridLayout
              gridTemplateColumns="1fr"
              gridTemplateAreas='
                "area1"
              '
            >
              <Input
                label="Código de verificação"
                id="emailToken"
                name="emailToken"
                type="tel"
                maxLength={6}
                placeholder="Código de verificação"
                autoComplete="off"
                value={newUser.emailToken}
                onChange={handleChange}
                gridArea="area1"
              />
            </GridLayout>
            <AHundredPerCentButton>
              <GreenButton type="submit">CONFIRMAR</GreenButton>
            </AHundredPerCentButton>
            <AHundredPerCentButton>
              <YellowButton onClick={() => setStep('register')}>CANCELAR</YellowButton>
            </AHundredPerCentButton>
            {error && <div>{error}</div>}
            <div>
              Já é cadastrado? &rarr;
              <Link to="/authenticate">ENTRAR</Link>
            </div>
          </Form>
        </Box>
      )}
    </Background>
  );
}
