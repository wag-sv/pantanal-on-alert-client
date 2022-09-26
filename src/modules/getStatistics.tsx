import { api } from '../Services/api';

export const getStatistics = async () => {
  try {
    const response = await api.get('/statistics');
    const statistics = response.data;
    return { data: statistics, error: null };
  } catch (err) {
    return { data: null, error: 'Erro de comunicação com o servidor. (004).' };
  }
};
