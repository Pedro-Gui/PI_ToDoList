import React, { Fragment, useEffect, useState } from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PersistentDrawerLeft from './Drawer';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function UserInfoPage() {
    const [carregado, setCarregado] = useState(false);
    const user = useTracker(() => Meteor.user());
    const navigate = useNavigate();
    const [UserName, setUserName] = useState("");
    const [Sexo, setSexo] = useState("Não declarar");
    const [Empresa, setEmpresa] = useState("");
    const [PrimeiroNome, setPrimeiroNome] = useState("");
    const [SegundoNome, setSegundoNome] = useState("");
    const [Email, setEmail] = useState("");
    const [DataNasc, setDataNasc] = useState(dayjs());
    const [Imagem, setImagem] = useState();
    const [Editar, setEditar] = useState(false);

    useEffect(() => {
        if (user && carregado === false) {
            setUserName(user.username);
            setSexo(user.profile.sexo);
            setEmpresa(user.profile.empresa);
            setPrimeiroNome(user.profile.firstname);
            setSegundoNome(user.profile.lastname);
            setEmail(user.emails && user.emails[0] ? user.emails[0].address : "");
            setDataNasc(dayjs(user.profile.dataNasc));
            setImagem(user.profile.imagem ? user.profile.imagem : "");
            setCarregado(true);
        }
    }, [user]);
    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            // Read the file as a data URL
            const reader = new FileReader();
            reader.onload = () => {
                console.log(reader.result);
                setImagem(reader.result);
            };
            reader.readAsDataURL(file);

        }
    };

    const handleEditUser = async (event) => {
        event.preventDefault();

        const resultado = await Meteor.callAsync("EditUser", {
            username: UserName,
            email: Email,
            firstname: PrimeiroNome,
            lastname: SegundoNome,
            empresa: Empresa,
            sexo: Sexo,
            imagem: Imagem,
            dataNasc: DataNasc ? DataNasc.toISOString() : null,
        })
        console.log(resultado);
        if (resultado === "Edição feita com sucesso") {
            if (user.emails[0].address != Email) {
                alert("Edição realizada, um email de verificação foi enviado.");
            } else {
                alert("Edição realizada com sucesso");
            }
            navigate('/homepage');
        }
        else {
            alert(`Erro: ${resultado.reason}`)
        }

    }

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
                <form onSubmit={handleEditUser}>

                    <ListItem className="main">
                        <Box className="container" >
                            Perfil
                        </Box>

                        {!Editar ?
                            <Button onClick={() => setEditar(!Editar)} variant="contained" fullWidth label="fullWidth" sx={{ marginBottom: 2 }}>
                                Ativar edição
                            </Button> : null}
                        
                                
                            
                        <Stack direction="column" spacing={2}>
                            <ButtonBase
                                    disabled={!Editar}
                                    component="label"
                                    role={undefined}
                                    tabIndex={-1} // prevent label from tab focus
                                    aria-label="Avatar image"
                                    sx={{
                                        width: '25%',
                                        aspectRatio: '1 / 1',
                                        height: 'auto',
                                        alignSelf: 'center',
                                        borderRadius: '50%',
                                        '&:has(:focus-visible)': {
                                            outline: '2px solid',
                                            outlineOffset: '2px',
                                        },
                                    }}
                                >
                                    <Avatar alt="Upload new avatar" src={Imagem} sx={{width: '100%',aspectRatio: '1 / 1', height: 'auto',}} >
                                        <ModeEditIcon />
                                    </Avatar>

                                    <input
                                        disabled={!Editar}
                                        type="file"
                                        accept="image/*"
                                        style={{
                                            border: 0,
                                            clip: 'rect(0 0 0 0)',
                                            height: '1px',
                                            margin: '-1px',
                                            overflow: 'hidden',
                                            padding: 0,
                                            position: 'absolute',
                                            whiteSpace: 'nowrap',
                                            width: '1px',
                                        }}
                                        onChange={handleAvatarChange}

                                    />
                                </ButtonBase>
                            <TextField
                                disabled={!Editar}
                                id="Nome de usuario"
                                label="Nome de usuario"
                                variant="outlined"
                                type="text"
                                required
                                value={UserName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    disabled={!Editar}
                                    id="PrimeiroNome"
                                    label="Primeiro Nome"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={PrimeiroNome}
                                    onChange={(e) => setPrimeiroNome(e.target.value)}
                                />
                                <TextField
                                    disabled={!Editar}
                                    id="Segundo Nome"
                                    label="Segundo Nome"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={SegundoNome}
                                    onChange={(e) => setSegundoNome(e.target.value)}
                                />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    disabled={!Editar}
                                    id="Email"
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    required
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    disabled={!Editar}
                                    id="Empresa"
                                    label="Empresa"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={Empresa}
                                    onChange={(e) => setEmpresa(e.target.value)}
                                />
                            </Stack>

                            <RadioGroup
                                row

                                aria-labelledby="sexo"
                                name="sexo"
                                value={Sexo}
                                onChange={(e) => setSexo(e.target.value)}
                            >
                                <FormControlLabel disabled={!Editar} value="Masculino" control={<Radio />} label="Masculino" />
                                <FormControlLabel disabled={!Editar} value="Feminino" control={<Radio />} label="Feminino" />
                                <FormControlLabel disabled={!Editar} value="Não declarar" control={<Radio />} label="Não declarar" />
                            </RadioGroup>

                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                
                                <DemoContainer components={['DatePicker']} sx={{ maxWidth: '100%' }} >
                                    <DatePicker
                                        fullWidth
                                        disabled={!Editar}
                                        label="Data Nascimento"
                                        value={DataNasc}
                                        onChange={(newValue) => setDataNasc(newValue)}
                                        format="DD/MM/YYYY"
                                        required
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            {Editar ?
                                <Fragment>
                                    <Button type="submit" variant="contained">
                                        Confirmar edição
                                    </Button>
                                    <Button onClick={() => location.reload()} variant="contained">
                                        Cancelar edição
                                    </Button>
                                </Fragment>
                                : null}
                        </Stack>

                        <Box className="container" >
                            <Link to="/reset-password">Alterar senha</Link>
                        </Box>

                    </ListItem>

                </form>
            </Container>
        </div>


    );
}