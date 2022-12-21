import { createGlobalStyle } from 'styled-components';
import RobotoLight from './assets/fonts/Roboto/Roboto-Light.ttf';
import RobotoRegular from './assets/fonts/Roboto/Roboto-Regular.ttf';
import RobotoMedium from './assets/fonts/Roboto/Roboto-Medium.ttf';
import RobotoBold from './assets/fonts/Roboto/Roboto-Bold.ttf';
import RobotoBlack from './assets/fonts/Roboto/Roboto-Black.ttf';
import 'tippy.js/dist/tippy.css';
import { colors } from './resources/theme';

const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', documentHeight);
documentHeight();

// const root = document.getElementById('root');

// if (root !== null) {
//   const resizeObserver = new ResizeObserver(() => {
//     resizeIframe(root);
//   });
//   resizeObserver.observe(root);
// }

export const GlobalStyle = createGlobalStyle`  

@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(${RobotoLight})
}

@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(${RobotoRegular})
}

@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(${RobotoMedium})
}

@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(${RobotoBold})
}

@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(${RobotoBlack})
}

  :root {
    font-size: 10px;
    --app-height: 100%;
    --header-height: 80px;
    --navbar-height: 50px;
    --content-height: calc(var(--app-height) - (var(--header-height) + var(--navbar-height) + var(--footer-height)));
    --footer-height: 50px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    outline-color: ${colors.yellow}
  }

  html,
  body {
    height: 100vh;
    height: var(--doc-height);
  }

  #map {
    height: var(--content-height);
    width: 100%;
  }
`;
