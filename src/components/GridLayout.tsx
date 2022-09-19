import React from 'react';
import styled from 'styled-components';
import { devices } from '../resources/devices';

type GridLayoutProps = {
  children: React.ReactNode;
  gridTemplateColumns: string;
  gridTemplateAreas: string;
};

type GridProps = {
  gridTemplateColumns: string;
  gridTemplateAreas: string;
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px;
  width: 100%;
`;

const Grid = styled.div<GridProps>`
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 0px;
  width: 100%;
  
  @media ${devices.tablet} {
    display: grid;
    grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
    grid-template-areas: ${({ gridTemplateAreas }) => gridTemplateAreas};
    gap: 0px 20px;
  }
`;

export function GridLayout({ children, gridTemplateColumns, gridTemplateAreas }: GridLayoutProps) {
  return (
    <Wrapper>
      <Grid gridTemplateColumns={gridTemplateColumns} gridTemplateAreas={gridTemplateAreas}>
        {children}
      </Grid>
    </Wrapper>
  );
}
