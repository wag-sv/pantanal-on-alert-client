import React from 'react';

// import { useHistory, NavLink } from 'react-router-dom';
import styled from 'styled-components';
// import { AppContext } from '../../contexts/AppContext';
import logoPantanalSrc from '../assets/images/logo/logoPantanal.svg';
import brasaoCMBSrc from '../assets/images/logo/logoCMB.svg';
import logo193Src from '../assets/images/logo/logo193.svg';
// import userSrc from '../images/icon/user.svg';

const MainDiv = styled.div`
  background-color: var(--red);
  height: var(--header-height);
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DivLogos = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
`;

const DivLogoPantanal = styled.div`
  height: 100%;
  width: 45%;
  margin-left: 5%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const DivLogoBombeiros = styled.div`
  height: 100%;
  width: 45%;
  margin-right: 5%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LogoPantanal = styled.img`
  height: 85%;
  cursor: pointer;
`;

const LogoCMB = styled.img`
  height: 85%;
`;

const Logo193 = styled.img`
  height: 65%;
  margin-left: 10px;

  @media (max-width: 800px) {
    display: none;
  }
`;

const DivMenu = styled.div`
  height: var(--menu-height);
  width: 100%;
  border-top: solid 1px var(--yellow);
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Divlist = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 5%;
`;

const UlMenu = styled.ul`
  padding: 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: var(--yellow);

  li {
    list-style: none;
    margin-left: 15px;
    cursor: pointer;
    padding: 3px;
  }
`;

// const StyledLink = styled(NavLink)`
//   text-decoration: none;
//   color: var(--yellow);
//   padding: 3px;
//   /* border-bottom: solid 2px var(--red); */

//   &:hover {
//     border-bottom: dashed 2px var(--yellow);
//   }

//   &.active {
//     border-bottom: solid 2px var(--yellow);
//   }
// `;

// const ImageUser = styled.img`
//   width: 30px;
//   height: 30px;
// `;

// const UserLink = styled(NavLink)`
//   text-decoration: none;
//   margin-left: 15px;
//   width: 30px;
//   height: 30px;
// `;

export function Header() {
  // const appContext = useContext(AppContext);
  // const { authenticatedUser } = appContext;
  // const { token, user } = authenticatedUser;

  // const history = useHistory();
  // function goHome() {
  //   history.push('/');
  // }

  return (
    <MainDiv>
      <DivLogos>
        <DivLogoPantanal>
          <LogoPantanal src={logoPantanalSrc} />
          {/* <LogoPantanal src={logoPantanalSrc} onClick={goHome} /> */}
        </DivLogoPantanal>
        <DivLogoBombeiros>
          <LogoCMB src={brasaoCMBSrc} />
          <Logo193 src={logo193Src} />
        </DivLogoBombeiros>
      </DivLogos>

      <DivMenu>
        <Divlist>
          {/* prettier-ignore */}
          <UlMenu>
            {/* <li><StyledLink to="/">Mapa</StyledLink></li>
            <li><StyledLink to="/about">Sobre</StyledLink></li> */}
            {/* {token && user.isAdmin && <li><StyledLink to="/dashboard">Dashboard</StyledLink></li>}
            {token && <UserLink to="/profile"><ImageUser src={userSrc} /></UserLink>}
            {!token && <li><StyledLink to="/authenticate">Entrar</StyledLink></li>}
            {!token && <li><StyledLink to="/register">Cadastrar</StyledLink></li>} */}
          </UlMenu>
        </Divlist>
      </DivMenu>
    </MainDiv>
  );
}
