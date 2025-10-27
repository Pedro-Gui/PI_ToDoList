import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TasksCollection';
import "../imports/api/TasksPublications";
import "../imports/api/tasksMethods";

const insertTask = ([nome, taskText, situacao], user) =>
  TasksCollection.insertAsync({
    name: nome,
    text: taskText,
    userId: user._id,
    owner: user.username,
    situacao: situacao,
    createdAt: new Date(),
  });

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
   if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = await Accounts.findUserByUsername(SEED_USERNAME);

  if ((await TasksCollection.find().countAsync()) === 0) {
    [
      ["First Task","Clean my room", "Cadastrada"],
      ["Second Task","Get rid of trash","Em andamento"],
      ["Third Task","Pre relatorio de c2", "Em andamento"],
      ["Fourth Task","Prova eletromagnetismo", "Cadastrada"],
      ["Fifth Task","Prova AOC","Cadastrada"],
      ["Sixth Task","Iniciar Tarefa", "Concluída"],
      ["Seventh Task","Finalizar Tarefa","Cadastrada"],
    ].forEach((taskElements) => insertTask(taskElements, user));
  }
  
});
