import React, { Fragment, useEffect } from 'react';
//login and password imports
import { TasksCollection } from "/imports/api/TasksCollection";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PersistentDrawerLeft from './Drawer';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function HomePage() {
  const navigate = useNavigate(); // cria o objeto de navegação
  const isLoading = useSubscribe("tasks");

  const { taskAnalise, user } = useTracker(() => {
    const user = Meteor.user();

    const Cadastradas = TasksCollection.find().count();

    const Concluidas = TasksCollection.find(
      {
        situacao: "Concluída"
      }).count();

    return {
      taskAnalise: {
        Cadastradas: Cadastradas,
        Concluidas: Concluidas
      },
      user: user
    };
  });
  
  if (!user) { //  espera user = useTracker(() => Meteor.user()); carregar o usuario
    return (
      <div className="container">
        <h1>Carregando usuario... </h1>
        <Link to="/">Voltar para o login</Link>
      </div>
    );
  }
  if (isLoading()) { //  espera TasksCollection.find(); carregar as tasks
    return <div>Loading...</div>;
  }


  return (
    <div className="app">
      <PersistentDrawerLeft />

      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

      }}>
        <Box className="container">
          Olá {user.profile.firstname}, seja bem vindo ao Todo List !
        </Box>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2}>
            <Card sx={{ maxWidth: 214 }}>
              <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Total de tarefas cadastradas
                </Typography>
                <Typography gutterBottom variant="h2" component="div">
                  {taskAnalise.Cadastradas}
                </Typography>

              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 214, minWidth: 213 }}>

              <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
                  Total de tarefas concluídas {"\n"}{"\n"}

                </Typography>
                <Typography gutterBottom variant="h2" component="div">
                  {taskAnalise.Concluidas}
                </Typography>

              </CardContent>

            </Card>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Card sx={{ maxWidth: 214 }}>
              <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Total de tarefas a serem concluídas
                </Typography>
                <Typography gutterBottom variant="h2" component="div">
                  {taskAnalise.Cadastradas - taskAnalise.Concluidas}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 214 }}>
              <CardActionArea onClick={() => navigate('/tasks')}
                sx={{
                  height: '100%',
                  width: '100%',
                }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Visualisar tarefas
                  </Typography>

                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>

        </Stack>
        <Box className="container" sx={{  height: 35 }}>
        </Box>
      </Container>
    </div>
  );
};
