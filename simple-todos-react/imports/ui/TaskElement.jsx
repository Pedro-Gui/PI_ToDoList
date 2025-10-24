import React, { Fragment, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ListItemButton from '@mui/material/ListItemButton';

export default function TaskElement({ task, HandleApagar, HandleCheck, HandleEdit, disable }) {



  return (
    <ListItem
      secondaryAction={


        <Fragment >

          <IconButton edge="end" disabled={disable} aria-label="edit" onClick={() => HandleEdit(task)}>
            <ModeEditIcon />
          </IconButton>

          <IconButton edge="end" disabled={disable} aria-label="delete" onClick={() => HandleApagar(task)}>
            <DeleteIcon />
          </IconButton>


        </Fragment>
      }
    >

      <ListItemIcon>

        <Checkbox
          disabled={disable}
          edge="start"
          checked={task.isChecked}
          onClick={() => HandleCheck(task)}

        />
      </ListItemIcon>

      <ListItemAvatar>
        <Avatar
          sx={{ bgcolor: 'black' }}>{task.owner[0]}
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={task.text}
        secondary={task.owner}
      />
      <ListItemText
        className="task-date"
        secondary={task.createdAt?.toLocaleString('pt-BR')}
      />
      
    </ListItem>
  );
}