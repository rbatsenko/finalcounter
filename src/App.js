import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  logo: {
    flexGrow: 1,
  },
  layout: {
    width: 'auto',
    [theme.breakpoints.up(1280 + theme.spacing.unit * 2 * 2)]: {
      width: 1170,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  wrapper: {
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up(1280 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
    },
  },
  label: {
    minHeight: theme.spacing.unit * 8,
    color: 'white',
  },
  tabIndicator: {
    height: 5,
  }
});

class App extends Component {
  state = {
    activeTab: 0,
  };

  handleChange = (event, activeTab) => {
    this.setState({ activeTab });
  };

  handleChangeIndex = index => {
    this.setState({ activeTab: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.logo}>
              <span role="img" aria-label="Final Counter Logo">👑</span> Final Counter
            </Typography>
            <Tabs
              value={this.state.activeTab}
              indicatorColor="secondary"
              textColor="secondary"
              onChange={this.handleChange}
              classes={{
                indicator: classes.tabIndicator
              }}
            >
              <Tab label="Bloc #1" className={classes.label} />
              <Tab label="Bloc #2" className={classes.label} />
              <Tab label="Bloc #3" className={classes.label} />
              <Tab label="Bloc #4" className={classes.label} />
              <Tab label="Results" className={classes.label} />
            </Tabs>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper square className={classes.wrapper}>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.activeTab}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer dir={theme.direction}>One</TabContainer>
              <TabContainer dir={theme.direction}>Two</TabContainer>
              <TabContainer dir={theme.direction}>Three</TabContainer>
              <TabContainer dir={theme.direction}>Four</TabContainer>
              <TabContainer dir={theme.direction}>Results</TabContainer>
            </SwipeableViews>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);