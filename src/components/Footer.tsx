import React from 'react';
import styled from 'styled-components';
import publicMinistryLogoPath from '../assets/images/publicMinistryLogo.svg';

const Wrapper = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  gap: 5px;
  height: var(--footer-height);
  justify-content: center;
  width: 100%;
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
