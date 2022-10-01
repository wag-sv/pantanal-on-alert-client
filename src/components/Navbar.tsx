import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdPerson, MdLogout } from 'react-icons/md';
import { AuthContext } from '../contexts/AuthContext';
import { colors } from '../resources/theme';

const Wrapper = styled.div`
align-items: center;
  background-color: ${colors.red};
  border-top: solid 1px ${colors.yellow};
  display: flex;
  height: var(--navbar-height);
  justify-content: flex-end;
  padding: 0px 5%;
  width: 100%;
`;

const HorizontalMenu = styled.div`
  align-items: center;
  color: ${colors.yellow};
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  padding: 0px;

  a {
    align-items: center;
    border: solid 2px ${colors.red};
    color: ${colors.yellow};
    cursor: pointer;
    display: flex;
    font-size: 1.5rem;
    height: 35px;
    padding: 0px 10px;
    text-decoration: none;

    &:hover {
      border: solid 2px ${colors.yellow};
    }

    &.active {
      background-color: ${colors.yellow};
      border: solid 2px ${colors.yellow};
      color: ${colors.red};
    }
  }
`;

const Logout = styled.div`
  align-items: center;
  border: solid 2px ${colors.red};
  color: ${colors.yellow};
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  height: 35px;
  padding: 0px 10px;
  text-decoration: none;

  &:hover {
    border: solid 2px ${colors.yellow};
  }
`;

export function Navbar() {
  const navigate = useNavigate();
  const { authenticatedUser, setAuthenticatedUser } = React.useContext(AuthContext);
  const { token, user } = authenticatedUser;
  const isAdmin = !!user.isAdmin;

  const handleLogout = () => {
    localStorage.removeItem('authenticatedUser');
    setAuthenticatedUser({ token: '', user: {} });
    navigate('/');
  };

  return (
    <Wrapper>
      <HorizontalMenu>
        <NavLink to="/">Mapa</NavLink>
        <NavLink to="/about">Sobre</NavLink>
        {token && isAdmin && <NavLink to="/dashboard">Dashboard</NavLink>}
        {!token && <NavLink to="/authenticate">Entrar</NavLink>}
        {!token && <NavLink to="/register">Cadastrar</NavLink>}
        {token && <NavLink to="/profile"><MdPerson size="25px" /></NavLink>}
        {token && <Logout onClick={handleLogout}><MdLogout size="25px" /></Logout>}
      </HorizontalMenu>
    </Wrapper>
  );
}
