import { api } from '../Services/api';

export const getFireScars = async () => {
  try {
    const response = await api.get('/fireScars');
    const fireScars = response.data;
    return { data: fireScars, error: null };
  } catch (catched) {
    return { data: null, error: 'Erro de comunicação com o servidor. (005).' };
  }
};
