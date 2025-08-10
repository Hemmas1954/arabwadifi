import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataProvider } from './DataContext';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StylesProvider } from '@material-ui/core';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DataProvider>
          <App />
        </DataProvider>
      </ThemeProvider>
    </StylesProvider>
  </React.StrictMode>
);
