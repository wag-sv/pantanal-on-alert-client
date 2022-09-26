import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from './Box';
import { YellowH1 } from './H1';
import { WhiteParagraph, YellowParagraph } from './Paragraph';
import { Form } from './Form';
import { GridLayout } from './GridLayout';
import { Input } from './Input';
import { VerificationInputSimplified } from './VerificationInputSimplified';
import { AHundredPerCentButton } from './Buttons';
import { GreenButton, LinkButton } from './Button';
import { colors } from '../resources/theme';

export function RegisterStep({ props }: any) {
  const {
    newUser, error, handleChange, handleRegister,
  } = props;

  return (
    <Box backgroundColor={colors.red} width="700px">
      <YellowH1>CADASTRAR</YellowH1>
      <WhiteParagraph>Cadastre-se para receber alertas de possíveis incêndios.</WhiteParagraph>
      <Form onSubmit={handleRegister}>
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
          <LinkButton><Link to="/authenticate">JÁ SOU CADASTRADO</Link></LinkButton>
        </AHundredPerCentButton>
      </Form>
    </Box>
  );
}

export function ActivateStep({ props }: any) {
  const {
    newUser, error, handleChange, handleCancelEmaiVerification, handleResendEmailToken, handleActivate,
  } = props;

  return (
    <Box backgroundColor={colors.red} width="700px">
      <YellowH1>VERIFICAR EMAIL</YellowH1>
      <WhiteParagraph>Para finalizar seu cadastro insira o código enviado para o email.</WhiteParagraph>
      <Form onSubmit={handleActivate}>
        <VerificationInputSimplified
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
        />
        {error && <YellowParagraph>{error}</YellowParagraph>}
        <AHundredPerCentButton>
          <GreenButton type="submit">CONFIRMAR</GreenButton>
          <LinkButton onClick={handleCancelEmaiVerification}>CANCELAR</LinkButton>
        </AHundredPerCentButton>
      </Form>
    </Box>
  );
}
