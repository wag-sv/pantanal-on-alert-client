import { Popup } from 'react-leaflet';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Content = styled.div`
  align-items: flex-start;
  background-color: rgba(255, 255, 255, 1);
  color: ${colors.red};
  display: flex;
  height: var(--main-height);
  justify-content: center;
  position: absolute;
  top: var(--header-height);
  width: 100%;
  z-index: 5000;

  #content {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: calc(100% - 40px);
    justify-content: flex-start;
    margin-top: 20px;
    overflow: auto;
    padding-right: 10px;
    width: 80%;

    h1 {
      align-self: center;
    }

    p {
      align-self: flex-start;
      margin: 20px 0px 0px 0px;
      text-align: justify;
    }

    a {
      color: ${colors.red};
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #dddddd;
      border-radius: 10px;
    }

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${colors.red};
      background-image: -webkit-linear-gradient(
        90deg,
        transparent,
        rgba(0, 0, 0, 0.3) 50%,
        transparent,
        transparent
      );
      border-radius: 10px;
    }
  }
`;

export const StatItem = styled.div`
  align-items: center;
  background-color: ${colors.red};
  border: solid 1px ${colors.red};
  border-radius: 15px;
  box-shadow: 5px 5px 5px #333;
  color: ${colors.yellow};
  display: flex;
  flex-direction: column;
  margin-top: 22px;
  width: 70%;

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
  background-color: ${colors.red};
  border: none;
  border-radius: 7px;
  color: ${colors.yellow};
  cursor: pointer;
  margin-top: 15px;
  padding: 10px 50px;
  width: 200px;
`;

export const ButtonWhite = styled.button`
  background-color: white;
  border: solid 1px ${colors.red};
  border-radius: 7px;
  color: ${colors.red};
  cursor: pointer;
  margin-top: 15px;
  padding: 10px 50px;
  width: 200px;
`;

export const Input = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 10px;
  width: 500px;

  @media (max-width: 800px) {
    width: 90%;
  }

  input {
    /* background-color: ${colors.yellow}; */
    border: 1px solid ${colors.red};
    border: none;
    border-radius: 7px;
    height: 30px;
    padding-left: 15px;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  label {
    align-self: flex-start;
    background-color: white;
    border-radius: 3px;
    font-size: 10px;
    padding: 0px 5px;
    position: relative;
    top: 5px;
  }
`;

export const StyledFormLink = styled(NavLink)`
  font-weight: 700;
  padding: 3px;
  text-decoration: none;

  &:hover {
    background-color: ${colors.yellow};
    border-radius: 3px;
  }
`;

export const Success = styled.div`
  border: solid 1px green;
  border-radius: 7px;
  color: green;
  font-size: 14px;
  margin-top: 20px;
  padding: 10px;
  text-align: center;
  width: 500px;

  @media (max-width: 800px) {
    width: 90%;
  }
`;

export const Error = styled.div`
  background-color: ${colors.yellow};
  border-radius: 7px;
  font-size: 14px;
  margin-top: 20px;
  padding: 10px;
  text-align: center;
  width: 500px;

  @media (max-width: 800px) {
    width: 90%;
  }
`;

export const AuthWarning = styled.div`
  font-size: 14px;
  margin-top: 20px;
`;

export const SuccessSpan = styled.span`
  color: green;
  font-size: 14px;
  margin-top: 20px;
`;

export const ErrorSpan = styled.span`
  font-size: 14px;
  margin-top: 20px;
`;

export const PropertyInfo = styled.div`
  align-items: center;
  border: solid 1px ${colors.red};
  border-radius: 7px;
  color: ${colors.red};
  display: flex;
  flex-direction: column;
  font-size: 14px;
  justify-content: center;
  padding: 10px;
  width: 500px;

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
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  width: 500px;

  .input {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .button {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  label {
    align-self: flex-start;
    background-color: white;
    border-radius: 3px;
    font-size: 10px;
    left: 10px;
    padding: 0px 5px;
    position: relative;
    top: 5px;
  }

  input {
    border: 1px solid ${colors.red};
    border: none;
    border-radius: 7px;
    height: 30px;
    padding-left: 15px;
    width: 320px;

    &:focus {
      outline: none;
    }
  }

  button {
    background-color: ${colors.red};
    border: 1px solid ${colors.red};
    border: none;
    border-radius: 7px;
    color: ${colors.yellow};
    cursor: pointer;
    height: 35px;
    position: relative;
    top: 6px;
    width: 150px;
  }

  @media (max-width: 800px) {
    width: 90%;
  }
`;

export const InputToken = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  width: 500px;

  .input {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .button {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  label {
    align-self: flex-start;
    background-color: white;
    border-radius: 3px;
    font-size: 10px;
    left: 10px;
    padding: 0px 5px;
    position: relative;
    top: 5px;
  }

  input {
    border: 1px solid ${colors.red};
    border: none;
    border-radius: 7px;
    height: 30px;
    padding-left: 15px;
    width: 160px;

    &:focus {
      outline: none;
    }
  }

  button {
    background-color: ${colors.red};
    border: 1px solid ${colors.red};
    border: none;
    border-radius: 7px;
    color: ${colors.yellow};
    cursor: pointer;
    height: 35px;
    position: relative;
    top: 6px;
    width: 150px;
  }

  @media (max-width: 800px) {
    width: 350px;

    border input {
      border: none;
      border-radius: 7px;
      height: 30px;
      width: 80px;
      padding-left: 5px;
      border: 1px solid ${colors.red};

      &:focus {
        outline: none;
      }
    }

    button {
      background-color: ${colors.red};
      color: ${colors.yellow};
      height: 35px;
      border: none;
      border-radius: 7px;
      cursor: pointer;
      width: 80px;
      border: 1px solid ${colors.red};
      position: relative;
      top: 6px;
    }
  }
`;

// export const Disconnect = styled.button`
//   background-color: ${colors.red};
//   color: ${colors.yellow};
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
  align-items: flex-end;
  box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  position: absolute;
  right: 10px;
  top: calc(var(--header-height) + 40px);
  z-index: 3000;

  img {
    cursor: pointer;
    height: 50px;
    width: 50px;
  }
`;

export const StyledPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    align-items: center;
    background-color: white;
    display: flex;
    justify-content: center;
  }
  .leaflet-popup-tip {
    background-color: white;
  }

  .content {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-size: 16px;
      margin-bottom: 0px;
    }

    p {
      font-size: 11px;
      font-weight: 700;
      margin: 10px 0px;
      text-align: center;
    }

    div {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
    }

    .redText {
      color: ${colors.red};
    }

    .greenText {
      color: ${colors.green};
    }
  }
`;

export const GreenButton = styled.button`
  background-color: ${colors.green};
  border: none;
  color: white;
  cursor: pointer;
  height: 40px;
  margin-bottom: 10px;
  width: 100%;
`;
