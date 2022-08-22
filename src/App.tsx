import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from './contexts/AppContext';
import { GlobalStyle } from './globalStyle';
import { api } from './Services/api';
import { Loading } from './components/Loading';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Router } from './router/Router';
import { Error } from './pages/Error';

export function App() {
  const { setAppState }: any = React.useContext(AppContext);
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState('');

  async function getServiceStatus() {
    try {
      const response = await api.get('/serviceStatus');
      const serviceStatus = response.data;
      if (serviceStatus !== 0 && serviceStatus !== 1) return { error: 'Não foi possível identificar o status do serviço.' };
      if (serviceStatus === 0) return { error: 'Dados de satélites indisponíveis no momento.' };
      return { error: null };
    } catch (err) {
      return { error: 'Erro de comunicação com o servidor. (001).' };
    }
  }

  async function getProperties() {
    try {
      const response = await api.get('/properties');
      const properties = response.data.activeProperties;
      return { data: properties, error: null };
    } catch (err) {
      return { data: null, error: 'Erro de comunicação com o servidor. (002).' };
    }
  }

  async function getFireSpots() {
    try {
      const response = await api.get('/fireSpots');
      const fireSpots = response.data;
      return { data: fireSpots, error: null };
    } catch (err) {
      return { data: null, error: 'Erro de comunicação com o servidor. (003).' };
    }
  }

  async function getStatistics() {
    try {
      const response = await api.get('/statistics');
      const statistics = response.data;
      return { data: statistics, error: null };
    } catch (err) {
      return { data: null, error: 'Erro de comunicação com o servidor. (004).' };
    }
  }

  const getData = async () => {
    const serviceStatus = await getServiceStatus();
    if (serviceStatus.error) {
      setError(serviceStatus.error);
      return;
    }

    const properties = await getProperties();
    if (properties.error) {
      setError(properties.error);
      return;
    }

    const fireSpots = await getFireSpots();
    if (fireSpots.error) {
      setError(fireSpots.error);
      return;
    }

    const statistics = await getStatistics();
    if (statistics.error) {
      setError(statistics.error);
      return;
    }

    setAppState({
      properties: properties.data,
      fireSpots: fireSpots.data,
      statistics: statistics.data,
    });
  };

  React.useEffect(() => {
    const runGetData = async () => {
      if (!ready) await getData();
      setReady(true);
    };
    runGetData();
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Main>
        {!ready && <Loading />}
        {ready && error && <Error error={error} /> }
        {ready && !error && <Router /> }
      </Main>
      <Footer />
    </BrowserRouter>
  );
}
