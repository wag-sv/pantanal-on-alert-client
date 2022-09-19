import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './globalStyle';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { Router } from './router/Router';

export function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Navbar />
      <Content>
        <Router />
      </Content>
      <Footer />
    </BrowserRouter>
  );
}
