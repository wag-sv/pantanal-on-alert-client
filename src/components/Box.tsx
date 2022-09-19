import styled from 'styled-components';
import { devices } from '../resources/devices';

type WrapperProps = {
  bgColor: string;
  width: string;
};

export const Box = styled.div<WrapperProps>`
background-color: ${({ bgColor }) => bgColor};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 50px;

  @media ${devices.tablet} {
    width: ${({ width }) => width};
  }
`;
