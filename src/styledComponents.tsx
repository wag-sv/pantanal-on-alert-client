import { Popup } from 'react-leaflet';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Content = styled.div`
  background-color: rgba(255, 255, 255, 1);
  color: var(--red);
  width: 100%;
  height: var(--main-height);
  position: absolute;
  top: var(--header-height);
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  #content {
    width: 80%;
    height: calc(100% - 40px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-right: 10px;
    margin-top: 20px;
    overflow: auto;

    h1 {
      align-self: center;
    }

    p {
      margin: 20px 0px 0px 0px;
      text-align: justify;
      align-self: flex-start;
    }

    a {
      color: var(--red);
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #dddddd;
    }

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--red);
      background-image: -webkit-linear-gradient(
        90deg,
        transparent,
        rgba(0, 0, 0, 0.3) 50%,
        transparent,
        transparent
      );
    }
  }
`;

export const StatItem = styled.div`
  background-color: var(--red);
  color: var(--yellow);
  width: 70%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 22px;
  box-shadow: 5px 5px 5px #333;
  border: solid 1px var(--red);

  h2 {
    font-size: 18px;
  }

  div {
    color: #f27059;
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 12px;
  }

  @media (max-width: 800px) {
    width: 90%;
  }
`;

export const ButtonRed = styled.button`
  background-color: var(--red);
  color: var(--yellow);
  padding: 10px 50px;
  margin-top: 15px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  width: 200px;
`;

export const ButtonWhite = styled.button`
  background-color: white;
  color: var(--red);
  padding: 10px 50px;
  margin-top: 15px;
  border: solid 1px var(--red);
  border-radius: 7px;
  cursor: pointer;
  width: 200px;
`;

export const Input = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 800px) {
    width: 90%;
  }

  input {
    /* background-color: var(--yellow); */
    border: none;
    border-radius: 7px;
    height: 30px;
    width: 100%;
    padding-left: 15px;
    border: 1px solid var(--red);

    &:focus {
      outline: none;
    }
  }

  label {
    background-color: white;
    align-self: flex-start;
    font-size: 10px;
    border-radius: 3px;
    position: relative;
    top: 5px;
    padding: 0px 5px;
  }
`;

export const StyledFormLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 700;
  padding: 3px;

  &:hover {
    background-color: var(--yellow);
    border-radius: 3px;
  }
`;

export const Success = styled.div`
  width: 500px;
  font-size: 14px;
  margin-top: 20px;
  color: green;
  text-align: center;
  padding: 10px;
  border: solid 1px green;
  border-radius: 7px;

  @media (max-width: 800px) {
    width: 90%;
  }
`;

export const Error = styled.div`
  background-color: var(--yellow);
  width: 500px;
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
  padding: 10px;
  border-radius: 7px;

  @media (max-width: 800px) {
    width: 90%;
  }
`;

export const AuthWarning = styled.div`
  font-size: 14px;
  margin-top: 20px;
`;

export const SuccessSpan = styled.span`
  font-size: 14px;
  margin-top: 20px;
  color: green;
`;

export const ErrorSpan = styled.span`
  font-size: 14px;
  margin-top: 20px;
`;

export const PropertyInfo = styled.div`
  width: 500px;
  color: var(--red);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 1px var(--red);
  border-radius: 7px;
  padding: 10px;

  .title {
    font-weight: 700;
    margin-top: 15px;
  }

  @media (max-width: 800px) {
    font-size: 12px;
    width: 90%;
  }
`;

export const InputProfile = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  .input {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  .button {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  label {
    background-color: white;
    align-self: flex-start;
    font-size: 10px;
    border-radius: 3px;
    position: relative;
    top: 5px;
    left: 10px;
    padding: 0px 5px;
  }

  input {
    border: none;
    border-radius: 7px;
    height: 30px;
    width: 320px;
    padding-left: 15px;
    border: 1px solid var(--red);

    &:focus {
      outline: none;
    }
  }

  button {
    background-color: var(--red);
    color: var(--yellow);
    height: 35px;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    width: 150px;
    border: 1px solid var(--red);
    position: relative;
    top: 6px;
  }

  @media (max-width: 800px) {
    width: 90%;
  }
`;

export const InputToken = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  .input {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  .button {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  label {
    background-color: white;
    align-self: flex-start;
    font-size: 10px;
    border-radius: 3px;
    position: relative;
    top: 5px;
    left: 10px;
    padding: 0px 5px;
  }

  input {
    border: none;
    border-radius: 7px;
    height: 30px;
    width: 160px;
    padding-left: 15px;
    border: 1px solid var(--red);

    &:focus {
      outline: none;
    }
  }

  button {
    background-color: var(--red);
    color: var(--yellow);
    height: 35px;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    width: 150px;
    border: 1px solid var(--red);
    position: relative;
    top: 6px;
  }

  @media (max-width: 800px) {
    width: 350px;

    border input {
      border: none;
      border-radius: 7px;
      height: 30px;
      width: 80px;
      padding-left: 5px;
      border: 1px solid var(--red);

      &:focus {
        outline: none;
      }
    }

    button {
      background-color: var(--red);
      color: var(--yellow);
      height: 35px;
      border: none;
      border-radius: 7px;
      cursor: pointer;
      width: 80px;
      border: 1px solid var(--red);
      position: relative;
      top: 6px;
    }
  }
`;

// export const Disconnect = styled.button`
//   background-color: var(--red);
//   color: var(--yellow);
//   padding: 10px 50px;
//   margin-top: 15px;
//   border: none;
//   border-radius: 7px;
//   cursor: pointer;
//   width: 200px;
//   position: absolute;
//   bottom: 20px;
// `;

export const Menu = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: calc(var(--header-height) + 40px);
  right: 10px;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px;
  box-sizing: border-box;

  img {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`;

export const StyledPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .leaflet-popup-tip {
    background-color: white;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      font-size: 16px;
      margin-bottom: 0px;
    }

    p {
      font-size: 11px;
      font-weight: 700;
      text-align: center;
      margin: 10px 0px;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .redText {
      color: var(--red);
    }

    .greenText {
      color: var(--green);
    }
  }
`;

export const GreenButton = styled.button`
  background-color: var(--green);
  width: 100%;
  height: 40px;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
`;
