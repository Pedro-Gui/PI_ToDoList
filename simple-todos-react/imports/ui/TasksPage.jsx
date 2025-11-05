import React, { useEffect, useState } from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import PersistentDrawerLeft from './Drawer';
import { TasksForm } from './TasksForm';
import Box from '@mui/material/Box';
import TaskElement from './TaskElement';
import List from '@mui/material/List';
import { TasksCollection } from "/imports/api/TasksCollection";
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';

export default function TasksPage() {
    const user = useTracker(() => Meteor.user()); // lê o usuario atual
    const navigate = useNavigate();                // inicializa o objeto para navegar paginas
    
    const [hideCompleted, setHideCompleted] = useState(false);

    const isLoading = useSubscribe("tasks",hideCompleted); 

    const tasks = useTracker(() => { // se não tiver usuario logado, não carrega os dados
        if (!user) {
            return [];
        }
        return TasksCollection.find( {},
            {
                sort: { createdAt: -1 },
            }).fetch();
    });


    const HandleChange = ({ _id }, situacao) => { if (situacao) { Meteor.callAsync("tasks.toggleSituacao", { _id, situacao }); } };
    const HandleApagar = ({ _id }) => Meteor.callAsync("tasks.delete", { _id });
    const HandleAdd = async (taskName, taskText, situacao, privado) => {
        await Meteor.callAsync("tasks.insert", {
            name: taskName,
            text: taskText,
            userId: user._id,
            situacao: situacao,
            privado: privado,
            owner: user.username,
            createdAt: new Date(),
        });

    };
    const HandleEdit = ({ _id }) => {
        navigate(`./edit/${_id}`);
    };


    if (!user) { //  espera user = useTracker(() => Meteor.user()); carregar o usuario
        return (
            <div className="container">
                <h1>Carregando usuario... </h1>
                <Link to="/">Voltar para o login</Link>
            </div>
        );
    }

    return (
        <div className="app">
            <PersistentDrawerLeft />
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

            }}>

                <Box className="container" sx={{ marginTop: 2, marginBottom: 2, color: 'text.primary', fontSize: 20, fontWeight: 'medium', alignSelf: 'stretch', textAlign: 'center' }}>
                    Criar tarefa
                </Box>

                <TasksForm

                    HandleAdd={HandleAdd}
                    ButtonTxt={"Adicionar Tarefa"} />
                <Box className="container" display={'flex'} flexDirection={'row'} alignItems={'center'} >
                    <Box sx={{ flexGrow: 1,textAlign:'center' }}> 
                        {hideCompleted ? "Lista de tarefas pendentes" : "Lista de tarefas completa" }
                    </Box>
                    <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                            <FormControlLabel
                                // label="Exibir tarefas concluídas"
                                control={
                                    <Switch checked={!hideCompleted} onChange={() => setHideCompleted(!hideCompleted)} name="gilad" />
                                }
                            />
                        </FormGroup>
                    </FormControl>
                </Box>

                {isLoading() ? <div>Loading...</div> :
                <List sx={{ alignSelf: 'stretch', }}>
                    {tasks.map((task) => (
                        <TaskElement
                            key={task._id}
                            task={task}
                            userId={user._id}
                            HandleApagar={HandleApagar}
                            HandleChange={HandleChange}
                            HandleEdit={HandleEdit}
                            disable={false}
                        />
                    ))}
                </List>}
                

            </Container>
        </div >
    );
}