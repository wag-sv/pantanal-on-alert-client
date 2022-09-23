import React from 'react';
import styled from 'styled-components';
import { colors } from '../resources/theme';

const Div = styled.div`
  align-items: center;
  background-color: rgba(1, 1, 1, 0.8);
  color: ${colors.red};
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export function Error({ error }: any) {
  return (
    <Div>{ error }</Div>
  );
}
