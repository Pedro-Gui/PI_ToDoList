import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import { Accounts } from 'meteor/accounts-base';
import Box from '@mui/material/Box';

export default function Verifymail() {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(async () => {
            await Accounts.verifyEmail(token, (error) => {
            if (error) {
                alert(error.reason);
            } else {
                alert("Email verificado com sucesso!");
                navigate('/');
            }
        });
        }, [token]);

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

                <ListItem className="main">
                    <Box className="container">
                        Verificando email.
                    </Box>
                    <div className="container" >
                        <Link to="/">Fazer login</Link>
                    </div>


                </ListItem>

            </div>
        </div >

    );
}