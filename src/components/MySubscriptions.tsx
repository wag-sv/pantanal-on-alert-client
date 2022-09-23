import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { HiDocument } from 'react-icons/hi';
import { IconContext } from 'react-icons';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../Services/api';
import { Loading } from './Loading';

import EnrollmentProof from '../reports/EnrollmentProof';

const H1 = styled.h1`
  color: white;
  font-weight: 500;
  margin: 15px 0px 5px 0px;
`;

const Line = styled.div`
  background-color: var(--yellow);
  height: 1px;
  width: 90px;
`;

const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: flex-start;
  margin: 25px 0px 20px 0px;
  width: 100%;
`;

const Row = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  font-size: smaller;
  gap: 2px;
  width: 100%;

  @media (max-width: 600px) {
    font-size: 11px;
  }
`;

const Data = styled.div`
  align-items: center;
  background-color: var(--hover);
  border: none;
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-grow: 1;
  height: 40px;
  padding-left: 15px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Icon = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 40px;

  &:hover {
    background-color: var(--hover);
  }
`;

const ContentMySubscriptions = styled.div`
  align-items: flex-start;
  background-color: var(--red);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 30px 50px 30px 50px;
  width: 700px;

  @media (max-width: 900px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    padding: 20px 50px 20px 50px;
  }

  @media (max-width: 400px) {
    padding: 20px 30px 20px 30px;
  }
`;

export default function MySubscriptions({ setOption }: any) {
  const authContext = useContext(AuthContext);

  const { authenticatedUser } = authContext;
  const { name, cpf, subscriptions } = authenticatedUser.user;

  const [queue, setQueue] = useState([]);

  async function handleUpdate(propertyCode, index) {
    setQueue([...queue, index]);

    try {
      const response = await api.post('/unsubscribe', { propertyCode });

      const updatedUser = {
        ...authenticatedUser,
        user: { ...response.data.user },
      };

      authContext.setAuthenticatedUser(updatedUser);
      localStorage.setItem('authenticatedUser', JSON.stringify(updatedUser));
      setQueue([...queue.filter((el) => el !== index)]);
    } catch (err) {
      setQueue([...queue.filter((el) => el !== index)]);

      console.error(err.response.data);
    }
  }

  return (
    <ContentMySubscriptions>
      <H1>Minhas Inscrições</H1>
      <Line />

      <Wrapper>
        {subscriptions.map((subscription, index) => (
          <Row key={index}>
            <Data>{subscription.propertyCode}</Data>
            <IconContext.Provider value={{ color: '#fdf117', size: '20px' }}>
              <Icon
                onClick={() => {
                  console.log(subscription);
                  EnrollmentProof(
                    name,
                    cpf,
                    subscription.propertyCode,
                    subscription.subscriptionDate,
                  );
                }}
              >
                <HiDocument />
              </Icon>
              <Icon
                onClick={() => handleUpdate(subscription.propertyCode, index)}
              >
                <MdDelete />
              </Icon>
            </IconContext.Provider>

            {queue.indexOf(index) >= 0 && <Loading />}
          </Row>
        ))}
      </Wrapper>
    </ContentMySubscriptions>
  );
}
