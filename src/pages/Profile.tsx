import React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../Services/api';
import { Loading } from '../components/Loading';
import { Background } from '../components/Background';
import { Box } from '../components/Box';
import { YellowH1 } from '../components/H1';
import { Form } from '../components/Form';
import { NonEditableItem } from '../components/NonEditableItem';
import { EditableItem } from '../components/EditableItem';
import { VerificationInput } from '../components/VerificationInput';
import { DeleteableItem } from '../components/DeleteableItem';
import { YellowParagraph } from '../components/Paragraph';
import { WhiteH2 } from '../components/H2';
import { Subscriptios } from '../components/Subscriptios';
import { colors } from '../resources/theme';
import pantanal from '../assets/images/background/pantanal.jpg';

export function Profile() {
  const { authenticatedUser, setAuthenticatedUser } = React.useContext(AuthContext);
  const [error, setError] = React.useState('');
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

  const refreshUser = async () => {
    if (authenticatedUser.token) {
      try {
        setNegotiating(true);
        const response = await api.post('/refresh_user', authenticatedUser.user);
        setNegotiating(false);
        if (response.data.error) {
          setError('N??o foi poss??vel recuperar os dados do usu??rio neste momento. Tente novamente em alguns instantess.');
          return;
        }
        setAuthenticatedUser({ ...response.data });
        localStorage.setItem('authenticatedUser', JSON.stringify({ ...response.data }));
      } catch (catched: any) {
        setNegotiating(false);
        setError('N??o foi poss??vel recuperar os dados do usu??rio neste momento. Tente novamente em alguns instantes.');
      }
    }
  };

  React.useEffect(() => {
    refreshUser();
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === 'name') setNameUpdateError('');
    if (name === 'email') setEmailUpdateError('');
    if (name === 'cellPhone') setCellPhoneUpdateError('');
    if (name === 'name') setUser({ ...user, [name]: value.toUpperCase() });
    else if (name === 'email') setUser({ ...user, [name]: value.toLowerCase() });
    else setUser({ ...user, [name]: value });
  };

  const handleNameUpdate = async (event: any) => {
    event.preventDefault();
    if (!user.name || user.name.length > 50) setNameUpdateError('O nome ?? obrigat??rio e deve ter no m??ximo 50 caracteres.');
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
        setNameUpdateError('Erro ao atualizar o nome. Tente novamente em alguns instantes.');
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
      if (!user.email || !user.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) setEmailUpdateError('O e-mail ?? obrigat??rio e deve ser um endere??o de e-mail v??lido.');
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
          setEmailUpdateError('Erro no envio do email. Tente novamente em alguns instantes.');
        }
      }
    }
    if (emailUpdateStep === 'verify') {
      if (!user.emailToken) setEmailUpdateError('O c??digo de verifica????o ?? obrigat??rio.');
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
          setEmailUpdateError('Erro na verifica????o do email. Tente novamente em alguns instantes.');
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
      setEmailUpdateError('Erro no envio do email. Tente novamente em alguns instantes.');
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
      if (!user.cellPhone || user.cellPhone.length !== 11) setCellPhoneUpdateError('O telefone celular deve ter 11 n??meros.');
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
          setCellPhoneUpdateError('Erro no envio do SMS. Tente novamente em alguns instantes.');
        }
      }
    }
    if (cellPhoneUpdateStep === 'verify') {
      if (!user.cellPhoneToken) setCellPhoneUpdateError('O c??digo de verifica????o ?? obrigat??rio.');
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
          setCellPhoneUpdateError('Erro na verifica????o do celular. Tente novamente em alguns instantes.');
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
      setCellPhoneUpdateError('Erro no envio do SMS. Tente novamente em alguns instantes.');
    }
  };

  const handleCancelCellPhoneUpdate = () => {
    setUser({ ...user, cellPhone: authenticatedUser.user.cellPhone, cellPhoneToken: '' });
    setCellPhoneUpdateStep('edit');
    setCellPhoneUpdateError('');
  };

  return (
    <Background backgroundImage={pantanal}>
      {negotiating && <Loading />}
      <Box backgroundColor={colors.red} width="700px">
        <YellowH1>MEU PERFIL</YellowH1>
        {error && <YellowParagraph>{error}</YellowParagraph>}
        {!error && (
        <>
          <NonEditableItem
            label="CPF"
            value={user.cpf}
            mask="999.999.999-99"
          />
          <Form onSubmit={handleNameUpdate}>
            <EditableItem
              label="NOME"
              id="name"
              name="name"
              type="text"
              maxLength={50}
              placeholder="Digite aqui"
              autoComplete="off"
              value={user.name}
              onChange={handleChange}
              edit={editName}
              setEdit={setEditName}
              cancel={handleCancelNameUpdate}
            />
            <YellowParagraph>{nameUpdateError}</YellowParagraph>
          </Form>
          {emailUpdateStep === 'edit' && (
          <Form onSubmit={handleEmailUpdate}>
            <EditableItem
              label="E-MAIL"
              id="email"
              name="email"
              type="email"
              maxLength={50}
              placeholder="Digite aqui"
              autoComplete="off"
              value={user.email}
              onChange={handleChange}
              edit={editEmail}
              setEdit={setEditEmail}
              cancel={handleCancelEmailUpdate}
            />
            <YellowParagraph>{emailUpdateError}</YellowParagraph>
          </Form>
          )}
          {emailUpdateStep === 'verify' && (
          <Form onSubmit={handleEmailUpdate}>
            <VerificationInput
              label="C??DIGO DE VERIFICA????O"
              id="emailToken"
              name="emailToken"
              type="tel"
              maxLength={6}
              placeholder="Digite aqui"
              autoComplete="off"
              value={user.emailToken}
              onChange={handleChange}
              resend={handleResendEmailToken}
              cancel={handleCancelEmailUpdate}
            />
            <YellowParagraph>{emailUpdateError}</YellowParagraph>
          </Form>
          )}
          {cellPhoneUpdateStep === 'edit' && (
          <Form onSubmit={handleCellPhoneUpdate}>
            <EditableItem
              label="CELULAR"
              id="cellPhone"
              name="cellPhone"
              type="cellPhone"
              maxLength={11}
              placeholder="Digite aqui"
              autoComplete="off"
              value={user.cellPhone}
              onChange={handleChange}
              edit={editCellPhone}
              setEdit={setEditCellPhone}
              cancel={handleCancelCellPhoneUpdate}
            />
            <YellowParagraph>{cellPhonelUpdateError}</YellowParagraph>
          </Form>
          )}
          {cellPhoneUpdateStep === 'verify' && (
          <Form onSubmit={handleCellPhoneUpdate}>
            <VerificationInput
              label="C??DIGO DE VERIFICA????O"
              id="cellPhoneToken"
              name="cellPhoneToken"
              type="tel"
              maxLength={6}
              placeholder="Digite aqui"
              autoComplete="off"
              value={user.cellPhoneToken}
              onChange={handleChange}
              resend={handleResendCellPhoneToken}
              cancel={handleCancelCellPhoneUpdate}
            />
            <YellowParagraph>{cellPhonelUpdateError}</YellowParagraph>
          </Form>
          )}
          <Subscriptios>
            <WhiteH2>MINHAS INSCRI????ES</WhiteH2>
            {authenticatedUser.user.subscriptions && authenticatedUser.user.subscriptions.map((subscription: any) => (
              <DeleteableItem
                key={subscription.propertyCode}
                subscription={subscription}
              />
            ))}
          </Subscriptios>
        </>
        )}
      </Box>
    </Background>
  );
}
