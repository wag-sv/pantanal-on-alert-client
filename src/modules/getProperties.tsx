import { api } from '../Services/api';

export const getProperties = async () => {
  try {
    const response = await api.get('/properties');
    const properties = response.data.activeProperties;
    return { data: properties, error: null };
  } catch (catched) {
    return { data: null, error: 'Erro de comunicação com o servidor. (002).' };
  }
};
