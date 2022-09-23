import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';
import { mask as masker } from 'node-masker';
import { MdDone, MdRepeat, MdClose } from 'react-icons/md';
import { WhiteLabel } from './Label';
import { devices } from '../resources/devices';

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

const Input = styled.input`
  border: none;
  color: var(--red);
  font-size: 1.6rem;
  height: 50px;
  margin: 0px;
  outline: none;
  padding: 10px 20px;
  width: 100%;

  &:disabled {
    background-color: var(--hover);
    color: var(--white);
    cursor: not-allowed;
  }

  @media ${devices.tablet} {
    flex-grow: 1;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap:3px;

  @media ${devices.tablet} {
    flex-grow: 1;
  }
`;

const Button = styled.button`
  align-items: center;
  background-color: var(--yellow);
  border: none;
  color: var(--red);
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  height: 50px;
  justify-content: center;

  &:hover {
    background-color: var(--green);
  }

  @media ${devices.tablet} {
    width: 50px;
    min-width: 50px;
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
  onCancel: () => void;
  gridArea?: string;
};

export function VerificationInput({
  label, id, name, type, maxLength, placeholder, autoComplete, value, mask, onChange, resend, onCancel, gridArea,
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
        <Buttons>
          <Tippy content="CONFIRMAR"><Button type="submit"><MdDone size="25px" /></Button></Tippy>
          <Tippy content="REENVIAR CÓDIGO"><Button onClick={resend}><MdRepeat size="25px" /></Button></Tippy>
          <Tippy content="CANCELAR"><Button onClick={onCancel}><MdClose size="25px" /></Button></Tippy>
        </Buttons>
      </Flex>
    </Wrapper>
  );
}
