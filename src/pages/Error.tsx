import React from 'react';
import styled from 'styled-components';
import { RedParagraph } from '../components/Paragraph';
import { colors } from '../resources/theme';

const Wrapper = styled.div`
  align-items: center;
  background-color: ${colors.darkGray};
  color: ${colors.red};
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export function Error({ error }: any) {
  return (
    <Wrapper>
      <RedParagraph>{ error }</RedParagraph>
    </Wrapper>
  );
}
