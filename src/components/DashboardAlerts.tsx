import React from 'react';
import Tippy from '@tippyjs/react';
import { MdArticle } from 'react-icons/md';
import { api } from '../Services/api';
import { Loading } from './Loading';
import { Box } from './Box';
import { WhiteH2 } from './H2';
import { Form } from './Form';
import { Input } from './Input';
import { FlexRow } from './FlexRow';
import { ClickArea } from './ClickArea';
import { YellowParagraph } from './Paragraph';
import { ExpandableItem } from './ExpandableItem';
import { colors } from '../resources/theme';
import { AlertsReport } from '../reports/AlertsReport';

export function DashboardAlerts() {
  const initialValueOfAlerts = {
    _id: '', user: { name: '', cpf: '' }, propertyCode: '', alertSentAt: '',
  };
  const [alerts, setAlerts] = React.useState([initialValueOfAlerts]);
  const [error, setError] = React.useState('');
  const [negotiating, setNegotiating] = React.useState(false);
  const [show, setShow] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [initialDate, setInitialDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  React.useEffect(() => {
    const getSummary = async () => {
      try {
        setNegotiating(true);
        const response = await api.get('/dashboard_alerts');
        setAlerts([...response.data.alerts]);
        setNegotiating(false);
      } catch (catched: any) {
        setNegotiating(false);
        setError('Erro inesperado. Tente novamente em alguns instantes.');
      }
    };
    getSummary();
  }, []);

  const handleChangeSearchTerm = (event: any) => {
    setSearchTerm(event.target.value.toUpperCase());
  };

  const handChangeInitialDate = (event: any) => {
    setInitialDate(event.target.value.toUpperCase());
  };

  const handChangeEndDate = (event: any) => {
    setEndDate(event.target.value.toUpperCase());
  };

  const filteredProperties = () => {
    const alertsWithDateAtZeroHour = alerts.map((alert) => {
      const alertDate = new Date(alert.alertSentAt);
      const day = alertDate.getUTCDate();
      const month = alertDate.getUTCMonth();
      const year = alertDate.getUTCFullYear();
      const alertDateAtZeroHour = new Date(year, month, day);
      return { ...alert, alertSentAt: alertDateAtZeroHour };
    });
    const filterdBySearchTerm = !searchTerm ? alertsWithDateAtZeroHour : alertsWithDateAtZeroHour.filter(
      (alert) => alert.user.name.toUpperCase().includes(searchTerm.toUpperCase())
        || alert.user.cpf.toUpperCase().includes(searchTerm.toUpperCase())
        || alert.propertyCode.toUpperCase().includes(searchTerm.toUpperCase()),
    );
    const filterdByInitialDate = !initialDate ? filterdBySearchTerm : filterdBySearchTerm.filter(
      (alert: any) => {
        const day = parseInt(initialDate.split('-')[2], 10);
        const month = parseInt(initialDate.split('-')[1], 10) - 1;
        const year = parseInt(initialDate.split('-')[0], 10);
        return alert.alertSentAt >= new Date(year, month, day);
      },
    );
    const filterdByEndDate = !endDate ? filterdByInitialDate : filterdByInitialDate.filter(
      (alert: any) => {
        const day = parseInt(endDate.split('-')[2], 10);
        const month = parseInt(endDate.split('-')[1], 10) - 1;
        const year = parseInt(endDate.split('-')[0], 10);
        return alert.alertSentAt <= new Date(year, month, day);
      },
    );
    return filterdByEndDate;
  };

  const result = !searchTerm && !initialDate && !endDate
    ? alerts
    : filteredProperties();

  return (
    <Box backgroundColor={colors.red} width="700px">
      {negotiating && <Loading />}
      <WhiteH2>ALERTAS</WhiteH2>
      {error && <YellowParagraph>{error}</YellowParagraph>}
      {!error && (
      <Form onSubmit={() => {}}>
        <Input
          label="NOME, CPF OU CAR"
          id="searchTerm"
          name="searchTerm"
          maxLength={20}
          autoComplete="off"
          type="text"
          placeholder="Digite aqui para pesquisar"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
        <Input
          label="INÍCIO"
          id="initialDate"
          name="initialDate"
          maxLength={20}
          autoComplete="off"
          type="date"
          placeholder=""
          value={initialDate}
          onChange={handChangeInitialDate}
        />
        <Input
          label="FIM"
          id="endDate"
          name="endDate"
          maxLength={20}
          autoComplete="off"
          type="date"
          placeholder=""
          value={endDate}
          onChange={handChangeEndDate}
        />
        <FlexRow>
          <YellowParagraph>{`Mostrando ${result.length} ${result.length === 1 ? 'alerta' : 'alertas'}.`}</YellowParagraph>
          <Tippy content="GERAR RELATÓRIO"><ClickArea onClick={() => AlertsReport(result)}><MdArticle size="25px" color={colors.yellow} /></ClickArea></Tippy>
        </FlexRow>
      </Form>
      )}
      {!error && result.map((alert: any) => {
        const { _id: id } = alert;
        const title = alert.user?.name;
        const content = {
          Propriedade: alert.propertyCode,
          'Data do alerta': new Date(alert.alertSentAt).toLocaleString().split(' ')[0],
          'E-mail (tentativa 1)': alert.emailAlert?.attempt1?.response?.includes('250') ? 'RECEBIDO' : alert.emailAlert?.attempt1?.response || '-',
          'E-mail (tentativa 2)': alert.emailAlert?.attempt2?.response?.includes('250') ? 'RECEBIDO' : alert.emailAlert?.attempt2?.response || '-',
          SMS: alert.smsAlert?.attempt1[0]?.situacao?.includes('OK') ? 'RECEBIDO' : alert.smsAlert?.attempt1[0]?.situacao || '-',
        };

        return (
          <ExpandableItem key={id} id={id} title={title} content={content} show={show} setShow={setShow} />
        );
      })}
    </Box>
  );
}
