import React from 'react';
import styled from 'styled-components';
import {
  MdClose, MdLocalFireDepartment, MdVisibility, MdWarning,
} from 'react-icons/md';
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
  margin-bottom: 20px;
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

const Option = styled.div`
  align-items: center;
  background-color: ${colors.red};
  border: 1px solid ${colors.yellow};
  border-radius: 7px;
  color:${colors.yellow};
  cursor: pointer;
  display: flex;
  height: 80px;
  justify-content: center;
  min-height: 80px;
  min-width: 80px;
  width: 80px;
`;

const OptionActive = styled.div`
  align-items: center;
  background-color: ${colors.yellow};
  border: 1px solid ${colors.yellow};
  border-radius: 7px;
  color:${colors.red};
  cursor: pointer;
  display: flex;
  height: 80px;
  justify-content: center;
  min-height: 80px;
  min-width: 80px;
  width: 80px;
`;

export const Info = styled.p`
    align-self: flex-start;
    color: ${colors.yellow};
    font-size: 1.4rem;
    font-weight: 400;
    margin: 3px 0px;
`;

type LayersProps = {
  setOption: (option: string) => void;
  setTileLayer: (layer: string) => void;
  showProperties: string;
  setShowProperties: (showProperties: string) => void;
};

export function Layers({
  setOption, setTileLayer, showProperties, setShowProperties,
}: LayersProps) {
  return (
    <Wrapper>
      <Close onClick={() => setOption('')}><MdClose size="20px" color={colors.yellow} /></Close>
      <YellowH3>TIPO DE MAPA</YellowH3>
      <FlexRow>
        <Tippy content="SATÉLITE" placement="bottom"><Layer backgroundImage={satellite} onClick={() => setTileLayer('satellite')} /></Tippy>
        <Tippy content="ARRUAMENTOS" placement="bottom"><Layer backgroundImage={street} onClick={() => setTileLayer('street')} /></Tippy>
        <Tippy content="HÍBRIDO" placement="bottom"><Layer backgroundImage={hybrid} onClick={() => setTileLayer('hybrid')} /></Tippy>
      </FlexRow>
      <YellowH3>OPÇÕES</YellowH3>
      <FlexRow>
        {showProperties === 'all' && (
          <>
            <Tippy content="PROPRIEDADES" placement="bottom"><OptionActive><MdVisibility size="40px" /></OptionActive></Tippy>
            <Tippy content="PROPRIEDADES PRIORITÁRIAS" placement="bottom"><Option onClick={() => setShowProperties('priority')}><MdWarning size="40px" /></Option></Tippy>
            <Tippy content="PROPRIEDADES DE PONTO DE IGNIÇÃO" placement="bottom"><Option onClick={() => setShowProperties('ignition')}><MdLocalFireDepartment size="40px" /></Option></Tippy>
          </>
        )}
        {showProperties === 'priority' && (
          <>
            <Tippy content="PROPRIEDADES" placement="bottom"><Option onClick={() => setShowProperties('all')}><MdVisibility size="40px" /></Option></Tippy>
            <Tippy content="PROPRIEDADES PRIORITÁRIAS" placement="bottom"><OptionActive><MdWarning size="40px" /></OptionActive></Tippy>
            <Tippy content="PROPRIEDADES DE PONTO DE IGNIÇÃO" placement="bottom"><Option onClick={() => setShowProperties('ignition')}><MdLocalFireDepartment size="40px" /></Option></Tippy>
          </>
        )}
        {showProperties === 'ignition' && (
          <>
            <Tippy content="PROPRIEDADES" placement="bottom"><Option onClick={() => setShowProperties('all')}><MdVisibility size="40px" /></Option></Tippy>
            <Tippy content="PROPRIEDADES PRIORITÁRIAS" placement="bottom"><Option onClick={() => setShowProperties('priority')}><MdWarning size="40px" /></Option></Tippy>
            <Tippy content="PROPRIEDADES DE PONTO DE IGNIÇÃO" placement="bottom"><OptionActive><MdLocalFireDepartment size="40px" /></OptionActive></Tippy>
          </>
        )}

      </FlexRow>
      {showProperties === 'all' && <Info>Mostrando todas as propriedades.</Info>}
      {showProperties === 'priority' && <Info>Mostrando propriedades prioritárias.</Info>}
      {showProperties === 'ignition' && <Info>Mostrando propriedades consideradas ponto de ignição.</Info>}
    </Wrapper>
  );
}
