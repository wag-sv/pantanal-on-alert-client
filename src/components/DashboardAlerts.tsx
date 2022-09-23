import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { api } from '../Services/api';
import { Loading } from './Loading';

import AlertsReport from '../reports/AlertsReport';

const H1 = styled.h1`
  color: white;
  font-weight: 500;
  margin: 15px 0px 5px 0px;
`;

const Line = styled.div`
  background-color: var(--yellow);
  height: 1px;
  width: 90px;
`;

const DashboardSearch = styled.div`
  margin: 20px 0px;
  width: 100%;

  input {
    border: none;
    box-sizing: border-box;
    height: 40px;
    margin: 0px 20px 10px 0px;
    padding-left: 15px;
    width: 100%;
  }

  h2 {
    color: var(--yellow);
    font-size: smaller;
    margin: 0px 0px;
  }
`;

const InputLabel = styled.label`
  color: white;
  font-size: smaller;
`;

const DateInput = styled.input`
  color: #757575;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: flex-start;
  margin: 0px 0px 20px 0px;
  width: 100%;
`;

const Item = styled.div`
  align-items: flex-start;
  background-color: var(--hover);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  align-items: center;
  background-color: var(--hover);
  border: none;
  box-sizing: border-box;
  color: white;
  display: flex;
  font-size: smaller;
  height: 40px;
  justify-content: space-between;
  padding: 0px 15px;
  width: 100%;

  @media (max-width: 600px) {
    font-size: 11px;
  }
`;

const Icon = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 30px;
  justify-content: center;
  width: 30px;

  &:hover {
    background-color: var(--hover);
  }
`;

const Data = styled.div`
  align-items: center;
  border: none;
  box-sizing: border-box;
  color: var(--yellow);
  display: flex;
  font-size: smaller;
  justify-content: flex-start;
  padding: 5px 15px;
  width: 100%;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const Label = styled.span`
  color: var(--yellow);
  font-weight: 700;
  margin-right: 15px;
  white-space: nowrap;
`;

const Info = styled.span`
  color: var(--yellow);
`;

const Divider = styled.div`
  border-style: dotted none none none;
  border-top: solid 1px var(--yellow);
  margin-left: 15px;
  width: calc(100% - 30px);
`;

const Content = styled.div`
  align-items: flex-start;
  background-color: var(--red);
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

const GreenButton100px = styled.button`
  background-color: var(--green);
  border: none;
  color: white;
  cursor: pointer;
  height: 40px;
  margin-bottom: 10px;
  width: 100px;
