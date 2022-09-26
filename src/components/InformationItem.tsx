import React from 'react';
import styled from 'styled-components';
import { YellowLabel } from './Label';
import { colors } from '../resources/theme';
import { WhiteH3 } from './H3';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0px;
    width: 100%;
`;

const Title = styled.div`
  align-items: center;
  background-color: ${colors.deepRed};
  border: none;
  color: ${colors.deepRed};
  display: flex;
  justify-content: center;
  padding: 5px 15px;
  width: 100%;
`;

const Content = styled.div`
  align-items: center;
  background-color: ${colors.darkRed};
  display: flex;
  justify-content: center;
  padding: 10px 15px;
  width: 100%;
`;

type DashboardItemProps = {
  title: string;
  content: string;
};

export function InformationItem({ title, content }: DashboardItemProps) {
  return (
    <Wrapper>
      <Title>
        <WhiteH3>{title}</WhiteH3>
      </Title>
      <Content>
        <YellowLabel>{content}</YellowLabel>
      </Content>
    </Wrapper>
  );
}
