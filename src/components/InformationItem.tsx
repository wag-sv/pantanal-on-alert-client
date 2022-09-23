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
  align-items: center;
  background-color: var(--hover);
  color: var(--white);
  display: flex;
  font-size: 1.6rem;
  height: 40px;
  padding: 0px 15px;
  width: 100%;
`;

export function InformationItem({ label, information, gridArea }: any) {
  return (
    <Wrapper gridArea={gridArea}>
      <WhiteLabel>{label}</WhiteLabel>
      <Information>{information}</Information>
    </Wrapper>
  );
}
