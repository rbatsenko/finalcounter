import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

//Custom Components
import Bloc from './Bloc';
import Participants from './Participants';
import Results from './Results';

import { withStyles } from '@material-ui/core/styles';

const TabContainer = ({ children, noPadding }) => {
  return (
    <Typography component="div" style={ noPadding ? { padding: 0 } : { padding: 24 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  transition: {
    transition: 'all .3s ease-in-out',
  },
  appBar: {
    position: 'relative',
  },
  logoLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 700,
  },
  logoCrown: {
    fontSize: '1.25em',
    marginRight: 5,
  },
  grow: {
    flexGrow: 1,
  },
  gitLogo: {
    fill: 'white',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  mainGridItem: {
    [theme.breakpoints.down(768)]: {
      padding: '0 !important',
    },
  },
  colHalf: {
    maxWidth: '50%',
    flexBasis: '50%',
    marginLeft: '25%',
    [theme.breakpoints.down(992)]: {
      maxWidth: '75%',
      flexBasis: '75%',
      marginLeft: '12.5%',
    },
    [theme.breakpoints.down(768)]: {
      maxWidth: '100%',
      flexBasis: '100%',
      marginLeft: 0,
    },
  },
  colThreeFourth: {
    maxWidth: '75%',
    flexBasis: '75%',
    marginLeft: '12.5%',
    [theme.breakpoints.down(992)]: {
      maxWidth: '75%',
      flexBasis: '75%',
      marginLeft: '12.5%',
    },
    [theme.breakpoints.down(768)]: {
      maxWidth: '100%',
      flexBasis: '100%',
      marginLeft: 0,
    },
  },
  tabsNav: {
    borderBottom: '1px solid #e8e8e8',
    marginBottom: theme.spacing.unit * 3,
    overflow: 'visible',
    '& button': {
      fontFamily: '"Sarabun", "Roboto", "Segoe UI", "Helvetica Neue", sans-serif !important',
    }
  },
  tabScroller: {
    overflowX: 'visible',
  },
  label: {
    minHeight: theme.spacing.unit * 8,
    [theme.breakpoints.down(560)]: {
      fontSize: '.75rem',
    },
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
  constructor() {
    super();

    this.state = {
      activeTab: 0,
      addBtnShown: true,
      participants: [],
    };

    this.partRef = React.createRef();
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  handleChangeTab = (event, activeTab) => {
    this.setState({ activeTab });
    if (activeTab === 0) {
      this.setState({ addBtnShown: true })
    } else {
      this.setState({ addBtnShown: false })
    }
  };

  handleChangeTabIndex = index => {
    this.setState({ activeTab: index });
  };

  handleAddParticipant = () => {
    this.setState( prevState => ({
      participants: [...prevState.participants, {
        id: prevState.participants.length === 0 ? 0 : prevState.participants[prevState.participants.length - 1].id + 1, // generate id based on last one
        name: '',
        results: [
          {
            nr: 0,
            top: false,
            zone: false,
            attTop: 0,
            attZone: 0,
          },
          {
            nr: 1,
            top: false,
            zone: false,
            attTop: 0,
            attZone: 0,
          },
          {
            nr: 2,
            top: false,
            zone: false,
            attTop: 0,
            attZone: 0,
          },
          {
            nr: 3,
            top: false,
            zone: false,
            attTop: 0,
            attZone: 0,
          },
        ],
        finalResults: {
          tops: 0,
          zones: 0,
          attTops: 0,
          attZones: 0,
        },
      }]
    }),
    () => {
      this.partRef.current.focus();
    }
    );
  }

  handleRemoveParticipant = id => {
    this.setState( prevState => ({
      participants: [...prevState.participants].filter( participant => participant.id !== id)
    }));
  }

  handleChangeParticipant = (id, newName) => {
    this.setState( prevState => ({
      participants: prevState.participants.map( participant => (
        participant.id === id 
        ? 
        {...participant, name: newName}
        : 
        participant
      )),
    }));
  }

  handleCheckZone = (id, blocNr, checked) => {
    this.setState( 
      prevState => ({
        participants: prevState.participants.map( participant => (
          participant.id === id // modify participant with proper id
          ? 
          {
            ...participant, // leave rest of participants as they are
            results: participant.results.map( bloc => (
              bloc.nr === blocNr // modify results for bloc with proper number
              ?
              {
                ...bloc, // leave rest of bloc results as they are
                zone: checked, // change value
                attZone: bloc.attZone === 0 && checked ? 1 : bloc.attZone
              }
              :
              bloc
            ))
          }
          : 
          participant
        ))
      })
    );
  }

  handleCheckTop = (id, blocNr, checked) => {
    this.setState( 
      prevState => ({
        participants: prevState.participants.map( participant => (
          participant.id === id // modify participant with proper id
          ? 
          {
            ...participant, // leave rest of participants as they are
            results: participant.results.map( bloc => (
              bloc.nr === blocNr // modify results for bloc with proper number
              ?
              {
                ...bloc, // leave rest of bloc results as they are
                top: checked, // change value
                attTop: bloc.attTop === 0 && checked ? 1 : bloc.attTop
              }
              :
              bloc
            ))
          }
          : 
          participant
        ))
      })
    );
  }

  handleAddZoneAttempt = (id, blocNr) => { // Add zone attempts
    this.setState( 
      prevState => ({
        participants: prevState.participants.map( participant => (
          participant.id === id // modify participant with proper id
          ? 
          {
            ...participant, // leave rest of participants as they are
            results: participant.results.map( bloc => (
              bloc.nr === blocNr // modify results for bloc with proper number
              ?
              {
                ...bloc, // leave rest of bloc results as they are
                attZone: bloc.attZone + 1 // change value
              }
              :
              bloc
            ))
          }
          : 
          participant
        ))
      })
    );
  }

  handleRemoveZoneAttempt = (id, blocNr) => { // Remove zone attempts
    this.setState( 
      prevState => ({
        participants: prevState.participants.map( participant => (
          participant.id === id // modify participant with proper id
          ? 
          {
            ...participant, // leave rest of participants as they are
            results: participant.results.map( bloc => (
              bloc.nr === blocNr // modify results for bloc with proper number
              ?
              {
                ...bloc, // leave rest of bloc results as they are
                attZone: bloc.attZone > 0 ? bloc.attZone - 1 : bloc.attZone // change value
              }
              :
              bloc
            ))
          }
          : 
          participant
        ))
      })
    );
  }

  handleAddTopAttempt = (id, blocNr) => { // Add top attempts
    this.setState( 
      prevState => ({
        participants: prevState.participants.map( participant => (
          participant.id === id // modify participant with proper id
          ? 
          {
            ...participant, // leave rest of participants as they are
            results: participant.results.map( bloc => (
              bloc.nr === blocNr // modify results for bloc with proper number
              ?
              {
                ...bloc, // leave rest of bloc results as they are
                attTop: bloc.attTop + 1 // change value
              }
              :
              bloc
            ))
          }
          : 
          participant
        ))
      })
    );
  }

  handleRemoveTopAttempt = (id, blocNr) => { // Remove top attempts
    this.setState( 
      prevState => ({
        participants: prevState.participants.map( participant => (
          participant.id === id // modify participant with proper id
          ? 
          {
            ...participant, // leave rest of participants as they are
            results: participant.results.map( bloc => (
              bloc.nr === blocNr // modify results for bloc with proper number
              ?
              {
                ...bloc, // leave rest of bloc results as they are
                attTop: bloc.attTop > 0 ? bloc.attTop - 1 : bloc.attTop // change value
              }
              :
              bloc
            ))
          }
          : 
          participant
        ))
      })
    );
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage();
  }

  render() {
    const { classes } = this.props;
    const { activeTab, addBtnShown, participants } = this.state;

    return (
      <main>
        <Tabs
          value={activeTab}
          variant="fullWidth"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChangeTab}
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
            <Grid item xs={12} className={
              `${classes.mainGridItem} ${classes.transition} ${activeTab === 0 ? classes.colHalf : ''} ${activeTab === 5 ? classes.colThreeFourth : ''}`
            }>
              <Paper>
                { activeTab === 0 && <TabContainer><Participants participants={participants} deleteParticipant={this.handleRemoveParticipant} changeParticipant={this.handleChangeParticipant} ref={this.partRef} /></TabContainer> }
                { activeTab === 1 && <TabContainer noPadding><Bloc participants={participants} blocNr={0} checkZone={this.handleCheckZone} checkTop={this.handleCheckTop} addZoneAttempt={this.handleAddZoneAttempt} removeZoneAttempt={this.handleRemoveZoneAttempt} addTopAttempt={this.handleAddTopAttempt} removeTopAttempt={this.handleRemoveTopAttempt} /></TabContainer> }
                { activeTab === 2 && <TabContainer noPadding><Bloc participants={participants} blocNr={1} checkZone={this.handleCheckZone} checkTop={this.handleCheckTop} addZoneAttempt={this.handleAddZoneAttempt} removeZoneAttempt={this.handleRemoveZoneAttempt} addTopAttempt={this.handleAddTopAttempt} removeTopAttempt={this.handleRemoveTopAttempt} /></TabContainer> }
                { activeTab === 3 && <TabContainer noPadding><Bloc participants={participants} blocNr={2} checkZone={this.handleCheckZone} checkTop={this.handleCheckTop} addZoneAttempt={this.handleAddZoneAttempt} removeZoneAttempt={this.handleRemoveZoneAttempt} addTopAttempt={this.handleAddTopAttempt} removeTopAttempt={this.handleRemoveTopAttempt} /></TabContainer> }
                { activeTab === 4 && <TabContainer noPadding><Bloc participants={participants} blocNr={3} checkZone={this.handleCheckZone} checkTop={this.handleCheckTop} addZoneAttempt={this.handleAddZoneAttempt} removeZoneAttempt={this.handleRemoveZoneAttempt} addTopAttempt={this.handleAddTopAttempt} removeTopAttempt={this.handleRemoveTopAttempt} /></TabContainer> }
                { activeTab === 5 && <TabContainer noPadding><Results participants={participants} /></TabContainer> }
              </Paper>
              <div className={classes.addBtnContainer}>
                <Zoom in={addBtnShown} mountOnEnter unmountOnExit>
                  <Fab size="medium" color="primary" aria-label="Add" onClick={this.handleAddParticipant}>
                    <AddIcon />
                  </Fab>
                </Zoom>
              </div>
            </Grid>
          </Grid>
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(App);