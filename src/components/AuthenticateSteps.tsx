import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from './Box';
import { YellowH1 } from './H1';
import { WhiteParagraph, YellowParagraph } from './Paragraph';
import { Form } from './Form';
import { Input } from './Input';
import { VerificationInputSimplified } from './VerificationInputSimplified';
import { AHundredPerCentButton } from './Buttons';
import { GreenButton, LinkButton } from './Button';
import { YellowSpan } from './Span';
import { colors } from '../resources/theme';

export function AuthenticateStep({ props }: any) {
  const {
    authenticationData, error, handleChange, handleAuthentication, handleChangeStep,
  } = props;
  return (
    <Box backgroundColor={colors.red} width="500px">
      <YellowH1>ENTRAR</YellowH1>
      <Form onSubmit={handleAuthentication}>
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
        />
        {error && <YellowParagraph>{error}</YellowParagraph>}
        <AHundredPerCentButton>
          <GreenButton type="submit">ENTRAR</GreenButton>
          <LinkButton onClick={() => handleChangeStep('sendResetEmail')}>ESQUECI MINHA SENHA</LinkButton>
          <LinkButton><Link to="/register">QUERO ME CADASTRAR</Link></LinkButton>
        </AHundredPerCentButton>
      </Form>
    </Box>
  );
}

export function SendResetEmailStep({ props }: any) {
  const {
    authenticationData, error, handleChange, handleSendResetEmail, handleChangeStep,
  } = props;
  return (
    <Box backgroundColor={colors.red} width="500px">
      <YellowH1>ESQUECI MINHA SENHA</YellowH1>
      <WhiteParagraph>Para qual CPF deseja redefinir a senha?</WhiteParagraph>
      <Form onSubmit={handleSendResetEmail}>
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
        />
        {error && <YellowParagraph>{error}</YellowParagraph>}
        <AHundredPerCentButton>
          <GreenButton type="submit">SOLICITAR</GreenButton>
          <LinkButton onClick={() => handleChangeStep('authenticate')}>CANCELAR</LinkButton>
        </AHundredPerCentButton>
      </Form>
    </Box>
  );
}

export function ResetPasswordStep({ props }: any) {
  const {
    authenticationData, error, handleChange, handleSendResetEmail, handleResetPassword, handleChangeStep,
  } = props;
  return (
    <Box backgroundColor={colors.red} width="500px">
      <YellowH1>REDEFINIR SENHA</YellowH1>
      <WhiteParagraph>
        Insira o código enviado para
        <YellowSpan>{` ${authenticationData.maskedEmail} `}</YellowSpan>
        e escolha uma nova senha.
      </WhiteParagraph>
      <Form onSubmit={handleResetPassword}>
        <VerificationInputSimplified
          label="CÓDIGO DE VERIFICAÇÃO"
          id="emailToken"
          name="emailToken"
          type="tel"
          maxLength={6}
          placeholder="Digite aqui"
          autoComplete="off"
          value={authenticationData.emailToken}
          mask="999999"
          onChange={handleChange}
          resend={handleSendResetEmail}
        />
        <Input
          label="NOVA SENHA"
          id="password"
          name="password"
          type="password"
          maxLength={22}
          placeholder="Digite aqui"
          autoComplete="off"
          value={authenticationData.password}
          onChange={handleChange}
        />
        <Input
          label="CONFIRMAR NOVA SENHA"
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          maxLength={22}
          placeholder="Digite aqui"
          autoComplete="off"
          value={authenticationData.passwordConfirmation}
          onChange={handleChange}
        />
        {error && <YellowParagraph>{error}</YellowParagraph>}
        <AHundredPerCentButton>
          <GreenButton type="submit">REDEFINIR</GreenButton>
          <LinkButton onClick={() => handleChangeStep('authenticate')}>CANCELAR</LinkButton>
        </AHundredPerCentButton>
      </Form>
    </Box>
  );
}

export function SuccessStep({ props }: any) {
  const { handleChangeStep } = props;
  return (
    <Box backgroundColor={colors.red} width="500px">
      <YellowH1>CONCLUÍDO</YellowH1>
      <WhiteParagraph>Sua senha foi redefinida com sucesso!</WhiteParagraph>
      <AHundredPerCentButton>
        <LinkButton onClick={() => handleChangeStep('authenticate')}>VOLTAR</LinkButton>
      </AHundredPerCentButton>
    </Box>
  );
}
