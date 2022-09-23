import React, { useState } from 'react';

import styled from 'styled-components';

import DashboardSummary from '../components/DashboardSummary';
import DashboardProperties from '../components/DashboardProperties';
import DashboardUsers from '../components/DashboardUsers';
import DashboardAlerts from '../components/DashboardAlerts';
import DashboardPropertiesLoader from '../components/DashboardPropertiesLoader';
import { colors } from '../resources/theme';

const Content = styled.div`
  background-color: white;
  box-sizing: border-box;
  height: 100%;
  padding: 0px;
  width: 100%;
`;

const InnerContent = styled.div`
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  display: flex;
  gap: 30px;
  height: 100%;
  justify-content: center;
  overflow: auto;
  padding: 40px 5%;
  width: 100%;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.red};
    background-image: -webkit-linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 0.3) 50%,
      transparent,
      transparent
    );
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const Menu = styled.div`
  align-items: flex-start;
  background-color: ${colors.red};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 270px;
  padding: 30px 50px 30px 50px;
  width: 300px;

  @media (max-width: 900px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    padding: 20px 50px 20px 50px;
  }

  @media (max-width: 400px) {
    padding: 20px 30px 20px 30px;
  }
`;

const H1 = styled.h1`
  color: white;
  font-weight: 500;
  margin: 15px 0px 5px 0px;
`;

const Line = styled.div`
  background-color: ${colors.yellow};
  height: 1px;
  width: 90px;
`;

const Options = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: flex-start;
  margin: 25px 0px 20px 0px;
  width: 100%;
`;

const Option = styled.div`
  align-items: center;
  color: white;
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: flex-start;
  width: 100%;

  div {
    padding-left: 10px;
    width: 150px;
  }

  &:hover {
    background-color: ${colors.hover};
  }
`;

export function Dashboard({ properties, getProperties }: any) {
  const [option, setOption] = useState('summary');

  return (
    <Content>
      <InnerContent>
        <Menu>
          <H1>Dashboard</H1>
          <Line />
          <Options>
            <Option onClick={() => setOption('summary')}>
              <div>Resumo</div>
            </Option>
            <Option onClick={() => setOption('properties')}>
              <div>Propriedades</div>
            </Option>

            <Option onClick={() => setOption('users')}>
              <div>Usuários</div>
            </Option>

            <Option onClick={() => setOption('alerts')}>
              <div>Alertas</div>
            </Option>

            <Option onClick={() => setOption('loader')}>
              <div>Carregar CARS</div>
            </Option>
          </Options>
        </Menu>

        {option === 'summary' && <DashboardSummary />}
        {option === 'properties' && (
          <DashboardProperties
            properties={properties}
            getProperties={getProperties}
          />
        )}
        {option === 'users' && <DashboardUsers />}
        {option === 'alerts' && <DashboardAlerts />}
        {option === 'loader' && (
          <DashboardPropertiesLoader getProperties={getProperties} />
        )}
      </InnerContent>
    </Content>
  );
}
