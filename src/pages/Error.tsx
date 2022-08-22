import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  background-color: rgba(1, 1, 1, 0.8);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--red);
`;

export function Error({ error }: any) {
  return (
    <Div>{ error }</Div>
  );
}
