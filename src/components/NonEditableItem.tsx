import React from 'react';
import styled from 'styled-components';
import { mask as masker } from 'node-masker';
import { MdEdit } from 'react-icons/md';
import { WhiteLabel } from './Label';
import { devices } from '../resources/devices';
import { colors } from '../resources/theme';

type WrapperProps = {
  gridArea?: string;
};

const Wrapper = styled.div<WrapperProps>`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  grid-area: ${({ gridArea }) => gridArea || ''};
  justify-content: center;
  overflow: hidden;
  padding: 10px 0px;
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap:3px;
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
  font-size: 1.6rem;
  height: 50px;
  margin: 0px;
  outline: none;
  padding: 10px 20px;
  width: 100%;

  @media ${devices.tablet} {
    flex-grow: 1;
  }
`;

const Button = styled.button`
  align-items: center;
  background-color: ${colors.gray};
  border: none;
  color: ${colors.red};
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  height: 50px;
  justify-content: center;

  &:disabled {
    cursor: not-allowed;
  }

  @media ${devices.tablet} {
    width: 50px;
    min-width: 50px;
  }
`;

type NonEditableItemProps = {
  label: string;
  value: string;
  mask?: string;
  gridArea?: string;
};

export function NonEditableItem({
  label, value, mask, gridArea,
}: NonEditableItemProps) {
  return (
    <Wrapper gridArea={gridArea}>
      <WhiteLabel>{label}</WhiteLabel>
      <Flex>
        <Item>{mask ? masker(value, mask) : value}</Item>
        <Button disabled><MdEdit size="25px" /></Button>
      </Flex>
    </Wrapper>
  );
}
