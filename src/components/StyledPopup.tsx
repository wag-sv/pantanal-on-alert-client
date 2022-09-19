import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Popup } from 'react-leaflet';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../Services/api';
import { Loading } from './Loading';
import { GreenButton } from './Button';

// TODO colocar tamanho de fontes em REM
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 16px;
        margin: 20px  0px 0px 0px;
    }

    p {
        font-size: 11px;
        font-weight: 700;
        text-align: center;
        margin: 5px 0px;
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 20px  0px 0px 0px;
    }

    .redText {
        color: var(--red);
    }

    .greenText {
        color: var(--green);
    }
`;

export function StyledPopup({ property } : any) {
  const { authenticatedUser, setAuthenticatedUser } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  // TODO verificar se é necessário o refreshUser
  //   const refreshUser = async () => {
  //     if (authenticatedUser.token) {
  //       const response = await api.post('/refresh_user', authenticatedUser.user);
  //       setAuthenticatedUser({ ...response.data });
  //       localStorage.setItem('authenticatedUser', JSON.stringify({ ...response.data }));
  //     }
  //   };

  //   React.useEffect(() => { refreshUser(); }, []);

  const goToAuthentication = () => {
    navigate('/authenticate');
  };

  async function subscribe() {
    const requestParameters = {
      propertyCode: property.properties.COD_IMOVEL,
      propertyCounty: property.properties.NOM_MUNICI,
      propertyState: property.properties.COD_ESTADO,
      propertyAlias: '',
    };
    // FIXME retirar try catch e melhorar o tratamendo de erros
    try {
      setLoading(true);
      const response = await api.post('/subscribe', requestParameters);
      setLoading(false);
      const updatedUser = { ...authenticatedUser, user: { ...response.data.user } };
      setAuthenticatedUser(updatedUser);
      localStorage.setItem('authenticatedUser', JSON.stringify(updatedUser));
    } catch (err) {
      // console.error(err.response.data);
      // setError({ ...err.response.data });
    }
  }

  const userIsAuthenticated = () => (!!authenticatedUser.token);

  const userIsSubscribed = () => authenticatedUser.user.subscriptions.some(
    (subscription: any) => subscription.propertyCode === property.properties.COD_IMOVEL,
  );

  return (
    <Popup>
      <Wrapper>
        {loading && <Loading />}
        <h1>CÓDIGO CAR FEDERAL</h1>
        <p>{property.properties.COD_IMOVEL}</p>
        <h1>MUNICÍPIO</h1>
        <p>{`${property.properties.NOM_MUNICI} - ${property.properties.COD_ESTADO}`}</p>
        {!userIsAuthenticated() && (
        <div>
          <p>Entre no sistema para se inscrever no recebimento de alertas de queimadas nesta propriedade.</p>
          <GreenButton onClick={goToAuthentication}>ENTRAR</GreenButton>
        </div>
        )}
        {userIsAuthenticated() && !userIsSubscribed() && (
        <div>
          <p className="redText">Increva-se para receber alertas de queimadas desta propriedade.</p>
          <GreenButton onClick={() => subscribe()}>INSCREVER-SE</GreenButton>
        </div>
        )}
        {userIsAuthenticated() && userIsSubscribed() && (
        <div>
          <p className="greenText">Você está inscrito para receber alertas de queimadas desta propriedade.</p>
        </div>
        )}
      </Wrapper>
    </Popup>
  );
}
