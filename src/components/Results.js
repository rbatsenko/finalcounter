import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cell: {
    fontSize: '1rem',
  },
  cellBigFont: {
    fontSize: '1.5rem',
  },
  noParticipantsMessage: {
    padding: 24,
    textAlign: 'center',
    fontSize: '1.25em',
    lineHeight: '32px',
  },
});

const Results = ({ participants, classes }) => (
  participants.length > 0
  ?
  <Table className="results-table">
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="right">Tops</TableCell>
        <TableCell align="right">Zones</TableCell>
        <TableCell align="right">Tops attempts</TableCell>
        <TableCell align="right">Zones attempts</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {participants.map(participant => (
        <TableRow hover key={participant.id}>
          <TableCell component="th" scope="row" className={classes.cell}>
            {participant.name}
          </TableCell>
          <TableCell align="right" className={classes.cellBigFont}>{participant.finalResults.tops}</TableCell>
          <TableCell align="right" className={classes.cellBigFont}>{participant.finalResults.zones}</TableCell>
          <TableCell align="right" className={classes.cellBigFont}>{participant.finalResults.attTops}</TableCell>
          <TableCell align="right" className={classes.cellBigFont}>{participant.finalResults.attZones}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  :
  <div className={classes.noParticipantsMessage}>Please add participants to be able to count attempts</div>
);

export default withStyles(styles)(Results);