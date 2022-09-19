import React from 'react';
import styled from 'styled-components';
import { WhiteLabel } from './Label';

type InputProps = {
  gridArea: string;
};

const Wrapper = styled.div<InputProps>`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    grid-area: ${({ gridArea }) => gridArea};
    justify-content: center;
    overflow: hidden;
    padding: 10px 0px;
    width: 100%;
`;

const Information = styled.div`
  background-color: var(--hover);
  color: var(--white);
  width: 100%;
  height: 40px;
  padding: 0px 15px;
  display: flex;
  align-items: center;
  font-size: 1.6rem;
`;

export function InformationItem({ label, information, gridArea }: any) {
  return (
    <Wrapper gridArea={gridArea}>
      <WhiteLabel>{label}</WhiteLabel>
      <Information>{information}</Information>
    </Wrapper>
  );
}
