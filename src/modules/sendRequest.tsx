import { DriverAddressChangeService } from '../services/DriverAddressChangeService';
import { enableLoading } from './enableLoading';
import { disableLoading } from './disableLoading';

export const sendRequest = async (requestParameters: Object) => {
  try {
    enableLoading();
    const response = await DriverAddressChangeService.post('/registraalteracaoenderecocondutor', requestParameters);
    disableLoading();
    if (response.data.error.length > 0) return { data: null, error: response.data.error[0].trim() };
    if (response.data.entity.length <= 0) return { data: null, error: 'Erro na requisição. Tente novamente mais tarde.' };
    return { data: response.data.entity[0], error: null };
  } catch (error) {
    return { data: null, error: 'Erro de comunicação com o servidor.' };
  }
};
