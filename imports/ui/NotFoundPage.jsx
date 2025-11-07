import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
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
            
            <div className="container">
                <h1>404 Not Found </h1>
                <Link to="/">Voltar para o inicio</Link>
            </div>
        </div>
    );
}