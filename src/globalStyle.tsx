import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`  

  :root {
      --red: #b6050d;
      --yellow: #fdf117;
      --green: #45c38e;
      --hover: rgba(1,1,1, 0.1);
      --app-height: 100vh;
      --header-height: 130px;
      --menu-height: 50px;
      --main-height: calc(var(--app-height) - (var(--header-height) + var(--footer-height)));
      --footer-height: 50px;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
  }

  input {
    font-family: "Roboto", sans-serif;
    font-size: medium;

    &:focus {
      outline: none;
    }
  }

  p {
    font-family: "Roboto", sans-serif;
  }

  #map {
    height: var(--main-height);
    width: 100%;
  }

`;
