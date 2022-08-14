import React from 'react';
import styled from 'styled-components';
import logoMPSrc from '../assets/images/logo/logoMP.svg';

const MainDiv = styled.div`
  background-color: white;
  height: var(--footer-height);
  width: 100%;
  z-index: 1111;
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextoApoio = styled.p`
  margin: 5px;
`;

const LogoMP = styled.img`
  height: 85%;
  margin: 5px;

  @media (max-width: 800px) {
    height: 35px;
  }
`;

export function Footer() {
  return (
    <MainDiv>
      <TextoApoio> Apoio: </TextoApoio>
      <LogoMP src={logoMPSrc} />
    </MainDiv>
  );
}
