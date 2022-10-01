import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { YellowH3 } from './H3';
import { StatisticItem } from './StatisticItem';
import { colors } from '../resources/theme';
import { devices } from '../resources/devices';

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

type StatisticsProps = {
  statistics: any;
  setOption: (option: string) => void;
};

export function Statistics({ statistics, setOption }: StatisticsProps) {
  return (
    <Wrapper>
      <Close onClick={() => setOption('')}><MdClose size="20px" color={colors.yellow} /></Close>
      <YellowH3>ESTATÍSTICAS</YellowH3>
      <StatisticItem name="Focos de calor" number={statistics.fireSpots} />
      <StatisticItem name="Municípios atingidos" number={statistics.affectedMunicipalities} />
      <StatisticItem name="Propriedades atingidas" number={statistics.affectedProperties} />
    </Wrapper>
  );
}
