import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppWrapper from './AppWrapper';
import { createMuiTheme } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-135042632-1');
ReactGA.pageview('/');

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: {
      main: '#ffff8d',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <AppWrapper />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Root />
,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
