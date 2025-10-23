import React, { Fragment, useEffect } from 'react';
//login and password imports
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const user = useTracker(() => Meteor.user()); // carrega o usuario
  const navigate = useNavigate(); // cria o objeto de navegação
  useEffect(() => {
    if (!user) { //volta para a pagina de login se o usuario não estiver logado
      navigate('/');
    }
  }, [user, navigate]);

  const logout = () => {  // função para dar logout e voltar par a tela de login
    Meteor.logout();
    navigate('/'); 
  } 

  const goTasks = () => { // função para ir para a pagina funções ao apertar o botao
    navigate('/tasks');
  }

  if (!user) {
    return <div>Carregando...</div>;
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
                    
                    <button className="Meubutton" onClick={logout}>Logout 🚪</button>
                    </div>
                </div>
            </header>
      <div className="main">

        <Fragment>
          
          <button className="Meubutton" onClick={goTasks}>Ver Tarefas</button>
          
        </Fragment>

      </div>
    </div>
  );
};
