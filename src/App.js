import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';
import './App.css';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import LibraryPage from './pages/LibraryPage/LibraryPage';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#455a64',
      dark: '#1c313a',
      light: '#718792',
    },
    secondary: {
      main: '#c62828',
      dark: '#8e0000',
      light: '#ff5f52',
    }
  },
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: theme,
    }
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Route exact path='/' component={WelcomePage} />
          <Route path='/library' render={() => (
            <LibraryPage photos={this.state.photos} />
          )} />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default withTheme(theme)(App);
