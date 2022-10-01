import Tippy from '@tippyjs/react';
import React from 'react';
import { MdBarChart, MdSearch } from 'react-icons/md';
import styled from 'styled-components';
import { colors } from '../resources/theme';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  position: absolute;
  right: 10px;
  top: calc(var(--header-height) + var(--navbar-height) + 20px);
  width: 50px;
  z-index: 999;
`;

const Option = styled.div`
align-items: center;
background-color: ${colors.red};
border: 1px solid ${colors.yellow};
color:${colors.yellow};
cursor: pointer;
display: flex;
height: 50px; 
justify-content: center;
width: 50px;
`;

type MapSideMenuProps = {
  setOption: (option: string) => void;
};

export function MapSideMenu({ setOption }: MapSideMenuProps) {
  return (
    <Wrapper>
      <Tippy content="ESTATÍSTICAS"><Option onClick={() => setOption('statistics')}><MdBarChart size="35px" /></Option></Tippy>
      <Tippy content="PESQUISAR"><Option onClick={() => setOption('search')}><MdSearch size="35px" /></Option></Tippy>
    </Wrapper>
  );
}
