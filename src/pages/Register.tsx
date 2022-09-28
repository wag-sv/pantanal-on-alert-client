import React from 'react';
import { useNavigate } from 'react-router-dom';
import { unMask } from 'node-masker';
import { AuthContext } from '../contexts/AuthContext';
import { isValidCPF } from '../modules/isValidCPF';
import { Loading } from '../components/Loading';
import { api } from '../Services/api';
import { Background } from '../components/Background';
import { ActivateStep, RegisterStep } from '../components/RegisterSteps';
import pantanal from '../assets/images/background/pantanal.jpg';

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

  const handleRegister = async (event: any) => {
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
        setError('Erro inesperado. Tente novamente em alguns instantes.');
      }
    }
  };

  const handleCancelEmaiVerification = () => {
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
      setError('Erro no envio do email. Tente novamente em alguns instantes.');
    }
  };

  const handleActivate = async (event: any) => {
    event.preventDefault();
    if (!newUser.emailToken) setError('Preencha o código de verificação para continuar.');
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
        setError('Erro inesperado. Tente novamente em alguns instantes.');
      }
    }
  };

  const props = {
    newUser,
    error,
    handleChange,
    handleRegister,
    handleCancelEmaiVerification,
    handleResendEmailToken,
    handleActivate,
  };

  return (
    <Background backgroundImage={pantanal}>
      {negotiating && <Loading />}
      {step === 'register' && <RegisterStep props={props} />}
      {step === 'activate' && <ActivateStep props={props} />}
    </Background>
  );
}
