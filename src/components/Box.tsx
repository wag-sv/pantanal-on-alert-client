import styled from 'styled-components';
import { devices } from '../resources/devices';

type WrapperProps = {
  backgroundColor: string;
  width: string;
};

export const Box = styled.div<WrapperProps>`
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 50px;
  width: 100%;

  @media ${devices.tablet} {
    width: ${({ width }) => width};
  }
`;
