import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };

  return (
    <form onSubmit={submit} className="login-form">
      <Stack direction="column" spacing={2}>
        <Box sx={{fontSize:'20px'}}>
                    Bem vindo ao todo list
                </Box>
        <TextField
          id="Username"
          label="Username"
          variant="outlined"
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="Password"
          label="Password"
          variant="outlined"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ mr: 'auto' }}>
          Login
        </Button>
        <Box className="container">
                    <Link to="/createUser">Criar Conta</Link>
                    <Link to="/reset-password">Esqueci minha senha</Link>
                </Box>
      </Stack>
    </form>
  );
};