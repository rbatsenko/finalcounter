import React from 'react';
import Navbar from './components/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './components/App';

export default function AppWrapper() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <App />
    </React.Fragment>
  )
}