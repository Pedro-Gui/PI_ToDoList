import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';


export default function ResetPassword() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");

    const handleResetPassword = async (event) => {
        event.preventDefault()
        await Accounts.forgotPassword({ email: Email }, (error) => {
            if (error) {
                console.error(error.reason);
            } else {
                alert('Link para redefinição de senha enviado para o e-mail.');
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
                <h2>Insira o seu email cadastrado</h2>
                <form onSubmit={handleResetPassword}>
                    <ListItem className="main">
                        <Stack direction="column" spacing={2}>                          
                                <TextField
                                    id="Email"
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            

                            <Button type="submit" variant="contained">
                                Mandar email
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