import React, { Fragment, useEffect } from 'react';
//login and password imports
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import PersistentDrawerLeft from './Drawer';

export default function HomePage() {
  const user = useTracker(() => Meteor.user()); // carrega o usuario
  const navigate = useNavigate(); // cria o objeto de navegação
  useEffect(() => {
    if (!user) { //volta para a pagina de login se o usuario não estiver logado
      navigate('/');
    }
  }, [user, navigate]);


  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="app">
      <PersistentDrawerLeft />
    </div>
  );
};
