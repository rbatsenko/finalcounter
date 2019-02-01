import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cell: {
    fontSize: '1rem',
  },
  cellBigFont: {
    fontSize: '1.5rem',
  },
});

const Bloc = ({ participants, blocNr, classes }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="right">Top</TableCell>
        <TableCell align="right">Zone</TableCell>
        <TableCell align="right">Top attempts</TableCell>
        <TableCell align="right">Zone attempts</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {participants.map(participant => (
        <TableRow hover key={participant.id}>
          <TableCell component="th" scope="row" className={classes.cell}>
            {participant.name}
          </TableCell>
          <TableCell align="right" className={classes.cellBigFont}>
            {participant.results[blocNr].top}
            <IconButton color="primary" aria-label="Add top">
              <AddIcon />
            </IconButton>
          </TableCell>
          <TableCell align="right" className={classes.cellBigFont}>{participant.results[blocNr].zone}</TableCell>
          <TableCell align="right" className={classes.cellBigFont}>{participant.results[blocNr].attTop}</TableCell>
          <TableCell align="right" className={classes.cellBigFont}>{participant.results[blocNr].attZone}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default withStyles(styles)(Bloc);