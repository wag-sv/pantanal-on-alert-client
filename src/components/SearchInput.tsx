import React from 'react';
import styled from 'styled-components';
import { colors } from '../resources/theme';
import { devices } from '../resources/devices';

type WrapperProps = {
  gridArea?: string;
};

const Wrapper = styled.div<WrapperProps>`
  align-items: flex-start;
  display: flex;
  gap: 3px;
  margin: 10px 0px;
  width: 100%;
`;

const Input = styled.input`
  background-color: ${colors.white};
  border: none;
  color: ${colors.red};
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

type EditableItemProps = {
  id: string;
  name: string;
  type: string;
  maxLength: number;
  placeholder: string;
  autoComplete: string;
  value: string;
  onChange: (event: any) => void;
};

export function SearchInput({
  id, name, type, maxLength, placeholder, autoComplete, value, onChange,
}: EditableItemProps) {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}
