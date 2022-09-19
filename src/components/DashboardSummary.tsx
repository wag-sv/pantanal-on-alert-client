import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../Services/api';
import { Loading } from './Loading';

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

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  margin: 25px 0px 20px 0px;
`;

const Item = styled.div`
  background-color: var(--hover);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const TitleSummary = styled.div`
  background-color: var(--hover);
  font-size: smaller;
  color: white;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border: none;
  padding: 0px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DataSummary = styled.div`
  color: var(--yellow);
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  border: none;
  padding: 0px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background-color: var(--red);
  width: 700px;
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
