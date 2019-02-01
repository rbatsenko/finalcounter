import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Results = ({ participants }) => (
  <Table>
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
          <TableCell component="th" scope="row">
            {participant.name}
          </TableCell>
          <TableCell align="right">{participant.finalResults.tops}</TableCell>
          <TableCell align="right">{participant.finalResults.zones}</TableCell>
          <TableCell align="right">{participant.finalResults.attTops}</TableCell>
          <TableCell align="right">{participant.finalResults.attZones}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default Results;