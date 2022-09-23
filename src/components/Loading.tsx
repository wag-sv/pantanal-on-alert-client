import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  background-color: rgba(1, 1, 1, 0.8);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 7000;
`;

const Circle = styled.div`
  animation: 0.7s infinite ease-in-out;
  animation-name: loader;
  background-color: var(--red);
  border-radius: 50%;
  height: 50px;
  width: 50px;

  &:before,
  &:after {
    animation: 0.7s infinite ease-in-out;
    border-radius: 50%;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
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
