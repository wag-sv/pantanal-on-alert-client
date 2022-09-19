import React from 'react';
import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';

import { WhiteLabel } from './Label';
import { devices } from '../resources/devices';

const Wrapper = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    padding: 10px 0px;
    width: 100%;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap:3px;

  @media ${devices.tablet} {
    flex-direction: row;
  }
`;

const Item = styled.div`
  border: none;
  background-color: var(--hover);
  color: var(--white);
  font-size: 1.6rem;
  height: 50px;
  margin: 0px;
  outline: none;
  padding: 10px 20px;
  width: 100%;
  cursor: not-allowed;

  @media ${devices.tablet} {
    flex-grow: 1;
  }
`;

const Button = styled.button`
  background-color: var(--gray);
  height: 50px;
  flex-grow: 1;
  border: none;
  cursor: pointer;
  color: var(--red);
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    cursor: not-allowed;
  }

  @media ${devices.tablet} {
    width: 50px;
    min-width: 50px;
  }
`;

interface NonEditableItemProps {
  label: string;
  value: string;
}

export function NonEditableItem({ label, value }: NonEditableItemProps) {
  return (
    <Wrapper>
      <WhiteLabel>{label}</WhiteLabel>
      <Flex>
        <Item>{value}</Item>
        <Button disabled><MdEdit size="25px" /></Button>
      </Flex>
    </Wrapper>
  );
}
