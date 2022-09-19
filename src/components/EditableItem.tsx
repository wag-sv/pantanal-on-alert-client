import React from 'react';
import styled from 'styled-components';
import { MdEdit, MdDone, MdClose } from 'react-icons/md';

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
  background-color: var(--green);
  height: 50px;
  flex-grow: 1;
  border: none;
  cursor: pointer;
  color: var(--red);
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${devices.tablet} {
    width: 50px;
    min-width: 50px;
  }
`;

interface EditableItemProps {
  label: string;
  id: string;
  name: string;
  type: string;
  maxLength: number;
  placeholder: string;
  autoComplete: string;
  value: string;
  onChange: (event: any) => void;
  edit: boolean;
  setEdit: (newState: any) => void;
  onCancel: () => void;
}

export function EditableItem({
  label, id, name, type, maxLength, placeholder, autoComplete, value, onChange, edit, setEdit, onCancel,
}: EditableItemProps) {
  return (
    <Wrapper>
      <WhiteLabel htmlFor={id}>{label}</WhiteLabel>
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
          disabled={!edit}
        />
        <Buttons>
          {edit && <Button type="submit" onClick={() => setEdit(true)}><MdDone size="25px" /></Button>}
          {edit && <Button onClick={() => { setEdit(false); onCancel(); }}><MdClose size="25px" /></Button>}
          {!edit && <Button onClick={() => setEdit(true)}><MdEdit size="25px" /></Button>}
        </Buttons>
      </Flex>
    </Wrapper>
  );
}
