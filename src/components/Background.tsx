import styled from 'styled-components';

type BackgroundProps = {
  backgroundImage: string;
};

export const Background = styled.div<BackgroundProps>`
  background-color: linear-gradient(to top, rgba(0,0,0, 0.3), rgba(0,0,0, 0.3));
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
  position: relative;
  padding: 50px 5%;
`;
