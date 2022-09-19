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
  width: 90px;
  background-color: var(--yellow);
  height: 1px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  margin: 25px 0px 20px 0px;
`;

const Row = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: smaller;
  gap: 2px;

  @media (max-width: 600px) {
    font-size: 11px;
  }
`;

const Data = styled.div`
  background-color: var(--hover);
  color: white;
  flex-grow: 1;
  height: 40px;
  box-sizing: border-box;
  border: none;
  padding-left: 15px;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--hover);
  }
`;

const ContentMySubscriptions = styled.div`
  background-color: var(--red);
  width: 700px;
  box-sizing: border-box;
  padding: 30px 50px 30px 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

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
