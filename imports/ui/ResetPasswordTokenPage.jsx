import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import { Accounts } from 'meteor/accounts-base';

export default function ResetPassword() {
    const { token } = useParams();
    const user = useTracker(() => Meteor.user());
    const navigate = useNavigate();
    const [Password, setPassword] = useState("");


    const handleResetPassword = async (event) => {
       event.preventDefault()
       await Accounts.resetPassword(token, Password, (error) => {
            if (error) {
                console.error(error.reason);
            } else {
                alert("Senha alterada com sucesso!");
                navigate('/');
            }
        });
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
                <h2>Nova Senha </h2>
                <form onSubmit={handleResetPassword}>
                    <ListItem className="main">
                        <Stack direction="column" spacing={2}>

                            <TextField
                                id="Nova Senha"
                                label="Nova Senha"
                                variant="outlined"
                                type="password"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button type="submit" variant="contained">
                                Atualizar senha
                            </Button>
                            <div className="container" >
                                <Link to="/">Fazer login</Link>
                            </div>
                        </Stack>

                    </ListItem>
                </form>
            </div>
        </div >

    );
}