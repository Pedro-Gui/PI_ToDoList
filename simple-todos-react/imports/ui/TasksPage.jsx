import React, { useEffect } from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { TasksForm } from './TasksForm';
import Box from '@mui/material/Box';
import TaskElement from './TaskElement';
import List from '@mui/material/List';
import { TasksCollection } from "/imports/api/TasksCollection";
import { Link } from 'react-router-dom';

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

    const HandleChange = ({ _id}, situacao ) => { Meteor.callAsync("tasks.toggleChecked", { _id, situacao });};
    const HandleApagar = ({ _id }) => Meteor.callAsync("tasks.delete", { _id });
    const HandleAdd = async (taskName,taskText) => {
        await Meteor.callAsync("tasks.insert", {
            name: taskName,
            text: taskText,
            userId: user._id,
            situacao: "Cadastrada",
            privado: false,
            owner: user.username,
            createdAt: new Date(),
        });

    };
    const HandleEdit =  ({ _id }) => {
          navigate(`./edit/${_id}`);
    };



    const goHome = () => { //botão para voltar a pagina home
        navigate('/homepage');
    }

    if (!user) { //  espera user = useTracker(() => Meteor.user()); carregar o usuario
            return (
                <div className="container">
                    <h1>Carregando usuario... </h1>
                    <Link to="/">Voltar para o login</Link>
                </div>
            );
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
                borderLeft: 1,
            }}>
                <TasksForm
                    HandleAdd={HandleAdd}
                    ButtonTxt={"Adicionar Tarefa"} />
                <h2 sx={{display: "flex",
    align: "center",}}>Lista de tarefas</h2>
                <List>
                    {tasks.map((task) => (
                        <TaskElement
                            key={task._id}
                            task={task}
                            userId = {user._id}
                            HandleApagar={HandleApagar}
                            HandleChange = {HandleChange}
                            HandleEdit = {HandleEdit}
                            disable={false}
                        />
                    ))}
                </List>
            </Box>

        </div>
    );
}