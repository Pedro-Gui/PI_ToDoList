import React, { Fragment, useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function TaskElement({ task, userId, HandleApagar, HandleChange, HandleEdit, disable }) {
  const PodeConcluir = (task.situacao !== "Cadastrada") ? false : true;
  const disableEdit = (userId !== task.userId || disable) ? true : false;
  const [imagem, setImagem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    async function taskimage() {
      if (task.userId) {
        const url = await Meteor.callAsync("getUserImagem", task.userId);
        if (url.reason === "Sucesso") {
          setImagem(url.imagem);
          setIsLoading(true);
        } else {
          console.error("Erro ao buscar imagem:", url.reason);
          setImagem(null);
          setIsLoading(false);
        }
      }
    }
    taskimage();
  }, [task.userId]);

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
      <ListItemAvatar sx={{ maxWidth: '3%' }}>
        {isLoading ?
          <Avatar alt="Upload new avatar" src={imagem} sx={{ width: '80%', aspectRatio: '1 / 1', height: 'auto', }} /> :
          <Avatar> <AccountCircleIcon /> </Avatar>}
      </ListItemAvatar>

      <ListItemText

        primary={task.name}
        secondary=
        {<Fragment>
        Ver descrição:
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Ver descrição"
          label="Ver descrição"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography sx={{ marginBottom: 2 }}>
            {task.text}
          </Typography>
        </Collapse>
        </Fragment>}
        sx={{ flex: '0 1 auto', minWidth: '300px' }}
        slotProps={{
          secondary: {
            sx: {
              whiteSpace: 'normal',
              overflowWrap: 'break-word',
              maxWidth: "250px"
            }
          }
        }}
      />

      <ListItemText
        className="task-date"
        primary={task.owner}
        secondary={task.createdAt?.toLocaleString('pt-BR')}
        sx={{ flex: '1 1 auto' }}
      />
    </ListItem>
  );
}