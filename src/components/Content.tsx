import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: var(--content-height);
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
`;

type ContentProps = {
  children: React.ReactNode;
};

export function Content({ children }: ContentProps) {
  return <Wrapper>{children}</Wrapper>;
}

// TODO: melhorar o código da estitilização deste componente
