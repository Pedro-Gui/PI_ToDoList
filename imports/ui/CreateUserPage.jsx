import React, { useEffect, useState } from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import ModeEditIcon from '@mui/icons-material/ModeEdit';




export default function CreateUserPage() {
    const user = useTracker(() => Meteor.user());
    const navigate = useNavigate();
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [Sexo, setSexo] = useState("Não declarar");
    const [Empresa, setEmpresa] = useState("");
    const [PrimeiroNome, setPrimeiroNome] = useState("");
    const [SegundoNome, setSegundoNome] = useState("");
    const [Email, setEmail] = useState("");
    const [DataNasc, setDataNasc] = useState(dayjs());
    const [Imagem, setImagem] = useState();

    useEffect(() => {
        if (user) {
            navigate('/homepage');
        }
    }, [user, navigate]);
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
    const handleCreateUser = async (event) => {
        event.preventDefault();
        const resultado = await Meteor.callAsync("CreateUser", {
            username: UserName,
            password: Password,
            email: Email,
            firstname: PrimeiroNome,
            lastname: SegundoNome,
            empresa: Empresa,
            sexo: Sexo,
            dataNasc: DataNasc ? DataNasc.toISOString() : null,
            imagem: Imagem,
        })
        console.log(resultado);
        if (resultado === "Cadastro feito com sucesso") {
            Meteor.loginWithPassword(UserName, Password);
            alert("Cadastro realizado, um email de verificação foi enviado.");
            navigate('/homepage');
        }
        else {
            alert(`Erro: ${resultado.reason}`)
        }
    }

    return (
        <div className="app">
            <header>
                <div className="app-bar">
                    <div className="app-header">
                        <h1>PI Synergia Pedro Guilherme
                        </h1>

                    </div>
                </div>
            </header>

            <div className="main">
                <h2>Cadastro </h2>
                <form onSubmit={handleCreateUser}>
                    <ListItem className="main">



                        <Stack direction="column" spacing={2}>
                            <Stack direction="column" spacing={2}>
                                <ButtonBase
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
                                        type="file"
                                        required
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
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    id="Nome de usuario"
                                    label="Nome de usuario"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={UserName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                <TextField
                                    id="Senha"
                                    label="Senha"
                                    variant="outlined"
                                    type="password"
                                    required
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    id="PrimeiroNome"
                                    label="Primeiro Nome"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={PrimeiroNome}
                                    onChange={(e) => setPrimeiroNome(e.target.value)}
                                />

                                <TextField
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
                                    id="Email"
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    required
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
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
                                <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                                <FormControlLabel value="Feminino" control={<Radio />} label="Feminino" />
                                <FormControlLabel value="Não declarar" control={<Radio />} label="Não declarar" />
                            </RadioGroup>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Data Nascimento"
                                        
                                        required
                                        value={DataNasc}
                                        onChange={(newValue) => setDataNasc(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            <Button type="submit" variant="contained">
                                Cadastrar
                            </Button>
                            <div className="container" >
                                <Link to="/">Já possuo cadastro</Link>
                                <Link to="/resetPassword">Esqueci minha senha</Link>
                            </div>
                        </Stack>

                    </ListItem>
                </form>
            </div>
        </div >

    );
}