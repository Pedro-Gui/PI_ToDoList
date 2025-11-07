import React, { useState, useEffect } from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { TasksCollection } from "/imports/api/TasksCollection";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PersistentDrawerLeft from './Drawer';
import TaskElement from './TaskElement';
import { TasksForm } from './TasksForm';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';


export default function TaskEditPage() {

    const navigate = useNavigate();                // inicializa o objeto para navegar paginas
    const { taskId } = useParams();     // increve na publicação task com o taskId
    const isLoading = useSubscribe("task", taskId);

    const { task, user } = useTracker(() => {
        const task = TasksCollection.findOne(taskId);
        const user = Meteor.user();
        return { task, user };
    }, [taskId]);


    if (!user || !user._id) { //  espera user = useTracker(() => Meteor.user()); carregar o usuario
        return (
            <div className="container">
                <h1>Carregando usuario e tarefa... </h1>
                <Link to="/">Voltar para o login</Link>
            </div>
        );
    }

    if (isLoading()) { //  espera TasksCollection.find(); carregar as tasks
        return <div>Loading...</div>;
    }
    if (!task) {
        return (
            <div className="container">
                <h1>Tarefa não encontrada.</h1>
                <Link to="/tasks">Voltar para tarefas</Link>
            </div>
        );
    }

    if (user._id !== task.userId) {
        console.log(user);
        console.log(task);
        return (
            <div className="container">
                <h1>Usuario não proprietario da tarefa. </h1>
                <Link to="/tasks">Voltar para tarefas</Link>
            </div>
        );
    };


    const HandleAdd = async (taskName, taskText, situacao, privado) => {
        await Meteor.callAsync("tasks.edit", {
            _id: taskId,
            doc: {
                name: taskName,
                text: taskText,
                situacao: situacao,
                privado: privado,
            },
        });
        navigate('/tasks');
    };

    return (
        <div className="app">
            <PersistentDrawerLeft />
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

            }}>
                <Box className="container" sx={{ marginTop: 2, marginBottom: 2, color: 'text.primary', fontSize: 20, fontWeight: 'medium', alignSelf: 'stretch', textAlign: 'center' }}>
                    Tarefa atual
                </Box>
                <TaskElement
                    key={task._id}
                    task={task}
                    disable={true}
                />
                <Box className="container" sx={{ marginTop: 2, marginBottom: 2, color: 'text.primary', fontSize: 20, fontWeight: 'medium', alignSelf: 'stretch', textAlign: 'center' }}>
                    Editar tarefa
                </Box>
                <ListItem sx={{  width: 'auto' }}>
                    <TasksForm
                        task={task}
                        HandleAdd={HandleAdd}
                        ButtonTxt={"Editar Tarefa"} />
                </ListItem>
                <Box className="container">
                    <Link to="/tasks">Voltar para lista de tarefas</Link>
                    
                </Box>
            </Container>
        </div>
    );
}