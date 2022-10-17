import React from 'react';

import AboutSection1Row1ImgSrc from '../assets/images/logo/wetlandLogo.svg';
import satelliteSrc from '../assets/images/icon/satelliteIcon.svg';
import fireSpotSrc from '../assets/images/icon/fireSpotIcon.svg';
import markerSrc from '../assets/images/icon/markerIcon.svg';
import alertSrc from '../assets/images/icon/alertIcon.svg';
import {
  AboutSection1,
  AboutSection1Row1,
  AboutSection1Row1Line,
  AboutSection1Row1Img,
  AboutSection1Row2,
  AboutSection1Row3,
  AboutSection1Row3Group,
  AboutSection1Row3Card,
  AboutSection2,
  AboutSection2Row,
  AboutSection2RowH2,
  AboutSection2RowLine,
  AboutSection2RowParagraph,
  AboutSection3,
  AboutSection3Column1,
  AboutSection3Column2,
  AboutSection3Row,
  AboutSection3RowH2,
  AboutSection3RowLine,
  AboutSection3RowParagraph,
} from './aboutComponents';

export function About() {
  return (
    <>
      <AboutSection1>
        <AboutSection1Row1>
          <AboutSection1Row1Line />
          <AboutSection1Row1Img src={AboutSection1Row1ImgSrc} />
          <AboutSection1Row1Line />
        </AboutSection1Row1>
        <AboutSection1Row2>
          <p>
            O sistema “Pantanal em Alerta” é uma iniciativa do Corpo de
            Bombeiros, em parceria com o Ministério Público de Mato Grosso do
            Sul e visa auxiliar aos proprietários rurais, brigadistas,
            autoridades públicas e toda a sociedade na prevenção e combate aos
            incêndios florestais no Pantanal.
          </p>
        </AboutSection1Row2>
        <AboutSection1Row3>
          <AboutSection1Row3Group>
            <AboutSection1Row3Card>
              <img src={satelliteSrc} alt="Satélite." />
              <p>Identificação de focos de calor por satélite.</p>
            </AboutSection1Row3Card>
            <AboutSection1Row3Card>
              <img src={fireSpotSrc} alt="Fogo." />
              <p>Coleta de dados de focos de calor a cada 1 hora.</p>
            </AboutSection1Row3Card>
          </AboutSection1Row3Group>
          <AboutSection1Row3Group>
            <AboutSection1Row3Card>
              <img src={markerSrc} alt="Marcador." />
              <p>Visualização das propriedades rurais do bioma Pantanal.</p>
            </AboutSection1Row3Card>
            <AboutSection1Row3Card>
              <img src={alertSrc} alt="Alerta." />
              <p>Disparo de alertas de incêndio via email e SMS.</p>
            </AboutSection1Row3Card>
          </AboutSection1Row3Group>
        </AboutSection1Row3>
      </AboutSection1>
      <AboutSection2>
        <AboutSection2Row>
          <AboutSection2RowH2>
            <AboutSection2RowLine />
            <h2>Focos de Calor</h2>
          </AboutSection2RowH2>
          <AboutSection2RowParagraph>
            São fontes de emissão de calor: incêndios, carvoarias, queimadas
            controladas e outras fontes detectáveis.
          </AboutSection2RowParagraph>
        </AboutSection2Row>

        <AboutSection2Row>
          <AboutSection2RowH2>
            <AboutSection2RowLine />
            <h2>Todo foco de calor é crime ou ilegal?</h2>
          </AboutSection2RowH2>
          <AboutSection2RowParagraph>
            Não. O fato de apresentar foco de calor em uma propriedade não
            indica que está ocorrendo crime ou algo ilegal, uma vez que há na
            legislação casos em que o uso do fogo é permitido.
          </AboutSection2RowParagraph>
        </AboutSection2Row>

        <AboutSection2Row>
          <AboutSection2RowH2>
            <AboutSection2RowLine />
            <h2>De onde vem os dados?</h2>
          </AboutSection2RowH2>
          <AboutSection2RowParagraph>
            INPE, conjugados com a base de dados do SICAR - Sistema Nacional
            de Cadastro Ambiental Rural.
          </AboutSection2RowParagraph>
        </AboutSection2Row>
      </AboutSection2>

      <AboutSection3>
        <AboutSection3Column1 />
        <AboutSection3Column2>
          <AboutSection3Row>
            <AboutSection3RowH2>
              <AboutSection3RowLine />
              <h2>Danos minimizados</h2>
            </AboutSection3RowH2>
            <AboutSection3RowParagraph>
              O finalidade do sistema Pantanal em Alerta é permitir que se
              identifiquem os locais onde estão ocorrendo prováveis
              incêndios, bom como os imóveis em que se encontram para que seja
              possível o acionamento de autoridades, proprietários e
              brigadistas voluntários da região, visando minimizar as
              consequências.
            </AboutSection3RowParagraph>
          </AboutSection3Row>
        </AboutSection3Column2>
      </AboutSection3>
    </>
  );
}
