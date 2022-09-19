import React from 'react';
import styled from 'styled-components';
import publicMinistryLogoPath from '../assets/images/publicMinistryLogo.svg';

const Wrapper = styled.div`
  background-color: white;
  height: var(--footer-height);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const PublicMinistryLogo = styled.img`
  height: 70%;
`;

export function Footer() {
  return (
    <Wrapper>
      <p> Apoio: </p>
      <PublicMinistryLogo src={publicMinistryLogoPath} />
    </Wrapper>
  );
}
