import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../resources/theme';
import { api } from '../Services/api';
import { Loading } from './Loading';

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

const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: flex-start;
  margin: 25px 0px 20px 0px;
  width: 100%;
`;

const Item = styled.div`
  align-items: flex-start;
  background-color: ${colors.hover};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const TitleSummary = styled.div`
  align-items: center;
  background-color: ${colors.hover};
  border: none;
  box-sizing: border-box;
  color: white;
  display: flex;
  font-size: smaller;
  height: 40px;
  justify-content: center;
  padding: 0px 15px;
  width: 100%;
`;

const DataSummary = styled.div`
  align-items: center;
  border: none;
  box-sizing: border-box;
  color: ${colors.yellow};
  display: flex;
  height: 30px;
  justify-content: center;
  padding: 0px 15px;
  width: 100%;
`;

const Content = styled.div`
  align-items: flex-start;
  background-color: ${colors.red};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 30px 50px 30px 50px;
  width: 700px;

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

export default function DashboardSummary() {
  const [negotiating, setNegotiating] = useState(false);
  const [summary, setSummary] = useState({
    propertyCount: '',
    userCount: '',
    alertCount: '',
  });

  useEffect(() => {
    const dashboardInfo = async () => {
      try {
        setNegotiating(true);
        const response = await api.get('/dashboard_summary');
        setSummary({ ...response.data });
        setNegotiating(false);
      } catch (err) {
        console.error(err);
        setNegotiating(false);
      }
    };

    dashboardInfo();
  }, []);

  return (
    <Content>
      {negotiating && <Loading />}
      <H1>Resumo</H1>
      <Line />

      <Wrapper>
        <Item>
          <TitleSummary>Propriedades Cadastradas</TitleSummary>
          <DataSummary>{summary.propertyCount || '-'}</DataSummary>
        </Item>

        <Item>
          <TitleSummary>Usuários Cadastrados</TitleSummary>
          <DataSummary>{summary.userCount || '-'}</DataSummary>
        </Item>

        <Item>
          <TitleSummary>Alertas Enviados</TitleSummary>
          <DataSummary>{summary.alertCount || '-'}</DataSummary>
        </Item>
      </Wrapper>
    </Content>
  );
}
