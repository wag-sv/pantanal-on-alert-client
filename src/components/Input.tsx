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

const FormInput = styled.input`
  border: none;
  color: var(--red);
  font-size: 1.6rem;
  height: 50px;
  margin: 0px;
  outline: none;
  padding: 10px 20px;
  width: 100%;
`;

export function Input({
  label, id, name, type, maxLength, placeholder, autoComplete, value, onChange, gridArea,
}: any) {
  return (
    <Wrapper gridArea={gridArea}>
      <WhiteLabel htmlFor={id}>{label}</WhiteLabel>
      <FormInput
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
