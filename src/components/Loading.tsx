import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: rgba(1, 1, 1, 0.8);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 7000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--red);
  animation: 0.7s infinite ease-in-out;
  animation-name: loader;

  &:before,
  &:after {
    animation: 0.7s infinite ease-in-out;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }

  @keyframes loader {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

export function Loading() {
  return (
    <Wrapper>
      <Circle />
    </Wrapper>
  );
}
