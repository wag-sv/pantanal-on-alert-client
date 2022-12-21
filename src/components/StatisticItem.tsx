import React from 'react';
import styled from 'styled-components';
import { colors } from '../resources/theme';
import { devices } from '../resources/devices';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${devices.mobileM} {
    flex-direction: row;
  }
`;

const Name = styled.div`
  align-items: center;
  background-color: ${colors.white};
  border: none;
  color: ${colors.red};
  display: flex;
  flex-grow: 1;
  font-size: 1.2rem;
  font-weight: 500;
  height: 40px;
  justify-content: center;
  margin: 0px;
  padding: 10px;

  @media ${devices.mobileM} {
    justify-content: flex-start;
  }
`;

const Number = styled.div`
  align-items: center;
  background-color: ${colors.yellow};
  border: none;
  color: ${colors.red};
  display: flex;
  font-size: 1.3rem;
  height: 40px;
  justify-content: center;
  margin: 0px;
  padding: 10px;
  width: 100%;

  @media ${devices.mobileM} {
    width: 90px;
    min-width: 90px;
  }
`;

type StatisticItemProps = {
  name: string;
  number: string;
};

export function StatisticItem({ name, number }: StatisticItemProps) {
  return (
    <Wrapper>
      <Name>{name}</Name>
      <Number>{number}</Number>
    </Wrapper>
  );
}
