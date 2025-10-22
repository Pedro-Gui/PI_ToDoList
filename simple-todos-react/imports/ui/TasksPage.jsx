import React from 'react';
import { Link } from 'react-router-dom';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
export default function TasksPage() {
    const user = useTracker(() => Meteor.user());
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/homepage');
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
                    
                    <button onClick={goHome}>Voltar para Home</button>
                    </div>
                </div>
            </header>

            <div>
                <Info />

            </div>

        </div>
    );
}