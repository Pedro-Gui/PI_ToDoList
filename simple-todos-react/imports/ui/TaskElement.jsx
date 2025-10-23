import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';


export default function TaskElement({ task, HandleApagar,HandleCheck }) {

  

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={()=>HandleApagar(task)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemIcon>
       
        <Checkbox
          edge="start"
          checked={!!task.isChecked}
          onClick={()=>HandleCheck(task)}
          
        />
      </ListItemIcon>
      
      <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
       
      <ListItemText
        primary={task.text}
        secondary={task.owner}
      />
      <span className="task-date">
              {task.createdAt.toLocaleString('pt-BR')}
      </span>
    </ListItem>
  );
}