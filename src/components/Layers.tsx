import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import Tippy from '@tippyjs/react';
import { YellowH3 } from './H3';
import { colors } from '../resources/theme';
import { devices } from '../resources/devices';
import satellite from '../assets/images/layers/satellite.png';
import street from '../assets/images/layers/street.png';
import hybrid from '../assets/images/layers/hybrid.png';

const Wrapper = styled.div`
  align-items: center;
  background-color: ${colors.red};
  border: 1px solid ${colors.yellow};
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  padding: 20px;
  position: absolute;
  right: 70px;
  top: calc(var(--header-height) + var(--navbar-height) + 20px);
  width: calc(100% - 80px);
  z-index: 999;

  @media ${devices.mobileL} {
    width: 340px;
  }
`;

const Close = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 20px;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;

  &:hover {
    background-color: ${colors.darkRed};
    border: 1px solid ${colors.yellow}
  }
`;

const FlexRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
`;

type BackgroundProps = {
  backgroundImage?: string;
};

const Layer = styled.div<BackgroundProps>`
  background-color: white;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid ${colors.yellow};
  border-radius: 7px;
  cursor: pointer;
  height: 80px;
  min-height: 80px;
  min-width: 80px;
  width: 80px;
`;

type LayersProps = {
  setOption: (option: string) => void;
  setTileLayer: (layer: string) => void;
};

export function Layers({ setOption, setTileLayer }: LayersProps) {
  return (
    <Wrapper>
      <Close onClick={() => setOption('')}><MdClose size="20px" color={colors.yellow} /></Close>
      <YellowH3>LAYERS</YellowH3>
      <FlexRow>
        <Tippy content="SATÉLITE" placement="bottom"><Layer backgroundImage={satellite} onClick={() => setTileLayer('satellite')} /></Tippy>
        <Tippy content="ARRUAMENTOS" placement="bottom"><Layer backgroundImage={street} onClick={() => setTileLayer('street')} /></Tippy>
        <Tippy content="HÍBRIDO" placement="bottom"><Layer backgroundImage={hybrid} onClick={() => setTileLayer('hybrid')} /></Tippy>
      </FlexRow>
    </Wrapper>
  );
}
