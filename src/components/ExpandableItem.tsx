import React from 'react';
import styled from 'styled-components';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { colors } from '../resources/theme';
import { devices } from '../resources/devices';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0px;
    width: 100%;
`;

const Header = styled.div`
  align-items: center;
  background-color: ${colors.deepRed};
  border: none;
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  width: 100%;
`;

const Title = styled.div`
  color: ${colors.white};
  font-size: 1rem;
  font-weight: 400;

  @media ${devices.tablet} {
    font-size: 1.5rem;
  }
`;

const Content = styled.div`
  align-items: flex-start;
  background-color: ${colors.darkRed};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 15px;
  width: 100%;
`;

const Row = styled.div`
    border-bottom: 1px dotted ${colors.yellow};
    color: ${colors.yellow};
    font-size: 1rem;
    font-weight: 400;
    margin: 5px 0px;
    padding-bottom: 5px;
    width: 100%;

    span {
      margin-left: 10px;
    }

    @media ${devices.tablet} {
    font-size: 1.5rem;
  }
`;

const Expand = styled.div`
  cursor: pointer;
  height: 100%;

  &:hover {
    background-color: ${colors.darkRed};
  }
`;

type DashboardItemProps = {
  children: React.ReactNode
  title: string;
  content: any;
};

export function ExpandableItem({ children, title, content }: DashboardItemProps) {
  const [show, setShow] = React.useState(false);

  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        <Expand>
          {!show && <MdExpandMore size="25px" color={colors.yellow} onClick={() => setShow(!show)} />}
          {show && <MdExpandLess size="25px" color={colors.yellow} onClick={() => setShow(!show)} />}
        </Expand>
      </Header>
      {show && (
      <Content>
        {Object.keys(content).map((key: any) => (
          <Row key={key}>
            <strong>{`${key}:`}</strong>
            <span>{content[key]}</span>
          </Row>
        ))}
        {children}
      </Content>
      )}
    </Wrapper>
  );
}
