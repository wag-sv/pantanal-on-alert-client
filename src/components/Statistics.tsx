import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { mask } from 'node-masker';
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

const DataGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
  width: 100%;
`;

type StatisticsProps = {
  statistics: any;
  scarsStatistics: any;
  setOption: (option: string) => void;
};

const applyMask = (numberOfHectares: any) => {
  if (numberOfHectares <= 999) return numberOfHectares;
  if (numberOfHectares <= 999999) return mask(numberOfHectares, '999.999');
  if (numberOfHectares <= 9999999) return mask(numberOfHectares, '9.999.999');
  if (numberOfHectares <= 99999999) return mask(numberOfHectares, '99.999.999');
  return mask(numberOfHectares, '999.999.999');
};

export function Statistics({ statistics, scarsStatistics, setOption }: StatisticsProps) {
  return (
    <Wrapper>
      <Close onClick={() => setOption('')}><MdClose size="20px" color={colors.yellow} /></Close>
      <DataGroup>
        <YellowH3>ESTATÍSTICAS</YellowH3>
        <StatisticItem name="Focos de calor" number={statistics.fireSpots} />
        <StatisticItem name="Municípios atingidos" number={statistics.affectedMunicipalities} />
        <StatisticItem name="Propriedades atingidas" number={statistics.affectedProperties} />
      </DataGroup>
      <DataGroup>
        <YellowH3>HECTARES QUEIMADOS</YellowH3>
        <StatisticItem name="1 dia" number={applyMask(scarsStatistics.hectaresBurnedInTheLast1Day) || ''} />
        <StatisticItem name="7 dias" number={applyMask(scarsStatistics.hectaresBurnedInTheLast7Days) || ''} />
        <StatisticItem name="15 dias" number={applyMask(scarsStatistics.hectaresBurnedInTheLast15Days) || ''} />
        <StatisticItem name="30 dias" number={applyMask(scarsStatistics.hectaresBurnedInTheLast30Days) || ''} />
        <StatisticItem name="60 dias" number={applyMask(scarsStatistics.hectaresBurnedInTheLast60Days) || ''} />
      </DataGroup>
    </Wrapper>
  );
}
