import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';
import { mask as masker } from 'node-masker';
import { MdRepeat } from 'react-icons/md';
import { WhiteLabel } from './Label';
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
  gap:3px;
  width: 100%;
`;

const Input = styled.input`
  border: none;
  color: ${colors.red};
  font-size: 1.6rem;
  height: 50px;
  margin: 0px;
  outline: none;
  padding: 10px 20px;
  width: 100%;

  &:disabled {
    background-color: ${colors.darkRed};
    color: ${colors.white};
    cursor: not-allowed;
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
  min-width: 50px;
    width: 50px;

  &:hover {
    background-color: ${colors.green};
  }
`;

type VerificationInputProps = {
  label: string;
  id: string;
  name: string;
  type: string;
  maxLength: number;
  placeholder: string;
  autoComplete: string;
  value: string;
  mask?: string;
  onChange: (event: any) => void;
  resend: (event: any) => Promise<void>,
  gridArea?: string;
};

export function VerificationInputSimplified({
  label, id, name, type, maxLength, placeholder, autoComplete, value, mask, onChange, resend, gridArea,
}: VerificationInputProps) {
  return (
    <Wrapper gridArea={gridArea}>
      <WhiteLabel htmlFor={id}>{label}</WhiteLabel>
      <Flex>
        <Input
          id={id}
          name={name}
          type={type}
          maxLength={maxLength}
          value={mask ? masker(value, mask) : value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <Tippy content="REENVIAR CÓDIGO"><Button onClick={resend}><MdRepeat size="25px" /></Button></Tippy>
      </Flex>
    </Wrapper>
  );
}
