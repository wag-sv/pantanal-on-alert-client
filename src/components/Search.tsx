import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { YellowH3 } from './H3';
import { WhiteParagraph } from './Paragraph';
import { SearchInput } from './SearchInput';
import { colors } from '../resources/theme';
import { devices } from '../resources/devices';

const Wrapper = styled.div`
  align-items: center;
  background-color: ${colors.red};
  border: 1px solid ${colors.yellow};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  position: absolute;
  right: 70px;
  top: calc(var(--header-height) + var(--navbar-height) + 20px);
  width: calc(100% - 80px);
  z-index: 999;

  @media ${devices.mobileL} {
    width: 340px;
  }
`;

const Close = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 20px;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;

  &:hover {
    background-color: ${colors.darkRed};
    border: 1px solid ${colors.yellow}
  }
`;

type SearchProps = {
  setSearchTerm: (searchTerm: string) => void;
  setOption: (option: string) => void;
};

export function Search({ setSearchTerm, setOption }: SearchProps) {
  const [value, setValue] = React.useState('');

  React.useEffect(() => () => setSearchTerm(''), []);

  const handleChange = (event: any) => {
    if (event.target.value.length === 0) setSearchTerm('');
    if (event.target.value.length === 5) setSearchTerm(event.target.value);
    setValue(event.target.value.toUpperCase());
  };

  return (
    <Wrapper>
      <Close onClick={() => setOption('')}><MdClose size="20px" color={colors.yellow} /></Close>
      <YellowH3>BUSCAR PROPRIEDADE</YellowH3>
      <WhiteParagraph>Insira os últimos 5 dígitos do CAR</WhiteParagraph>
      <SearchInput
        id="search"
        name="search"
        type="text"
        maxLength={5}
        value={value}
        onChange={handleChange}
        placeholder="Digite aqui"
        autoComplete="off"
      />
    </Wrapper>
  );
}
