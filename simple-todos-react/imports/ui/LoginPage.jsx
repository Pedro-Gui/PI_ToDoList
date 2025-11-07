import { LoginForm } from './LoginForm';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';


export default function LoginPage() {
    const user = useTracker(() => Meteor.user());
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/homepage');
        }
    }, [user, navigate]);

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
            <Container> 
                    <LoginForm /> 
            </Container>

        </div>

    );
}