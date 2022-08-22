import styled from 'styled-components';

import bgAbout from '../assets/images/bg/bgAbout.jpg';
import bgFireFighter from '../assets/images/bg/bgFireFighter.jpg';
import bgForest from '../assets/images/bg/bgForest.jpg';

export const AboutSection1 = styled.div`
  background: url(${bgAbout});
  /* background: url(${bgAbout}) rgba(183, 4, 13, 0.3);
  background-blend-mode: overlay; */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left top;
  width: 100%;
  box-sizing: border-box;
  padding: 70px 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const AboutSection1Row1 = styled.div`
  width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  gap: 30px;

  div {
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AboutSection1Row1Line = styled.div`
  width: 200px;
  border: 1px solid yellow;

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
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  p {
    color: var(--yellow);
    font-size: x-large;
    font-weight: 400;
    text-align: justify;
  }
  @media (max-width: 800px) {
    width: 100%;

    p {
      font-size: large;
    }
  }
`;

export const AboutSection1Row3 = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  gap: 15px;

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AboutSection1Row3Group = styled.div`
  width: 50%;
  display: flex;
  box-sizing: border-box;
  gap: 15px;

  @media (max-width: 1200px) {
    width: 100%;
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const AboutSection1Row3Card = styled.div`
  width: 50%;
  height: 150px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 70px;

  img {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -50px;
  }

  p {
    color: var(--red);
    text-align: center;
    padding-top: 30px;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AboutSection2 = styled.div`
  background-color: white;
  width: 100%;
  box-sizing: border-box;
  padding: 70px 5%;
  height: var(--main-height);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
`;

export const AboutSection2Row = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AboutSection2RowH2 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  h2 {
    color: var(--red);
    font-weight: 500;
    margin: 0px 0px 0px 10px;
  }
`;

export const AboutSection2RowLine = styled.div`
  width: 90px;
  background-color: var(--yellow);
  height: 3px;
`;

export const AboutSection2RowParagraph = styled.p`
  color: var(--red);
  text-align: justify;
`;

export const AboutSection3 = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  display: flex;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const AboutSection3Column1 = styled.div`
  background: url(${bgFireFighter});
  background-repeat: no-repeat;
  background-size: cover;
  width: 30%;
  height: 250px;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AboutSection3Column2 = styled.div`
  background: url(${bgForest});
  background-repeat: no-repeat;
  background-size: cover;
  width: 70%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AboutSection3Row = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const AboutSection3RowH2 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  h2 {
    color: white;
    font-weight: 500;
    margin: 0px 0px 0px 10px;
  }
`;

export const AboutSection3RowLine = styled.div`
  width: 90px;
  background-color: var(--yellow);
  height: 3px;
`;

export const AboutSection3RowParagraph = styled.p`
  color: white;
  text-align: justify;
`;
