import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';
// import MySubscriptions from '../components/MySubscriptions';
import { AuthContext } from '../contexts/AuthContext';
import bgProfile from '../assets/images/bg/bgProfile.jpg';
import { Background } from '../components/Background';
import { Box } from '../components/Box';
import { WhiteH1 } from '../components/H1';
import { Form } from '../components/Form';
import { NonEditableItem } from '../components/NonEditableItem';
import { EditableItem } from '../components/EditableItem';
import { VerificationInput } from '../components/VerificationInput';
import { api } from '../Services/api';

export function Profile() {
  const navigate = useNavigate();
  const { authenticatedUser, setAuthenticatedUser } = React.useContext(AuthContext);
  const [negotiating, setNegotiating] = React.useState(false);
  const [editName, setEditName] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);
  const [editCellPhone, setEditCellPhone] = React.useState(false);
  const [emailUpdateStep, setEmailUpdateStep] = React.useState('edit');
  const [cellPhoneUpdateStep, setCellPhoneUpdateStep] = React.useState('edit');
  const [nameUpdateError, setNameUpdateError] = React.useState('');
  const [emailUpdateError, setEmailUpdateError] = React.useState('');
  const [cellPhonelUpdateError, setCellPhoneUpdateError] = React.useState('');
  const [user, setUser] = React.useState({
    cpf: authenticatedUser.user.cpf,
    name: authenticatedUser.user.name,
    email: authenticatedUser.user.email,
    cellPhone: authenticatedUser.user.cellPhone,
    emailToken: '',
    cellPhoneToken: '',
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === 'name') setNameUpdateError('');
    if (name === 'email') setEmailUpdateError('');
    if (name === 'cellPhone') setCellPhoneUpdateError('');
    setUser({ ...user, [name]: value });
  };

  const handleNameUpdate = async (event: any) => {
    event.preventDefault();
    if (!user.name || user.name.length > 50) setNameUpdateError('O nome é obrigatório e deve ter no máximo 50 caracteres.');
    else {
      try {
        setNegotiating(true);
        const response = await api.post('/update_name', { name: user.name });
        const { updatedUser }: any = response.data;
        setAuthenticatedUser({ ...authenticatedUser, user: updatedUser });
        localStorage.setItem('authenticatedUser', JSON.stringify({ ...authenticatedUser, user: updatedUser }));
        setEditName(false);
        setNegotiating(false);
      } catch (catched: any) {
        setNegotiating(false);
        setNameUpdateError(catched.response.data.error);
      }
    }
  };

  const handleCancelNameUpdate = () => {
    setUser({ ...user, name: authenticatedUser.user.name });
    setNameUpdateError('');
  };

  const handleEmailUpdate = async (event: any) => {
    event.preventDefault();
    if (emailUpdateStep === 'edit') {
      if (!user.email || !user.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) setEmailUpdateError('O e-mail é obrigatório e deve ser um endereço de e-mail válido.');
      else {
        try {
          setNegotiating(true);
          await api.post('/update_email', { email: user.email });
          setEditEmail(false);
          setUser({ ...user, emailToken: '' });
          setEmailUpdateStep('verify');
          setEmailUpdateError('');
          setNegotiating(false);
        } catch (catched: any) {
          setNegotiating(false);
          setEmailUpdateError(catched.response.data.error);
        }
      }
    }
    if (emailUpdateStep === 'verify') {
      if (!user.emailToken) setEmailUpdateError('O código de verificação é obrigatório.');
      else {
        try {
          setNegotiating(true);
          const response = await api.post('/verify_email', { email: user.email, emailToken: user.emailToken });
          const { updatedUser }: any = response.data;
          setAuthenticatedUser({ ...authenticatedUser, user: updatedUser });
          localStorage.setItem('authenticatedUser', JSON.stringify({ ...authenticatedUser, user: updatedUser }));
          setEmailUpdateStep('edit');
          setEmailUpdateError('');
          setNegotiating(false);
        } catch (catched: any) {
          setNegotiating(false);
          setEmailUpdateError(catched.response.data.error);
        }
      }
    }
  };

  const handleResendEmailToken = async (event: any) => {
    event.preventDefault();
    try {
      setNegotiating(true);
      await api.post('/resend_email_token', { email: user.email });
      setNegotiating(false);
    } catch (catched: any) {
      setNegotiating(false);
      setEmailUpdateError(catched.response.data.error);
    }
  };

  const handleCancelEmailUpdate = () => {
    setUser({ ...user, email: authenticatedUser.user.email, emailToken: '' });
    setEmailUpdateStep('edit');
    setEmailUpdateError('');
  };

  const handleCellPhoneUpdate = async (event: any) => {
    event.preventDefault();
    if (cellPhoneUpdateStep === 'edit') {
      if (!user.cellPhone || user.cellPhone.length !== 11) setCellPhoneUpdateError('O telefone celular deve ter 11 números.');
      else {
        try {
          setNegotiating(true);
          await api.post('/update_cell_phone', { cellPhone: user.cellPhone });
          setEditCellPhone(false);
          setUser({ ...user, cellPhoneToken: '' });
          setCellPhoneUpdateStep('verify');
          setCellPhoneUpdateError('');
          setNegotiating(false);
        } catch (catched: any) {
          setNegotiating(false);
          setCellPhoneUpdateError(catched.response.data.error);
        }
      }
    }
    if (cellPhoneUpdateStep === 'verify') {
      if (!user.cellPhoneToken) setCellPhoneUpdateError('O código de verificação é obrigatório.');
      else {
        try {
          setNegotiating(true);
          const response = await api.post('/verify_cellphone', { cellPhone: user.cellPhone, cellPhoneToken: user.cellPhoneToken });
          const { updatedUser }: any = response.data;
          setAuthenticatedUser({ ...authenticatedUser, user: updatedUser });
          localStorage.setItem('authenticatedUser', JSON.stringify({ ...authenticatedUser, user: updatedUser }));
          setCellPhoneUpdateStep('edit');
          setCellPhoneUpdateError('');
          setNegotiating(false);
        } catch (catched: any) {
          setNegotiating(false);
          setCellPhoneUpdateError(catched.response.data.error);
        }
      }
    }
  };

  const handleResendCellPhoneToken = async (event: any) => {
    event.preventDefault();
    try {
      setNegotiating(true);
      await api.post('/resend_cellphone_token', { cellPhone: user.cellPhone });
      setNegotiating(false);
    } catch (catched: any) {
      setNegotiating(false);
      setCellPhoneUpdateError(catched.response.data.error);
    }
  };

  const handleCancelCellPhoneUpdate = () => {
    setUser({ ...user, cellPhone: authenticatedUser.user.cellPhone, cellPhoneToken: '' });
    setCellPhoneUpdateStep('edit');
    setCellPhoneUpdateError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticatedUser');
    setAuthenticatedUser({ token: '', user: {} });
    navigate('/');
  };

  return (
    <Background backgroundImage={bgProfile}>
      {negotiating && <Loading />}
      <Box bgColor="var(--red)" width="700px">
        <WhiteH1>MEU PERFIL</WhiteH1>
        <button type="button" onClick={handleLogout}>SAIR</button>

        <NonEditableItem
          label="CPF"
          value={user.cpf}
        />

        <Form onSubmit={handleNameUpdate}>
          <EditableItem
            label="Nome"
            id="name"
            name="name"
            type="text"
            maxLength={50}
            placeholder="Nome completo"
            autoComplete="off"
            value={user.name}
            onChange={handleChange}
            edit={editName}
            setEdit={setEditName}
            onCancel={handleCancelNameUpdate}
          />
          <span>{nameUpdateError}</span>
        </Form>
        {emailUpdateStep === 'edit' && (
          <Form onSubmit={handleEmailUpdate}>
            <EditableItem
              label="E-mail"
              id="email"
              name="email"
              type="text"
              maxLength={50}
              placeholder="Email"
              autoComplete="off"
              value={user.email}
              onChange={handleChange}
              edit={editEmail}
              setEdit={setEditEmail}
              onCancel={handleCancelEmailUpdate}
            />
            <span>{emailUpdateError}</span>
          </Form>
        )}
        {emailUpdateStep === 'verify' && (
          <Form onSubmit={handleEmailUpdate}>
            <VerificationInput
              label="Código de verificação"
              id="emailToken"
              name="emailToken"
              type="tel"
              maxLength={6}
              placeholder="Código de verificação"
              autoComplete="off"
              value={user.emailToken}
              onChange={handleChange}
              resend={handleResendEmailToken}
              onCancel={handleCancelEmailUpdate}
            />
            <span>{emailUpdateError}</span>
          </Form>
        )}
        {cellPhoneUpdateStep === 'edit' && (
        <Form onSubmit={handleCellPhoneUpdate}>
          <EditableItem
            label="Celular"
            id="cellPhone"
            name="cellPhone"
            type="cellPhone"
            maxLength={11}
            placeholder="Celular"
            autoComplete="off"
            value={user.cellPhone}
            onChange={handleChange}
            edit={editCellPhone}
            setEdit={setEditCellPhone}
            onCancel={handleCancelCellPhoneUpdate}
          />
          <span>{cellPhonelUpdateError}</span>
        </Form>
        )}
        {cellPhoneUpdateStep === 'verify' && (
          <Form onSubmit={handleCellPhoneUpdate}>
            <VerificationInput
              label="Código de verificação"
              id="cellPhoneToken"
              name="cellPhoneToken"
              type="tel"
              maxLength={6}
              placeholder="Código de verificação"
              autoComplete="off"
              value={user.cellPhoneToken}
              onChange={handleChange}
              resend={handleResendCellPhoneToken}
              onCancel={handleCancelCellPhoneUpdate}
            />
            <span>{cellPhonelUpdateError}</span>
          </Form>
        )}
        {/* <MySubscriptions /> */}
      </Box>
    </Background>
  );
}
