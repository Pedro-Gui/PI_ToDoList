import React, { useState, Fragment } from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
//login and password imports
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';



export const App = () => {
  const user = useTracker(() => Meteor.user());
  

  const logout = () => Meteor.logout();
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
        {user ? (
          <Fragment>
            <h4>Usuário: {user.username} </h4>
            <button  onClick={logout}>Logout 🚪</button>          
            
            <div>
              <Hello />
              <Info />
            </div>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}
