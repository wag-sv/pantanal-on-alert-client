import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: var(--content-height);
  overflow-x: hidden;
  overflow-y: auto;
`;

type ContentProps = {
  children: React.ReactNode;
};

export function Content({ children }: ContentProps) {
  return <Wrapper>{children}</Wrapper>;
}

// TODO: melhorar o código da estitilização deste componente
