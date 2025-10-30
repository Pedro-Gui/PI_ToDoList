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

export default function Verifymail() {
    const { token } = useParams();
    const user = useTracker(() => Meteor.user());
    const navigate = useNavigate();


    const handleVerify = async (event) => {
       event.preventDefault()
       await Accounts.verifyEmail(token, (error) => {
            if (error) {
                alert(error.reason);
            } else {
                alert("Email verificado com sucesso!");
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
                <form onSubmit={handleVerify}>
                    <ListItem className="main">
                        <Stack direction="column" spacing={2}>
                            <Button type="submit" variant="contained">
                                Verificar email
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