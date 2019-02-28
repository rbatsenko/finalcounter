import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Helpers
import { countResults } from '../helpers/helpers';

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

const Results = ({ participants, classes }) => {

  // Count results not in the App state but only when user enters Results view
  const participantsSorted = participants => ([
    ...participants.map( participant => (
      {
        ...participant,
        finalResults: countResults(participant.results),
      }
    )).sort((a, b) =>
      b.finalResults.tops - a.finalResults.tops
      || 
      b.finalResults.zones - a.finalResults.zones
      || 
      a.finalResults.attTops - b.finalResults.attTops
      || 
      a.finalResults.attZones - b.finalResults.attZones
    ),
  ]);

  return (
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
        {participantsSorted(participants).map(participant => (
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
  )
};

export default withStyles(styles)(Results);