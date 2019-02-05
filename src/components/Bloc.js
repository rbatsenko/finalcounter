import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

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
              checked={participant.results[blocNr].top}
              onChange={() => { console.log('checked!'); }}
              value="Top done"
              color="primary"
            />
          </TableCell>
          <TableCell align="center" className={classes.cellBigFont}>
            <Checkbox
              checked={participant.results[blocNr].zone}
              onChange={() => { console.log('checked!'); }}
              value="Top done"
              color="primary"
            />
          </TableCell>
          <TableCell align="center" className={classes.cellBigFont}>{participant.results[blocNr].attTop}</TableCell>
          <TableCell align="center" className={classes.cellBigFont}>{participant.results[blocNr].attZone}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default withStyles(styles)(Bloc);