`;

export default function DashboardAlerts(props) {
  const [negotiating, setNegotiating] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [expand, setExpand] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const dashboardInfo = async () => {
      try {
        setNegotiating(true);
        const response = await api.get('/dashboard_alerts');
        setAlerts([...response.data.alerts]);
        setNegotiating(false);
      } catch (err) {
        console.error(err);
        setNegotiating(false);
      }
    };

    dashboardInfo();
  }, []);

  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value.toUpperCase());
  };

  const handChangeInitialDate = (event) => {
    setInitialDate(event.target.value.toUpperCase());
  };

  const handChangeEndDate = (event) => {
    setEndDate(event.target.value.toUpperCase());
  };

  // prettier-ignore
  const filteredProperties = (searchTerm, initialDate, endDate) => {
    const formattedAlerts = alerts.map((alert) => {
      const dt = new Date(alert.alertSentAt).toLocaleString().split(' ')[0];

      return { ...alert, alertSentAt: new Date(dt.split('/')[2], dt.split('/')[1] - 1, dt.split('/')[0]) };
    });

    let filterdBySearchTerm = [];
    let filterdByInitialDate = [];
    let filterdByEndDate = [];

    if (searchTerm) {
      filterdBySearchTerm = formattedAlerts.filter(
        (alert) => alert.user.name.toLowerCase().includes(searchTerm.toLowerCase())
          || alert.user.cpf.toLowerCase().includes(searchTerm.toLowerCase())
          || alert.propertyCode.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    } else {
      filterdBySearchTerm = formattedAlerts;
    }

    if (initialDate) {
      filterdByInitialDate = filterdBySearchTerm.filter(
        (alert) => alert.alertSentAt >= new Date(initialDate.split('-')[0], initialDate.split('-')[1] - 1, initialDate.split('-')[2]),

      );
    } else {
      filterdByInitialDate = filterdBySearchTerm;
    }

    if (endDate) {
      filterdByEndDate = filterdByInitialDate.filter(
        (alert) => alert.alertSentAt <= new Date(endDate.split('-')[0], endDate.split('-')[1] - 1, endDate.split('-')[2]),

      );
    } else {
      filterdByEndDate = filterdByInitialDate;
    }

    return filterdByEndDate;
  };

  // prettier-ignore
  const results = !searchTerm && !initialDate && !endDate
    ? alerts
    : filteredProperties(searchTerm, initialDate, endDate);

  return (
    <Content>
      {negotiating && <Loading />}
      <H1>Alertas</H1>
      <Line />

      <DashboardSearch>
        <InputLabel>CPF, nome ou CAR</InputLabel>
        <input
          type="text"
          placeholder="Digite aqui para pesquisar"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />

        <InputLabel>Início</InputLabel>
        <DateInput
          type="date"
          value={initialDate}
          onChange={handChangeInitialDate}
        />
        <InputLabel>Fim</InputLabel>
        <DateInput type="date" value={endDate} onChange={handChangeEndDate} />

        <h2>
          Mostrando
          {' '}
          {results.length}
          {' '}
          {results.length === 1 ? 'alerta' : 'alertas'}
          .
        </h2>
      </DashboardSearch>

      <GreenButton100px
        onClick={() => {
          AlertsReport(results);
        }}
      >
        Gerar PDF
      </GreenButton100px>

      <Wrapper>
        {results.map((alert) => (
          <Item key={alert._id}>
            <Title>
              <span>{alert.user.name}</span>
              {expand !== alert._id && (
                <IconContext.Provider
                  value={{ color: '#fdf117', size: '20px' }}
                >
                  <Icon
                    onClick={() => {
                      setExpand(alert._id);
                    }}
                  >
                    <MdExpandMore />
                  </Icon>
                </IconContext.Provider>
              )}
              {expand === alert._id && (
                <IconContext.Provider
                  value={{ color: '#fdf117', size: '20px' }}
                >
                  <Icon
                    onClick={() => {
                      setExpand('');
                    }}
                  >
                    <MdExpandLess />
                  </Icon>
                </IconContext.Provider>
              )}
            </Title>
            {expand === alert._id && (
              <>
                <Data>
                  <Label>Propriedade:</Label>
                  {' '}
                  <Info>{alert.propertyCode}</Info>
                  {' '}
                </Data>
                <Divider />
                <Data>
                  <Label>Data do alerta:</Label>
                  {' '}
                  <Info>
                    {new Date(alert.alertSentAt).toLocaleString().split(' ')[0]}
                  </Info>
                  {' '}
                </Data>

                {alert.emailAlert?.attempt1 && (
                  <>
                    <Divider />
                    <Data>
                      <Label>Email (tentativa 1):</Label>
                      <Info>
                        {alert.emailAlert.attempt1.response?.includes('250')
                          ? 'RECEBIDO'
                          : alert.emailAlert.attempt1.response || '-'}
                      </Info>
                      {' '}
                    </Data>
                  </>
                )}

                {alert.emailAlert?.attempt2 && (
                  <>
                    <Divider />
                    <Data>
                      <Label>Email (tentativa 2):</Label>
                      {' '}
                      <Info>
                        {alert.emailAlert.attempt2.response?.includes('250')
                          ? 'RECEBIDO'
                          : alert.emailAlert.attempt2.response || '-'}
                      </Info>
                      {' '}
                    </Data>
                  </>
                )}

                {alert.smsAlert && (
                  <>
                    <Divider />
                    <Data>
                      <Label>SMS:</Label>
                      {' '}
                      <Info>
                        {alert.smsAlert.attempt1[0]?.situacao?.includes('OK')
                          ? 'RECEBIDO'
                          : alert.smsAlert.attempt1[0]?.situacao || '-'}
                      </Info>
                      {' '}
                    </Data>
                  </>
                )}
              </>
            )}
          </Item>
        ))}
      </Wrapper>
    </Content>
  );
}
