import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import wetlandLogoPath from '../assets/images/wetlandLogo.svg';
import firefightersArmsPath from '../assets/images/firefightersArms.svg';
import firefightersLogoPath from '../assets/images/firefightersLogo.svg';
import { devices } from '../resources/devices';
import { colors } from '../resources/theme';

const Wrapper = styled.div`
  align-items: center;
  background-color: ${colors.red};
  display: flex;
  height: var(--header-height);
  justify-content: space-between;
  padding: 0px 5%;
  width: 100%;
`;

const WetlandLogo = styled.img`
  cursor: pointer;
  height: 80%;
`;

const FirefightersImages = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  height: 100%;
  justify-content: flex-end;
`;

const FirefightersArms = styled.img`
  height: 80%;
`;

const FirefightersLogo = styled.img`
  display: none;
  height: 80%;

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
