import React from 'react';
import styled from 'styled-components';
import { colors } from '../resources/theme';
import { devices } from '../resources/devices';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Name = styled.div`
  align-items: center;
  background-color: ${colors.white};
  border: none;
  color: ${colors.red};
  display: flex;
  flex-grow: 1;
  font-size: 1.1rem;
  font-weight: 500;
  height: 40px;
  justify-content: flex-start;
  margin: 0px;
  padding: 10px 20px;

  @media ${devices.mobileL} {
    font-size: 1.3rem;
  }
`;

const Number = styled.div`
  align-items: center;
  background-color: ${colors.yellow};
  border: none;
  color: ${colors.red};
  display: flex;
  font-size: 1.1rem;
  height: 40px;
  justify-content: center;
  margin: 0px;
  min-width: 80px;
  padding: 10px 20px;
  width: 80px;

  @media ${devices.mobileL} {
    font-size: 1.3rem;
    width: 100px;
    min-width: 100px;
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
