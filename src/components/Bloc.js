import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cell: {
    fontSize: '1rem',
  },
  cellBigFont: {
    fontSize: '1.5rem',
  },
  attIcon: {
    marginLeft: 15,
    [theme.breakpoints.down(560)]: {
      padding: 0,
    },
  },
  attNoPaddingOnSmaller: {
    [theme.breakpoints.down(560)]: {
      padding: 0,
    },
  },
  noParticipantsMessage: {
    padding: 24,
    textAlign: 'center',
    fontSize: '1.25em',
    lineHeight: '32px',
  },
});

const Bloc = ({ participants, blocNr, classes, checkZone, checkTop, addZoneAttempt, removeZoneAttempt, addTopAttempt, removeTopAttempt }) => (
  participants.length > 0
  ?
  <Table className="bloc-table">
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="center">Top</TableCell>
        <TableCell align="center">Zone</TableCell>
        <TableCell align="center">Top attempts</TableCell>
        <TableCell align="center">Zone attempts</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {participants.map(participant => (
        <TableRow hover key={participant.id}>
          <TableCell component="th" scope="row" className={classes.cell}>
            {participant.name}
          </TableCell>
          <TableCell align="center" className={classes.cellBigFont}>
            <Checkbox
              className={classes.attNoPaddingOnSmaller}
              checked={participant.results[blocNr].top}
              onChange={(e) => { checkTop(participant.id, blocNr, e.target.checked) }}
              value="Top"
              color="primary"
            />
          </TableCell>
          <TableCell align="center" className={classes.cellBigFont}>
            <Checkbox
              className={classes.attNoPaddingOnSmaller}
              checked={participant.results[blocNr].zone}
              onChange={(e) => { checkZone(participant.id, blocNr, e.target.checked) }}
              value="Zone"
              color="primary"
            />
          </TableCell>
          <TableCell align="center" className={classes.cellBigFont}>
            {participant.results[blocNr].attTop}
            <IconButton
              aria-label="Add attempt"
              className={classes.attIcon}
              onClick={() => { addTopAttempt(participant.id, blocNr) }}
            >
              <AddIcon color="primary" fontSize="default" />
            </IconButton>
            <IconButton
              aria-label="Remove attempt"
              className={classes.attNoPaddingOnSmaller}
              onClick={() => { removeTopAttempt(participant.id, blocNr) }}
            >
              <RemoveIcon color="primary" fontSize="default" />
            </IconButton>
          </TableCell>
          <TableCell align="center" className={classes.cellBigFont}>
            {participant.results[blocNr].attZone}
            <IconButton
              aria-label="Add attempt"
              className={classes.attIcon}
              onClick={() => { addZoneAttempt(participant.id, blocNr) }}
            >
              <AddIcon color="primary" fontSize="default" />
            </IconButton>
            <IconButton
              aria-label="Remove attempt"
              onClick={() => { removeZoneAttempt(participant.id, blocNr) }}
            >
              <RemoveIcon color="primary" fontSize="default" />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  :
  <div className={classes.noParticipantsMessage}>Please add participants to be able to count attempts</div>
);

export default withStyles(styles)(Bloc);