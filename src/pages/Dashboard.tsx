import React from 'react';
import { Background } from '../components/Background';
import { Box } from '../components/Box';
import { YellowH1 } from '../components/H1';
import { AHundredPerCentButton } from '../components/Buttons';
import { LinkButton } from '../components/Button';
import { DashboardSummary } from '../components/DashboardSummary';
import { DashboardProperties } from '../components/DashboardProperties';
import { DashboardUsers } from '../components/DashboardUsers';
import { DashboardAlerts } from '../components/DashboardAlerts';
import { DashboardPropertiesLoader } from '../components/DashboardPropertiesLoader';
import { colors } from '../resources/theme';

export function Dashboard() {
  const [option, setOption] = React.useState('summary');

  return (
    <Background backgroundColor={colors.darkGray}>
      <Box backgroundColor={colors.red} width="300px">
        <YellowH1>DASHBOARD</YellowH1>
        <AHundredPerCentButton>
          <LinkButton onClick={() => setOption('summary')}>RESUMO</LinkButton>
          <LinkButton onClick={() => setOption('properties')}>PROPRIEDADES</LinkButton>
          <LinkButton onClick={() => setOption('users')}>USUÁRIOS</LinkButton>
          <LinkButton onClick={() => setOption('alerts')}>ALERTAS</LinkButton>
          <LinkButton onClick={() => setOption('loader')}>CARREGAR CARS</LinkButton>
        </AHundredPerCentButton>
      </Box>

      {option === 'summary' && <DashboardSummary />}
      {option === 'properties' && <DashboardProperties />}
      {option === 'users' && <DashboardUsers />}
      {option === 'alerts' && <DashboardAlerts />}
      {option === 'loader' && <DashboardPropertiesLoader />}
    </Background>
  );
}
