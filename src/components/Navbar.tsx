import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { MdPerson } from 'react-icons/md';
import { AuthContext } from '../contexts/AuthContext';

const Wrapper = styled.div`
background-color: var(--red);
  height: var(--navbar-height);
  width: 100%;
  border-top: solid 1px var(--yellow);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 5%;
`;

const HorizontalMenu = styled.div`
  padding: 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: var(--yellow);
  gap: 10px;

  a {
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0px 10px;
    text-decoration: none;
    color: var(--yellow);
    border: solid 2px var(--red);
    display: flex;
    align-items: center;
    height: 35px;

    &:hover {
        border: solid 2px var(--yellow);
    }

    &.active {
        background-color: var(--yellow);
        color: var(--red);
        border: solid 2px var(--yellow);
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
