import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { GreenButton } from './Button';
import { YellowParagraph } from './Paragraph';
import { GreenH2 } from './H2';

const Wrapper = styled.div`
  align-items: center;
  background-color: rgba(1, 1, 1, 0.9);
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 7000;

  button {
    width: 200px;
  }
`;

export function SuccessAndLogout() {
  const navigate = useNavigate();
  const { setAuthenticatedUser } = React.useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('authenticatedUser');
    setAuthenticatedUser({ token: '', user: {} });
    navigate('/');
  };

  return (
    <Wrapper>
      <GreenH2>Sucesso!</GreenH2>
      <YellowParagraph>Por segurança será necessário autenticar novamente no sistema.</YellowParagraph>
      <GreenButton onClick={handleLogout}>OK</GreenButton>
    </Wrapper>
  );
}
