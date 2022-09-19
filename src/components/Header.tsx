import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import wetlandLogoPath from '../assets/images/wetlandLogo.svg';
import firefightersArmsPath from '../assets/images/firefightersArms.svg';
import firefightersLogoPath from '../assets/images/firefightersLogo.svg';
import { devices } from '../resources/devices';

const Wrapper = styled.div`
  background-color: var(--red);
  height: var(--header-height);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 5%;
`;

const WetlandLogo = styled.img`
  height: 80%;
  cursor: pointer;
`;

const FirefightersImages = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const FirefightersArms = styled.img`
  height: 80%;
`;

const FirefightersLogo = styled.img`
  height: 80%;
  display: none;

  @media ${devices.tablet} {
    display: block;
  }
`;

export function Header() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Wrapper>
      <WetlandLogo src={wetlandLogoPath} onClick={goHome} />
      <FirefightersImages>
        <FirefightersArms src={firefightersArmsPath} />
        <FirefightersLogo src={firefightersLogoPath} />
      </FirefightersImages>
    </Wrapper>
  );
}

// TODO: colocar link em WetlandLogo
