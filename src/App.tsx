import React from 'react';
import './App.css';
import Routes from './routes';
import { Provider } from 'react-redux';

import store from './store'
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      main: '#102542',
      dark: '#201C35',
    },
    secondary: {
      main: '#F87060',
    }
  }
});

const App: React.FC = () => (
  <ThemeProvider  theme={theme} >
    <Provider store={store}>
      <Routes></Routes>
    </Provider>
  </ThemeProvider>
);

export default App;
