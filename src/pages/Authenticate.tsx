import React from 'react';
import { useNavigate } from 'react-router-dom';
import { unMask } from 'node-masker';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../Services/api';
import { Loading } from '../components/Loading';
import { Background } from '../components/Background';
import {
  AuthenticateStep, ResetPasswordStep, SendResetEmailStep, SuccessStep,
} from '../components/AuthenticateSteps';
import pantanal from '../assets/images/background/pantanal.jpg';

export function Authenticate() {
  const navigate = useNavigate();
  const { setAuthenticatedUser } = React.useContext(AuthContext);
  const [error, setError] = React.useState('');
  const [negotiating, setNegotiating] = React.useState(false);
  const [step, setStep] = React.useState('authenticate');
  const [authenticationData, setAuthenticationData] = React.useState({
    cpf: '',
    password: '',
    passwordConfirmation: '',
    maskedEmail: '',
    emailToken: '',
  });

  const handleChange = (event: any) => {
    setError('');
    const { name, value } = event.target;
    if (name === 'cpf') setAuthenticationData({ ...authenticationData, [name]: unMask(value) });
    else setAuthenticationData({ ...authenticationData, [name]: value });
  };

  const handleAuthentication = async (event: any) => {
    event.preventDefault();
    const { cpf, password } = authenticationData;
    if (!cpf || !password) {
      setError('Preencha o CPF e a senha para continuar.');
      return;
    }
    try {
      setNegotiating(true);
      const response = await api.post('/authenticate', { cpf, password });
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

  const handleSendResetEmail = async (event: any) => {
    event.preventDefault();
    const { cpf } = authenticationData;
    if (!cpf) {
      setError('Preencha o CPF para continuar.');
    } else {
      try {
        setNegotiating(true);
        const response = await api.post('/send_reset_email', { cpf });
        setNegotiating(false);
        if (response.data.error) {
          setError(response.data.error);
          return;
        }
        const { maskedEmail } = response.data;
        setError('');
        setAuthenticationData({ ...authenticationData, maskedEmail, emailToken: '' });
        setStep('resetPassword');
      } catch (catched: any) {
        setNegotiating(false);
        setError(catched.response.data.error);
      }
    }
  };

  const handleResetPassword = async (event: any) => {
    event.preventDefault();
    const {
      cpf, emailToken, password, passwordConfirmation,
    } = authenticationData;
    if (!emailToken) setError('Preencha o código de verificação para continuar.');
    else if (!password) setError('Preencha a senha para continuar.');
    else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&.]{8,}$/)) setError('A senha deve ter pelo menos 8 caracteres, uma letra e um número.');
    else if (password !== passwordConfirmation) setError('As senhas digitadas são diferentes.');
    else {
      try {
        setNegotiating(true);
        await api.post('/reset_password', { cpf, emailToken, password });
        setNegotiating(false);
        setError('');
        setStep('success');
      } catch (catched: any) {
        setNegotiating(false);
        setError(catched.response.data.error);
      }
    }
  };

  const handleChangeStep = (newStep: string) => {
    setError('');
    if (newStep === 'sendResetEmail') {
      setAuthenticationData({ ...authenticationData, password: '' });
      setStep('sendResetEmail');
      return;
    }
    if (newStep === 'authenticate') {
      setAuthenticationData({
        ...authenticationData, password: '', passwordConfirmation: '', maskedEmail: '', emailToken: '',
      });
      setStep('authenticate');
    }
  };

  const props = {
    authenticationData,
    error,
    handleChange,
    handleAuthentication,
    handleSendResetEmail,
    handleResetPassword,
    handleChangeStep,
  };

  return (
    <Background backgroundImage={pantanal}>
      {negotiating && <Loading />}
      {step === 'authenticate' && <AuthenticateStep props={props} />}
      {step === 'sendResetEmail' && <SendResetEmailStep props={props} />}
      {step === 'resetPassword' && <ResetPasswordStep props={props} />}
      {step === 'success' && <SuccessStep props={props} />}
    </Background>
  );
}
