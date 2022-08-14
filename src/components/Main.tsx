import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  background: white;
  width: 100%;
  height: var(--main-height);
  position: absolute;
  top: var(--header-height);
  box-sizing: border-box;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 11px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--red);
    background-image: -webkit-linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 0.3) 50%,
      transparent,
      transparent
    );
    
  }
`;

type MainProps = {
  children: React.ReactNode;
};

export function Main({ children }: MainProps) {
  return <Content>{children}</Content>;
}
