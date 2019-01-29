import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Bloc = ({ participants, blocNr }) => (
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
          <TableCell component="th" scope="row">
            {participant.name}
          </TableCell>
          <TableCell align="right">{participant.results[blocNr].top}</TableCell>
          <TableCell align="right">{participant.results[blocNr].zone}</TableCell>
          <TableCell align="right">{participant.results[blocNr].attTop}</TableCell>
          <TableCell align="right">{participant.results[blocNr].attZone}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default Bloc;