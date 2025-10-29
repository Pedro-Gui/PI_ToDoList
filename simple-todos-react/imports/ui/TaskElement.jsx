import React, { Fragment, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TaskElement({ task, userId, HandleApagar, HandleChange, HandleEdit, disable }) {
  const PodeConcluir = (task.situacao!=="Cadastrada")? false:true;
  const disableEdit = (userId !== task.userId || disable)? true:false; 

  return (
    <ListItem
      secondaryAction={


        <Fragment>
          <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          disabled = {disable}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={task.situacao}
          label={task.situacao}
          onChange={(event) => HandleChange(task, event.target.value)}
        >
          <MenuItem value={"Cadastrada"}>Cadastrada</MenuItem>
          <MenuItem value={"Em andamento"}>Em andamento</MenuItem>
          <MenuItem disabled={PodeConcluir} value={"Concluída"}>Concluída</MenuItem>
        </Select>
      </FormControl>

          <IconButton edge="end" disabled={disableEdit} aria-label="edit" onClick={() => HandleEdit(task)}>
            <ModeEditIcon />
          </IconButton>

          <IconButton edge="end" disabled={disableEdit} aria-label="delete" onClick={() => HandleApagar(task)}>
            <DeleteIcon />
          </IconButton>

          
        </Fragment>
      }
    >

      <ListItemIcon>

      </ListItemIcon>

      <ListItemAvatar>
        <Avatar
          sx={{ bgcolor: 'black' }}>{task.owner[0]}
        </Avatar>
      </ListItemAvatar>



      <ListItemText
        primary={task.name}
        secondary={task.text}
      />
      
      <ListItemText
        className="task-date"
        primary={task.owner}
        secondary={task.createdAt?.toLocaleString('pt-BR')}
      />
    </ListItem>
  );
}