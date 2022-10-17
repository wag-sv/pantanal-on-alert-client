import React from 'react';
import styled from 'styled-components';
import {
  MdArticle, MdClose, MdDelete, MdDone,
} from 'react-icons/md';
import Tippy from '@tippyjs/react';
import { devices } from '../resources/devices';
import { colors } from '../resources/theme';
import EnrollmentProof from '../reports/EnrollmentProof';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../Services/api';
import { Loading } from './Loading';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin: 3px;
  width: 100%;

  @media ${devices.tablet} {
    flex-direction: row;
  }
`;

const Item = styled.div`
  align-items: center;
  background-color: ${colors.darkRed};
  border: none;
  color: ${colors.white};
  cursor: not-allowed;
  display: flex;
  font-size: 1rem;
  font-weight: 400;
  height: 50px;
  margin: 0px;
  outline: none;
  padding: 10px 20px;
  width: 100%;

  @media ${devices.mobileL} {
    font-size: 1.1rem;
  }

  @media ${devices.tablet} {
    font-size: 1.3rem;
    flex-grow: 1;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 3px;

  @media ${devices.tablet} {
    flex-grow: 1;
  }
`;

const Button = styled.button`
  align-items: center;
  background-color: ${colors.yellow};
  border: none;
  color: ${colors.red};
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  height: 50px;
  justify-content: center;

  &:hover {
    background-color: ${colors.green};
  }

  @media ${devices.tablet} {
    width: 50px;
    min-width: 50px;
  }
`;

const Span = styled.span`
  color: ${colors.yellow};
  font-size: 1.5rem;
`;

type DeleteableItemProps = {
  subscription: any;
};

export function DeleteableItem({ subscription }: DeleteableItemProps) {
  const { propertyName, propertyCode, subscriptionDate } = subscription;
  const { authenticatedUser, setAuthenticatedUser } = React.useContext(AuthContext);
  const { user } = authenticatedUser;
  const [edit, setEdit] = React.useState(false);
  const [negotiating, setNegotiating] = React.useState(false);
  const [error, setError] = React.useState('');

  const unsubscribe = async () => {
    try {
      setNegotiating(true);
      const response = await api.post('/unsubscribe', { propertyCode });
      setNegotiating(false);
      const updatedUser = { ...authenticatedUser, user: response.data.updatedUser };
      setAuthenticatedUser(updatedUser);
      localStorage.setItem('authenticatedUser', JSON.stringify(updatedUser));
    } catch (catched: any) {
      setNegotiating(false);
      setError('Erro! Tente novamente em instantes.');
    }
  };

  const showReport = () => EnrollmentProof(user.name, user.cpf, propertyCode, subscriptionDate);

  return (
    <Wrapper>
      {negotiating && <Loading />}
      {!error && <Item>{ edit ? <Span>Deseja realmente desinscrever-se?</Span> : propertyName || propertyCode }</Item>}
      {error && <Item><Span>{ error }</Span></Item>}
      <Buttons>
        {!edit && <Tippy content="VER COMPROVANTE"><Button onClick={showReport}><MdArticle size="25px" /></Button></Tippy>}
        {edit && <Tippy content="CONFIRMAR"><Button type="submit" onClick={unsubscribe}><MdDone size="25px" /></Button></Tippy>}
        {edit && <Tippy content="CANCELAR"><Button onClick={() => { setEdit(false); setError(''); }}><MdClose size="25px" /></Button></Tippy>}
        {!edit && <Tippy content="CANCELAR INSCRIÇÃO"><Button onClick={() => setEdit(true)}><MdDelete size="25px" /></Button></Tippy>}
      </Buttons>
    </Wrapper>
  );
}
