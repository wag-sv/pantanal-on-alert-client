import React from 'react';
import styled from 'styled-components';
import { MdDone, MdClose } from 'react-icons/md';
import Tippy from '@tippyjs/react';
import { DarkGrayLabel } from './Label';
import { colors } from '../resources/theme';

type WrapperProps = {
  gridArea?: string;
};

const Wrapper = styled.div<WrapperProps>`
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
  gap:3px;
  width: 100%;
`;

const Input = styled.input`
  border: 1px solid ${colors.darkGray};
  color: ${colors.darkGray};
  font-size: 1.6rem;
  height: 50px;
  margin: 0px;
  outline: none;
  padding: 10px 20px;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  gap:3px;
`;

const Button = styled.button`
  align-items: center;
  background-color: ${colors.darkGray};
  border: none;
  color: ${colors.white};
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  height: 50px;
  justify-content: center;

  &:hover {
    background-color: ${colors.green};
  }
`;

type EditableItemProps = {
  label: string;
  id: string;
  name: string;
  type: string;
  maxLength: number;
  placeholder: string;
  autoComplete: string;
  value: string;
  onChange: (event: any) => void;
  cancel: () => void;
  gridArea?: string;
};

export function PopupInput({
  label, id, name, type, maxLength, placeholder, autoComplete, value, onChange, cancel, gridArea,
}: EditableItemProps) {
  return (
    <Wrapper gridArea={gridArea}>
      <DarkGrayLabel htmlFor={id}>{label}</DarkGrayLabel>
      <Flex>
        <Input
          id={id}
          name={name}
          type={type}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <Buttons>
          <Tippy content="CANCELAR"><Button onClick={cancel}><MdClose size="25px" /></Button></Tippy>
          <Tippy content="CONFIRMAR"><Button type="submit"><MdDone size="25px" /></Button></Tippy>
        </Buttons>
      </Flex>
    </Wrapper>
  );
}
