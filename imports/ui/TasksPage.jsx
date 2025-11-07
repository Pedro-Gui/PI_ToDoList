import React, { Fragment, useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
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
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ListItem from '@mui/material/ListItem';
import Pagination from '@mui/material/Pagination';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function TasksPage() {
    const user = useTracker(() => Meteor.user()); // lê o usuario atual
    const navigate = useNavigate();                // inicializa o objeto para navegar paginas
    const [hideCompleted, setHideCompleted] = useState(false);
    const [search, setSearch] = useState("");
    const [pagina, setPagina] = useState(1);

    const isLoading = useSubscribe("tasks", hideCompleted, search, pagina);

    const tasks = useTracker(() => { // se não tiver usuario logado, não carrega os dados
        if (!user) {
            return [];
        }
        return TasksCollection.find({},
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

                <Box className="container" >
                    Adicionar tarefa
                </Box>

                <TasksForm

                    HandleAdd={HandleAdd}
                    ButtonTxt={"Adicionar Tarefa"} />
                <Box className="container" >
                    <ListItem
                        variant="outlined"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        secondaryAction={
                            <Box display={'flex'} flexDirection={'row'} >
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </Search>
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
                        }>
                        <div style={{ width: '48px' }} />
                        <Box textAlign={'center'}>
                            {hideCompleted ? "Lista de tarefas pendentes" : "Lista de tarefas completa"}
                        </Box>


                    </ListItem>
                </Box>

                {isLoading() ?
                    <Button
                        loading={true}
                        loadingPosition="end"
                        variant="contained"
                    >
                        Loading
                    </Button> :
                    <Fragment>
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
                        </List>
                        <Pagination count={10} page={pagina} onChange={(e, value) => setPagina(value)} color="primary" />
                    </Fragment>}

                <Box className="container">
                    <Link to="/homepage">Voltar para Home </Link>

                </Box>
            </Container>
        </div >
    );
}