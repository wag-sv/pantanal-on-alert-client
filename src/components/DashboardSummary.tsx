import React from 'react';
import { api } from '../Services/api';
import { Loading } from './Loading';
import { Box } from './Box';
import { WhiteH2 } from './H2';
import { InformationItem } from './InformationItem';
import { colors } from '../resources/theme';

export function DashboardSummary() {
  const [negotiating, setNegotiating] = React.useState(false);
  const [summary, setSummary] = React.useState({ propertyCount: '', userCount: '', alertCount: '' });

  React.useEffect(() => {
    const getSummary = async () => {
      try {
        setNegotiating(true);
        const response = await api.get('/dashboard_summary');
        setSummary({ ...response.data });
        setNegotiating(false);
      } catch (catched: any) {
        setNegotiating(false);
      }
    };
    getSummary();
  }, []);

  return (
    <Box backgroundColor={colors.red} width="700px">
      {negotiating && <Loading />}
      <WhiteH2>RESUMO</WhiteH2>
      <InformationItem title="Propriedades Cadastradas" content={summary.propertyCount || '-'} />
      <InformationItem title="Usuários Cadastrados" content={summary.userCount || '-'} />
      <InformationItem title="Alertas Enviados" content={summary.alertCount || '-'} />
    </Box>
  );
}
