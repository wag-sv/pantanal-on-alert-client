import { api } from '../Services/api';

export const getFireSpots = async () => {
  try {
    const response = await api.get('/fireSpots');
    const fireSpots = response.data;
    return { data: fireSpots, error: null };
  } catch (err) {
    return { data: null, error: 'Erro de comunicação com o servidor. (003).' };
  }
};
