
import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const TasksForm = ({HandleAdd}) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!task) return;  
    HandleAdd(task);      
    setTask("");          
  };

  return (
    
      <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-basic"
          label="Tarefa"
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <Button type="submit" variant="contained">
          Adicionar tarefa
        </Button>
      </Stack>
    </form>
      
    
  );
};