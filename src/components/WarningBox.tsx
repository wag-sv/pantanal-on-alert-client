import styled from 'styled-components';
import { colors } from '../resources/theme';

export const YellowWarningBox = styled.div`
  align-items: center;
  background-color: ${colors.yellow};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 0px;
  padding: 20px;
  width: 100%;
  
  h1, h2, h3, p {
    text-align: center;
  }
`;
