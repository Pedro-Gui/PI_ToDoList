
import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const TasksForm = ({HandleAdd, ButtonTxt}) => {
  const [Nome, setNome] = useState("");
  const [Desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!Nome && !Desc) return;  
    HandleAdd(Nome,Desc);      
    setNome(""); 
    setDesc("");         
  };

  return (
    
      <form onSubmit={handleSubmit} >
      <Stack direction="row" spacing={2}>
        <TextField
          id="Nome"
          label="Nome"
          variant="outlined"
          value={Nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          id="Descrição"
          label="Descrição"
          variant="outlined"
          value={Desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <Button type="submit" variant="contained">
          {ButtonTxt}
        </Button>
      </Stack>
    </form>
      
    
  );
};