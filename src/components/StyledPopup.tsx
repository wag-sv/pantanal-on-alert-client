import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Popup } from 'react-leaflet';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../Services/api';
import { Loading } from './Loading';
import { colors } from '../resources/theme';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 1.6rem;
    margin: 15px  0px 0px 0px;
  }

  p {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 5px 0px;
    text-align: center;
  }

  div {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px  0px 0px 0px;
    width: 100%;
  }

  button {
    background-color: ${colors.green};
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
    color: ${colors.white};
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    overflow: hidden;
    padding: 10px;
    width: 100%;
    margin: 10px 0px;

    &:hover {
        transform: scale(1.03);
    }
  }

  .redText {
    color: ${colors.red};
    font-size: 1.3rem;
  }

  .greenText {
    color: ${colors.green};
    font-size: 1.3rem;
  }
`;

export function StyledPopup({ property } : any) {
  const { COD_IMOVEL: propertyCode, NOM_MUNICI: propertyCounty, COD_ESTADO: propertyState } = property.properties;
  const { authenticatedUser, setAuthenticatedUser } = React.useContext(AuthContext);
  const [error, setError] = React.useState('');
  const [negotiating, setNegotiating] = React.useState(false);
  const navigate = useNavigate();

  const goToAuthentication = () => {
    navigate('/authenticate');
  };

  async function subscribe() {
    const requestParameters = { propertyCode, propertyCounty, propertyState };
    try {
      setNegotiating(true);
      const response = await api.post('/subscribe', requestParameters);
      setNegotiating(false);
      if (response.data.error) {
        setError(response.data.error);
        return;
      }
      const updatedUser = { ...authenticatedUser, user: response.data.user };
      setAuthenticatedUser(updatedUser);
      localStorage.setItem('authenticatedUser', JSON.stringify(updatedUser));
    } catch (catched: any) {
      setNegotiating(false);
      setError('Erro inesperado. Tente novamente em alguns instantes.');
    }
  }

  const userIsAuthenticated = () => (!!authenticatedUser.token);
  const userIsSubscribed = () => authenticatedUser.user.subscriptions.some((subscription: any) => subscription.propertyCode === propertyCode);

  return (
    <>
      {negotiating && <Loading />}
      <Popup>
        <Wrapper>
          <h1>CÓDIGO CAR FEDERAL</h1>
          <p>{propertyCode}</p>
          <h1>MUNICÍPIO</h1>
          <p>{`${propertyCounty} - ${propertyState}`}</p>
          <div>
            {!userIsAuthenticated() && <p>Entre no sistema para se inscrever no recebimento de alertas de queimadas nesta propriedade.</p>}
            {!userIsAuthenticated() && <button type="button" onClick={goToAuthentication}>ENTRAR</button>}
            {userIsAuthenticated() && !userIsSubscribed() && <p>Increva-se para receber alertas de queimadas desta propriedade.</p>}
            {error && <p className="redText">{error}</p>}
            {userIsAuthenticated() && !userIsSubscribed() && <button type="button" onClick={() => subscribe()}>INSCREVER-SE</button>}
            {userIsAuthenticated() && userIsSubscribed() && <p className="greenText">Você está inscrito para receber alertas de queimadas desta propriedade.</p>}
          </div>
        </Wrapper>
      </Popup>
    </>
  );
}
