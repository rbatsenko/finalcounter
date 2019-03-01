import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';

const Participants = React.forwardRef(({ participants, deleteParticipant, changeParticipant }, ref) => (
    <React.Fragment>
      <Typography variant="h6">Participants</Typography>
      <List
        style={{
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
      {
        participants.length > 0 &&
        participants.map( participant =>
          <ListItem key={participant.id}>
            <ListItemIcon>
              <AccountCircleIcon style={{ width: 32, height: 32 }} />
            </ListItemIcon>
            <TextField
              defaultValue={participant.name}
              inputRef={ref}
              onChange={(e) => { changeParticipant(participant.id, e.target.value) }}
              margin="dense"
            />
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete" onClick={() => { deleteParticipant(participant.id) }}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      }
      </List>
    </React.Fragment>
  )
);

export default Participants;