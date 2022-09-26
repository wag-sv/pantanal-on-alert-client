import { api } from '../Services/api';

export const getProperties = async () => {
  try {
    const response = await api.get('/properties');
    const properties = response.data.activeProperties;
    return { data: properties, error: null };
  } catch (catched: any) {
    return { data: null, error: catched.response.data.error };
  }
};
