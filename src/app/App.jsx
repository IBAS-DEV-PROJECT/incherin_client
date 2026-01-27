import React from 'react';
import { AppRoutes } from './routes';
import { Header } from '@widgets/header';
import { Footer } from '@widgets/footer';
import './styles/reset.css';

export const App = () => {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
};
