import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// importando as paginas que serão usadas
import LoginPage from '../imports/ui/LoginPage.jsx';
import CreateUserPage from '../imports/ui/CreateUserPage.jsx';
import VerifyMail from '../imports/ui/VerifyMailPage.jsx';
import ResetPassword from '../imports/ui/ResetPasswordPage.jsx';
import ResetPasswordToken from '../imports/ui/ResetPasswordTokenPage.jsx';
import HomePage from '../imports/ui/HomePage.jsx';
import UserInfoPage from '../imports/ui/UserInfoPage.jsx';
import TasksPage from '../imports/ui/TasksPage.jsx';
import TaskEditPage from '../imports/ui/TaskEditPage.jsx';
import NotFoundPage from '../imports/ui/NotFoundPage.jsx';


Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Routes>
        {/*Criando o link da pagina com seu devido componente*/}
        <Route path="/" element={<LoginPage />} />
        <Route path="/createUser" element={<CreateUserPage />} />
        <Route path="/verify-email/:token" element={<VerifyMail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordToken />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/userinfo" element={<UserInfoPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/edit/:taskId" element={<TaskEditPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
});