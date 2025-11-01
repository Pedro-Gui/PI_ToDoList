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
  const PodeConcluir = (task.situacao !== "Cadastrada") ? false : true;
  const disableEdit = (userId !== task.userId || disable) ? true : false;

  return (
    <ListItem
      variant="outlined"
      size="small"
      sx={{
        minWidth: 'auto',
        display: 'flex'
      }}
      secondaryAction={


        <Fragment>
          <FormControl
            variant="outlined"
            size="small"
            sx={{
              minWidth: 160
            }}>
            <InputLabel id="situacao">Situação</InputLabel>
            <Select

              disabled={disable}
              labelId="situacao"
              id="situacao"
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
      <ListItemAvatar>
        <Avatar
          sx={{ bgcolor: 'black' }}>{task.owner[0]}
        </Avatar>
      </ListItemAvatar>

      <ListItemText

        primary={task.name}
        secondary={task.text}
        sx={{flex: '0 1 auto', minWidth: '200px'}}
      />

      <ListItemText
        className="task-date"
        primary={task.owner}
        secondary={task.createdAt?.toLocaleString('pt-BR')}
        sx={{flex: '1 1 auto'}}
      />
    </ListItem>
  );
}