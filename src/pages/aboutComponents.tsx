import styled from 'styled-components';

import forestBurning from '../assets/images/background/forestBurning.jpg';
import firefighter from '../assets/images/background/firefighter.jpg';
import forest from '../assets/images/background/forest.jpg';
import { colors } from '../resources/theme';

export const AboutSection1 = styled.div`
  align-items: center;
  background: url(${forestBurning});
  background-position: left top;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 70px 5%;
  width: 100%;
`;

export const AboutSection1Row1 = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  gap: 30px;
  justify-content: center;
  width: 700px;

  div {
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AboutSection1Row1Line = styled.div`
  border: 1px solid yellow;
  width: 200px;

  @media (max-width: 800px) {
    width: 30%;
  }
`;

export const AboutSection1Row1Img = styled.img`
  width: 300px;

  @media (max-width: 800px) {
    width: 40%;
  }
`;

export const AboutSection1Row2 = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 80%;

  p {
    color: ${colors.yellow};
    font-size: 1.6rem;
    font-weight: 400;
    text-align: justify;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AboutSection1Row3 = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 15px;
  justify-content: space-between;
  width: 80%;

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AboutSection1Row3Group = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 15px;
  width: 50%;

  @media (max-width: 1200px) {
    width: 100%;
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const AboutSection1Row3Card = styled.div`
  align-items: center;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: center;
  margin-top: 70px;
  padding: 10px;
  position: relative;
  width: 50%;

  img {
    height: 100px;
    position: absolute;
    top: -50px;
    width: 100px;
  }

  p {
    color: ${colors.red};
    font-size: 1.4rem;
    padding-top: 30px;
    text-align: center;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AboutSection2 = styled.div`
  align-items: center;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 50px;
  height: var(--main-height);
  justify-content: flex-start;
  padding: 70px 5%;
  width: 100%;
`;

export const AboutSection2Row = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 80%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AboutSection2RowH2 = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;

  h2 {
    color: ${colors.red};
    font-size: 2.2rem;
    font-weight: 500;
    margin: 0px 0px 0px 10px;
  }
`;

export const AboutSection2RowLine = styled.div`
  background-color: ${colors.yellow};
  height: 3px;
  width: 90px;
`;

export const AboutSection2RowParagraph = styled.p`
  color: ${colors.red};
  font-size: 1.6rem;
  text-align: justify;
`;

export const AboutSection3 = styled.div`
  box-sizing: border-box;
  display: flex;
  margin: 0px;
  padding: 0px;
  width: 100%;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const AboutSection3Column1 = styled.div`
  background: url(${firefighter});
  background-repeat: no-repeat;
  background-size: cover;
  height: 250px;
  width: 30%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AboutSection3Column2 = styled.div`
  align-items: center;
  background: url(${forest});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  height: 250px;
  justify-content: center;
  width: 70%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AboutSection3Row = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 80%;
`;

export const AboutSection3RowH2 = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;

  h2 {
    color: white;
    font-size: 2.2rem;
    font-weight: 500;
    margin: 0px 0px 0px 10px;
  }
`;

export const AboutSection3RowLine = styled.div`
  background-color: ${colors.yellow};
  height: 3px;
  width: 90px;
`;

export const AboutSection3RowParagraph = styled.p`
  color: white;
  font-size: 1.6rem;
  text-align: justify;
`;
