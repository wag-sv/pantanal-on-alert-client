import React, { useState } from 'react';

import styled from 'styled-components';

import DashboardSummary from '../components/DashboardSummary';
import DashboardProperties from '../components/DashboardProperties';
import DashboardUsers from '../components/DashboardUsers';
import DashboardAlerts from '../components/DashboardAlerts';
import DashboardPropertiesLoader from '../components/DashboardPropertiesLoader';

const Content = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0px;
`;

const InnerContent = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 40px 5%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: auto;
  gap: 30px;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--red);
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
  background-color: var(--red);
  width: 300px;
  min-width: 270px;
  box-sizing: border-box;
  padding: 30px 50px 30px 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

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
  width: 90px;
  background-color: var(--yellow);
  height: 1px;
`;

const Options = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
  margin: 25px 0px 20px 0px;
`;

const Option = styled.div`
  height: 40px;
  width: 100%;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  div {
    width: 150px;
    padding-left: 10px;
  }

  &:hover {
    background-color: var(--hover);
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
