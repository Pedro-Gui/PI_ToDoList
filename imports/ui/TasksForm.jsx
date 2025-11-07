
import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export const TasksForm = (
  {
    task = {
      _id: "",
      name: "",
      text: "",
      userId: "",
      owner: "",
      situacao: 'Cadastrada',
      privado: true,
      createdAt: ""
    },

    HandleAdd,

    ButtonTxt = "Adicionar Tarefa"

  }) => {
  const [Nome, setNome] = useState("");
  const [Desc, setDesc] = useState("");
  const [situacao, setSituacao] = useState("Cadastrada");
  const [privado, setPrivado] = useState(true);
  const [carregado, setsetCarregado] = useState(false);


  useEffect(() => {
    if (task && carregado === false) {
      setsetCarregado(true);
      setNome(task.name);
      setDesc(task.text);
      setSituacao(task.situacao);
      setPrivado(task.privado);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Nome || !Desc) return;
    HandleAdd(Nome, Desc, situacao, privado);
    setNome("");
    setDesc("");
    setSituacao("Cadastrada");
    setPrivado(true);
  };
  const HandleSituacao = (event) => {
    event.preventDefault();
    setSituacao(event.target.value);
  };
  const HandlePrivacidade = (event) => {
    event.preventDefault();
    if (event.target.value === "Publico") {
      setPrivado(false);
    } else {
      setPrivado(true);
    }
  };
  return (

    <form onSubmit={handleSubmit} >
      <Stack direction="column" spacing={2} sx={{ alignSelf: 'stretch', }}>
      <Stack direction="row" spacing={2} sx={{ alignSelf: 'stretch', }}>

        <RadioGroup
          row
          aria-labelledby="privacidade"
          name="privacidade"
          required
          value={(privado === true) ? "Privado" : "Publico"}
          onChange={HandlePrivacidade}
        >
          <FormControlLabel value="Privado" control={<Radio />} label="Privado" />
          <FormControlLabel value="Publico" control={<Radio />} label="Público" />
        </RadioGroup>

        <TextField
          id="Nome"
          label="Nome"
          variant="outlined"
          type="text"
          required
          value={Nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Situacao</InputLabel>
          <Select
            labelId="Situacao"
            id="Situacao"
            required
            value={situacao}
            label={situacao}
            onChange={HandleSituacao}
          >
            <MenuItem value={"Cadastrada"}>Cadastrada</MenuItem>
            <MenuItem value={"Em andamento"}>Em andamento</MenuItem>
            <MenuItem value={"Concluída"}>Concluída</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mr: 'auto' }}>
          {ButtonTxt}
        </Button>
      </Stack>
      <TextField
          id="Descrição"
          label="Descrição"
          variant="outlined"
          type="text"
          required
          value={Desc}
          onChange={(e) => setDesc(e.target.value)}
          multiline
        />
      </Stack>
    </form>


  );
};