import styled from 'styled-components';

type BackgroundProps = {
  backgroundColor?: string;
  backgroundImage?: string;
};

export const Background = styled.div<BackgroundProps>`
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  justify-content: flex-start;
  overflow: auto;
  padding: 50px 5%;
  position: relative;
  width: 100%;
`;
