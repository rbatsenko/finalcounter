import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

//Custom Components
import Bloc from './components/Bloc';
import Participants from './components/Participants';

import { withStyles } from '@material-ui/core/styles';

function TabContainer({ children, noPadding }) {
  return (
    <Typography component="div" style={ noPadding ? { padding: 0 } : { padding: 24 }}>
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
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    /*[theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },*/
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tabsNav: {
    borderBottom: '1px solid #e8e8e8',
    marginBottom: theme.spacing.unit * 3,
    overflow: 'visible',
  },
  tabScroller: {
    overflowX: 'visible',
  },
  label: {
    minHeight: theme.spacing.unit * 8,
  },
  tabIndicator: {
    height: 5,
    bottom: -3,
  },
  addBtnContainer: {
    textAlign: 'right',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3,
  },
  noPadding: {
    padding: 0,
  }
});

class App extends Component {
  state = {
    activeTab: 0,
    addBtnShown: true,
    participants: [],
    results: [
      {
        atpts: 1,
        zoneAtpt: 0,
        topAtpt: 0,
      },
      {
        atpts: 2,
        zoneAtpt: 0,
        topAtpt: 0,
      },
      {
        atpts: 3,
        zoneAtpt: 0,
        topAtpt: 0,
      },
      {
        atpts: 4,
        zoneAtpt: 0,
        topAtpt: 0,
      },
    ]
  };

  handleChange = (event, activeTab) => {
    this.setState({ activeTab });
    if (activeTab === 0) {
      this.setState({ addBtnShown: true })
    } else {
      this.setState({ addBtnShown: false })
    }
  };

  handleChangeIndex = index => {
    this.setState({ activeTab: index });
  };

  render() {
    const { classes } = this.props;
    const { results, activeTab, addBtnShown } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.logo}>
              <span role="img" aria-label="Final Counter Logo">👑</span> Final Counter
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Tabs
            value={this.state.activeTab}
            variant="fullWidth"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            classes={{
              indicator: classes.tabIndicator,
              root: classes.tabsNav,
              scroller: classes.tabScroller,
            }}
          >
            <Tab label="Participants" className={classes.label} />
            <Tab label="Bloc #1" className={classes.label} />
            <Tab label="Bloc #2" className={classes.label} />
            <Tab label="Bloc #3" className={classes.label} />
            <Tab label="Bloc #4" className={classes.label} />
            <Tab label="Results" className={classes.label} />
          </Tabs>
          <div className={classes.layout}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Paper>
                  { activeTab === 0 && <TabContainer><Participants /></TabContainer> }
                  { activeTab === 1 && <TabContainer noPadding><Bloc results={results[0]} /></TabContainer> }
                  { activeTab === 2 && <TabContainer noPadding><Bloc results={results[1]} /></TabContainer> }
                  { activeTab === 3 && <TabContainer noPadding><Bloc results={results[2]} /></TabContainer> }
                  { activeTab === 4 && <TabContainer noPadding><Bloc results={results[3]} /></TabContainer> }
                  { activeTab === 5 && <TabContainer>Results</TabContainer> }
                </Paper>
                <div className={classes.addBtnContainer}>
                  <Zoom in={addBtnShown} mountOnEnter unmountOnExit>
                    <Fab size="medium" color="primary" aria-label="Add">
                      <AddIcon />
                    </Fab>
                  </Zoom>
                </div>
              </Grid>
            </Grid>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);