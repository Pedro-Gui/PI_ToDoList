import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// importando as paginas que serão usadas
import App from '../imports/ui/App.jsx';
import LoginPage from '../imports/ui/LoginPage.jsx';
import TasksPage from '../imports/ui/TasksPage.jsx';
import NotFoundPage from '../imports/ui/NotFoundPage.jsx';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Routes>
        {/*Criando o link da pagina com seu devido componente*/}
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<App />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
});