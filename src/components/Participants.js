import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const Participants = ({ participants }) => (
  <React.Fragment>
    <Typography variant="h6">Participants</Typography>
    <List>
    {
      participants.length > 0 &&
      participants.map((participant, index) =>
        <ListItem key={index}>
          <ListItemText
            primary={participant}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    }
    </List>
  </React.Fragment>
)

export default Participants;