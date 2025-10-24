import React, { useState } from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { TasksCollection } from "/imports/api/TasksCollection";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TaskElement from './TaskElement';
import { TasksForm } from './TasksForm';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function TaskEditPage() {
    const user = useTracker(() => Meteor.user()); // lê o usuario atual
    const navigate = useNavigate();                // inicializa o objeto para navegar paginas
    const { taskId } = useParams();
    const isLoading = useSubscribe("task", taskId);       // increve na publicação task com o taskId
    const task = useTracker(() => {
        if (!user || !taskId) { // se não tiver usuario logado, não carrega os dados
            return [];
        }
        return TasksCollection.findOne(taskId);
    }, [taskId]);
    const [isChecked, setIsChecked] = useState(task.isChecked);
    const HandleAdd = async (taskText) => {

        await Meteor.callAsync("tasks.edit", {
            _id: taskId,
            doc: {
                text: taskText,
                isChecked: isChecked,
            },
        });
        navigate('/tasks');
    };

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
            <header>
                <div className="app-bar">
                    <div className="app-header">
                        <h1>PI Synergia Pedro Guilherme
                        </h1>

                    </div>
                    <div className="header-info">
                        <h4>Usuário: {user.username} </h4>

                        <button className="Meubutton" onClick={()=>navigate('/tasks')}>Ver tarefas</button>
                    </div>
                </div>
            </header>

            <h1>Pagina de edição</h1>
            <h2>Tarefa antiga </h2>
            <TaskElement
                key={task._id}
                task={task}
                disable={true}
            />
            <h2>Área de edição: {task.text} </h2>
            <ListItem>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={isChecked}
                        onClick={() => setIsChecked(!isChecked)}

                    />
                </ListItemIcon>
                <TasksForm
                    HandleAdd={HandleAdd}
                    ButtonTxt={"Editar Tarefa"} />
            </ListItem>

        </div>
    );
}