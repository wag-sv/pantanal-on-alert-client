import styled from 'styled-components';

type BackgroundProps = {
  backgroundImage: string;
};

export const Background = styled.div<BackgroundProps>`
  align-items: center;
  background-color: linear-gradient(to top, rgba(0,0,0, 0.3), rgba(0,0,0, 0.3));
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  overflow: auto;
  padding: 50px 5%;
  position: relative;
  width: 100%;
`;
