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

const OptionsGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  width: 100%;
`;

const FlexRow = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 5px 0px;
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
  font-size: 3rem;
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
  font-size: 3rem;
  height: 80px;
  justify-content: center;
  min-height: 80px;
  min-width: 80px;
  width: 80px;
`;

export const Info = styled.p`
    color: ${colors.yellow};
    font-size: 1.4rem;
    font-weight: 400;
    margin: 3px 0px;
    margin-bottom: 5px;
`;

type LayersProps = {
  setOption: (option: string) => void;
  tileLayer: string;
  setTileLayer: (layer: string) => void;
  showProperties: string;
  setShowProperties: (showProperties: string) => void;
  showScars: string;
  setShowScars: (setShowScars: string) => void;
  serviceStatus: string;
};

export function Layers({
  setOption, tileLayer, setTileLayer, showProperties, setShowProperties, showScars, setShowScars, serviceStatus,
}: LayersProps) {
  return (
    <Wrapper>
      <Close onClick={() => setOption('')}><MdClose size="20px" color={colors.yellow} /></Close>
      <OptionsGroup>
        <YellowH3>TIPO DE MAPA</YellowH3>
        {tileLayer === 'satellite' && <Info>Selecionado: satélite.</Info>}
        {tileLayer === 'street' && <Info>Selecionado: arruamentos.</Info>}
        {tileLayer === 'hybrid' && <Info>Selecionado: híbrido.</Info>}
        <FlexRow>
          <Tippy content="SATÉLITE" placement="bottom"><Layer backgroundImage={satellite} onClick={() => setTileLayer('satellite')} /></Tippy>
          <Tippy content="ARRUAMENTOS" placement="bottom"><Layer backgroundImage={street} onClick={() => setTileLayer('street')} /></Tippy>
          <Tippy content="HÍBRIDO" placement="bottom"><Layer backgroundImage={hybrid} onClick={() => setTileLayer('hybrid')} /></Tippy>
        </FlexRow>
      </OptionsGroup>
      <OptionsGroup>
        <YellowH3>PROPRIEDADES</YellowH3>
        {showProperties === 'all' && <Info>Selecionado: todas.</Info>}
        {showProperties === 'priority' && <Info>Selecionado: prioritárias.</Info>}
        {showProperties === 'ignition' && <Info>Selecionado: ponto de ignição.</Info>}
        <FlexRow>
          <Tippy content="TODAS" placement="bottom">
            <>
              {showProperties !== 'all' && <Option onClick={() => setShowProperties('all')}><MdVisibility size="40px" /></Option>}
              {showProperties === 'all' && <OptionActive><MdVisibility size="40px" /></OptionActive>}
            </>
          </Tippy>
          <Tippy content="PRIORITÁRIAS" placement="bottom">
            <>
              {showProperties !== 'priority' && <Option onClick={() => setShowProperties('priority')}><MdWarning size="40px" /></Option>}
              {showProperties === 'priority' && <OptionActive><MdWarning size="40px" /></OptionActive>}
            </>
          </Tippy>
          <Tippy content="PONTO DE IGNIÇÃO" placement="bottom">
            <>
              {showProperties !== 'ignition' && <Option onClick={() => setShowProperties('ignition')}><MdLocalFireDepartment size="40px" /></Option>}
              {showProperties === 'ignition' && <OptionActive><MdLocalFireDepartment size="40px" /></OptionActive>}
            </>
          </Tippy>
        </FlexRow>
      </OptionsGroup>
      {serviceStatus === 'up' && (
      <OptionsGroup>
        <YellowH3>HISTÓRICO DE QUEIMADAS</YellowH3>
        {showScars === 'none' && <Info>Selecionado: não mostrar.</Info>}
        {showScars === '1d' && <Info>Selecionado: 1 dia.</Info>}
        {showScars === '7d' && <Info>Selecionado: 7 dias.</Info>}
        {showScars === '15d' && <Info>Selecionado: 15 dias.</Info>}
        {showScars === '30d' && <Info>Selecionado: 30 dias.</Info>}
        {showScars === '60d' && <Info>Selecionado: 60 dias.</Info>}
        <FlexRow>
          <Tippy content="NÃO MOSTRAR HISTÓRICO" placement="bottom">
            <>
              {showScars !== 'none' && <Option onClick={() => setShowScars('none')}><MdClose size="40px" /></Option>}
              {showScars === 'none' && <OptionActive><MdClose size="40px" /></OptionActive>}
            </>
          </Tippy>
          <Tippy content="HISTÓRICO DE 1 DIA" placement="bottom">
            <>
              {showScars !== '1d' && <Option onClick={() => setShowScars('1d')}>1d</Option>}
              {showScars === '1d' && <OptionActive>1d</OptionActive>}
            </>
          </Tippy>
          <Tippy content="HISTÓRICO DE 7 DIAS" placement="bottom">
            <>
              {showScars !== '7d' && <Option onClick={() => setShowScars('7d')}>7d</Option>}
              {showScars === '7d' && <OptionActive>7d</OptionActive>}
            </>
          </Tippy>
        </FlexRow>
        <FlexRow>
          <Tippy content="HISTÓRICO DE 15 DIAS" placement="bottom">
            <>
              {showScars !== '15d' && <Option onClick={() => setShowScars('15d')}>15d</Option>}
              {showScars === '15d' && <OptionActive>15d</OptionActive>}
            </>
          </Tippy>
          <Tippy content="HISTÓRICO DE 30 DIAS" placement="bottom">
            <>
              {showScars !== '30d' && <Option onClick={() => setShowScars('30d')}>30d</Option>}
              {showScars === '30d' && <OptionActive>30d</OptionActive>}
            </>
          </Tippy>
          <Tippy content="HISTÓRICO DE 60 DIAS" placement="bottom">
            <>
              {showScars !== '60d' && <Option onClick={() => setShowScars('60d')}>60d</Option>}
              {showScars === '60d' && <OptionActive>60d</OptionActive>}
            </>
          </Tippy>
        </FlexRow>
      </OptionsGroup>
      )}

    </Wrapper>
  );
}
