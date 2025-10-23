import React, { useEffect } from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { TasksForm } from './TasksForm';
import Box from '@mui/material/Box';
import TaskElement from './TaskElement';
import List from '@mui/material/List';
import { TasksCollection } from "/imports/api/TasksCollection";

export default function TasksPage() {
    const user = useTracker(() => Meteor.user()); // lê o usuario atual
    const navigate = useNavigate();                // inicializa o objeto para navegar paginas
    const isLoading = useSubscribe("tasks");       // verifica se as tasks foram carregadas


    const tasks = useTracker(() => { // se não tiver usuario logado, não carrega os dados
        if (!user) {
            return [];
        }

        return TasksCollection.find().fetch();
    });

    const HandleCheck = ({ _id, isChecked }) => { Meteor.callAsync("tasks.toggleChecked", { _id, isChecked }); }
    const HandleApagar = ({ _id }) => Meteor.callAsync("tasks.delete", { _id });
    const HandleAdd = async (taskText) => {
        await Meteor.callAsync("tasks.insert", {
            text: taskText,
            userId: user._id,
            owner: user.username,
            isChecked: false,
            createdAt: new Date(),
        });

    };
    const goHome = () => { //botão para voltar a pagina home
        navigate('/homepage');
    }

    useEffect(() => {  //volta para a pagina de login automaticamente se o usuario não estiver logado
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user) { //  espera user = useTracker(() => Meteor.user()); carregar o usuario

        return <div>Carregando...</div>;
    }

    if (isLoading()) { //  espera TasksCollection.find().fetch(); carregar as tasks
        return <div>Loading...</div>;
    }

    return (
        <div className="app">
            <header>
                <div className="app-bar">
                    <div className="app-header">
                        <h1>PI Synergia Pedro Guilherme
                        </h1>

                    </div>
                    <div className="header-info">
                        <h4>Usuário: {user.username} </h4>

                        <button className="Meubutton" onClick={goHome}>Voltar para Home</button>
                    </div>
                </div>
            </header>

            <Box sx={{
                width: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 600,
            }}>
                <TasksForm
                    HandleAdd={HandleAdd} />
                <h2>Lista de tarefas</h2>
                <List>
                    {tasks.map((task) => (
                        <TaskElement
                            key={task._id}
                            task={task}
                            HandleApagar={HandleApagar}
                            HandleCheck={HandleCheck}
                        />
                    ))}
                </List>
            </Box>

        </div>
    );
}