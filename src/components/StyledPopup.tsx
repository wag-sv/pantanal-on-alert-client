import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Popup } from 'react-leaflet';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../Services/api';
import { Loading } from './Loading';
import { Form } from './Form';
import { PopupInput } from './PopupInput';
import { colors } from '../resources/theme';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
    color: ${colors.darkGray};
    font-size: 1.8rem;
    font-weight: 700;
    margin-top: 10px;
`;

const Subtitle = styled.p`
    color: ${colors.darkGray};
    font-size: 1.1rem;
    font-weight: 500;
    margin: 5px 0px !important;
`;

const Information = styled.p`
    color: ${colors.darkGray};
    font-size: 1.4rem;
    font-weight: 500;
    margin: 20px 0px !important;
    text-align: center;
`;

const Error = styled.p`
    color: ${colors.red};
    font-size: 1.3rem;
    font-weight: 400;
    margin: 20px 0px !important;
    text-align: center;
`;

const Success = styled.p`
    color: ${colors.green};
    font-size: 1.3rem;
    font-weight: 400;
    margin: 20px 0px !important;
    text-align: center;
`;

const Submit = styled.button`
    background-color: ${colors.green};
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
    color: ${colors.white};
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 700;
    height: 50px;
    margin: 10px 0px;
    overflow: hidden;
    padding: 10px;
    width: 100%;

    &:hover {
        transform: scale(1.03);
    }
`;

export function StyledPopup({ property } : any) {
  const navigate = useNavigate();
  const { COD_IMOVEL: propertyCode, NOM_MUNICI: propertyCounty, COD_ESTADO: propertyState } = property.properties;
  const { authenticatedUser, setAuthenticatedUser } = React.useContext(AuthContext);
  const [subscribe, setSubscribe] = React.useState(false);
  const [error, setError] = React.useState('');
  const [negotiating, setNegotiating] = React.useState(false);
  const [propertyName, setPropertyName] = React.useState('');

  const goToAuthentication = () => {
    navigate('/authenticate');
  };

  const handleChange = (event: any) => {
    const { value } = event.target;
    setPropertyName(value.toUpperCase());
  };

  const handleSubscription = async (event: any) => {
    event.preventDefault();
    const requestParameters = {
      propertyName, propertyCode, propertyCounty, propertyState,
    };
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
      setSubscribe(false);
    } catch (catched: any) {
      setNegotiating(false);
      setError('Erro inesperado. Tente novamente em alguns instantes.');
    }
  };

  const userIsAuthenticated = () => (!!authenticatedUser.token);
  const userIsSubscribed = () => authenticatedUser.user.subscriptions.some((subscription: any) => subscription.propertyCode === propertyCode);

  return (
    <>
      {negotiating && <Loading />}
      <Popup>
        {!subscribe && (
        <Wrapper>
          <Title>CÓDIGO CAR FEDERAL</Title>
          <Subtitle>{propertyCode}</Subtitle>
          <Title>MUNICÍPIO</Title>
          <Subtitle>{`${propertyCounty} - ${propertyState}`}</Subtitle>
          {!userIsAuthenticated() && <Information>Entre no sistema para se inscrever no recebimento de alertas de queimadas nesta propriedade.</Information>}
          {!userIsAuthenticated() && <Submit onClick={goToAuthentication}>ENTRAR</Submit>}
          {userIsAuthenticated() && !userIsSubscribed() && <Information>Increva-se para receber alertas de queimadas desta propriedade.</Information>}
          {userIsAuthenticated() && !userIsSubscribed() && <Submit onClick={(e) => { e.stopPropagation(); setSubscribe(true); }}>INSCREVER-SE</Submit>}
          {userIsAuthenticated() && userIsSubscribed() && <Success>Você está inscrito para receber alertas de queimadas desta propriedade.</Success>}
        </Wrapper>
        )}
        {subscribe && (
        <Wrapper>
          <Title>CÓDIGO CAR FEDERAL</Title>
          <Subtitle>{propertyCode}</Subtitle>
          <Information>Para se inscrever no recebimento de alertas de queimadas será necessário fornecer um nome ou apelido que melhor identifique esta propriedade.</Information>
          {userIsAuthenticated() && !userIsSubscribed() && (
          <Form onSubmit={handleSubscription}>
            <PopupInput
              label="NOME/APELIDO DA PROPRIEDADE"
              id="name"
              name="name"
              type="text"
              maxLength={40}
              placeholder="Digite aqui"
              autoComplete="off"
              value={propertyName}
              onChange={handleChange}
              cancel={() => setSubscribe(false)}
            />
            {error && <Error>{error}</Error>}
          </Form>
          )}
        </Wrapper>
        )}
      </Popup>
    </>
  );
}
