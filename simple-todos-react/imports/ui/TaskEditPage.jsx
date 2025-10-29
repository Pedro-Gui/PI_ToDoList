import React, { useState } from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { TasksCollection } from "/imports/api/TasksCollection";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TaskElement from './TaskElement';
import { TasksForm } from './TasksForm';
import ListItem from '@mui/material/ListItem';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function TaskEditPage() {
    const [situacao, setSituacao] = useState("");
    const [privado, setPrivado] = useState(true);
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

    if (user._id !== task.userId) {
        return (
            <div className="container">
                <h1>Usuario não proprietario da tarefa. </h1>
                <Link to="/tasks">Voltar para tarefas</Link>
            </div>
        );
    };
    const HandlePrivacidade = (event) => {
        if (event.target.value === "Publico") {
            setPrivado(false);
        } else {
            setPrivado(true);
        }
    };
    const HandleAdd = async (taskName, taskText) => {

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
            <header>
                <div className="app-bar">
                    <div className="app-header">
                        <h1>PI Synergia Pedro Guilherme
                        </h1>

                    </div>
                    <div className="header-info">
                        <h4>Usuário: {user.username} </h4>

                        <button className="Meubutton" onClick={() => navigate('/tasks')}>Ver tarefas</button>
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
            <h2>Área de edição: {task.name} </h2>
            <ListItem >
                <Stack direction="row" spacing={2}>
                    
                    <RadioGroup
                        aria-labelledby="privacidade"
                        name="privacidade"
                        value={(task.privado === true)? "Privado":"Publico"}
                        onChange={HandlePrivacidade}
                    >
                        <FormControlLabel value="Privado" control={<Radio />} label="Privado" />
                        <FormControlLabel value="Publico" control={<Radio />} label="Público" />
                    </RadioGroup>

                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Situacao</InputLabel>
                        <Select
                            labelId="Situacao"
                            id="Situacao"
                            value={task.situacao}
                            label={task.situacao}
                            onChange={(event) => setSituacao(event.target.value)}
                        >
                            <MenuItem value={"Cadastrada"}>Cadastrada</MenuItem>
                            <MenuItem value={"Em andamento"}>Em andamento</MenuItem>
                            <MenuItem value={"Concluída"}>Concluída</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <TasksForm
                        HandleAdd={HandleAdd}
                        ButtonTxt={"Editar Tarefa"} />
                    
                </Stack>
            </ListItem>

        </div>
    );
}