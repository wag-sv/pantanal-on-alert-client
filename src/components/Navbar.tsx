import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { MdPerson } from 'react-icons/md';
import { AuthContext } from '../contexts/AuthContext';

const Wrapper = styled.div`
align-items: center;
  background-color: var(--red);
  border-top: solid 1px var(--yellow);
  display: flex;
  height: var(--navbar-height);
  justify-content: flex-end;
  padding: 0px 5%;
  width: 100%;
`;

const HorizontalMenu = styled.div`
  align-items: center;
  color: var(--yellow);
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 0px;

  a {
    align-items: center;
    border: solid 2px var(--red);
    color: var(--yellow);
    cursor: pointer;
    display: flex;
    font-size: 1.5rem;
    height: 35px;
    padding: 0px 10px;
    text-decoration: none;

    &:hover {
        border: solid 2px var(--yellow);
    }

    &.active {
        background-color: var(--yellow);
        border: solid 2px var(--yellow);
        color: var(--red);
    }
  }
`;

export function Navbar() {
  const { authenticatedUser } = React.useContext(AuthContext);
  const { token, user } = authenticatedUser;
  const { isAdmin } = user;

  return (
    <Wrapper>
      <HorizontalMenu>
        <NavLink to="/">Mapa</NavLink>
        <NavLink to="/about">Sobre</NavLink>
        {token && isAdmin && <NavLink to="/dashboard">Dashboard</NavLink>}
        {!token && <NavLink to="/authenticate">Entrar</NavLink>}
        {!token && <NavLink to="/register">Cadastrar</NavLink>}
        {token && <NavLink to="/profile"><MdPerson size="25px" /></NavLink>}
      </HorizontalMenu>
    </Wrapper>
  );
}
