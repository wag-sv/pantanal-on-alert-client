import { api } from '../Services/api';

export const getServiceStatus = async () => {
  try {
    const response = await api.get('/serviceStatus');
    const serviceStatus = response.data;
    if (serviceStatus !== 0 && serviceStatus !== 1) return { error: 'Não foi possível identificar o status do serviço.' };
    if (serviceStatus === 0) return { error: 'Dados de satélites indisponíveis no momento.' };
    return { error: null };
  } catch (err) {
    return { error: 'Erro de comunicação com o servidor. (001).' };
  }
};
