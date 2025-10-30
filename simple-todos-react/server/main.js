import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TasksCollection';
import "../imports/api/TasksPublications";
import "../imports/api/tasksMethods";

const insertTask = ([nome, taskText, situacao, privado], user) =>
  TasksCollection.insertAsync({
    name: nome,
    text: taskText,
    userId: user._id,
    owner: user.username,
    situacao: situacao,
    privado: privado,
    createdAt: new Date(),
  });

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";
const SEED_EMAIL = "plaf.6.403@gmail.com";
const SEED_DATANASCIMENTO = new Date(2004, 9, 3);
const SEED_SEXO = "Masculino";
const SEED_EMPRESA = "SYNERGIA";
const SEED_FIRSTNAME = "Pedro Guilherme";
const SEED_LASTNAME = "Andrade Salgado";

Meteor.startup(async () => {
  process.env.MAIL_URL="smtps://"+encodeURIComponent("resetsenhatodolist@gmail.com")+":"+encodeURIComponent("hcsbsohwkwaqpqzg")+"@smtp.gmail.com:465";
  Accounts.urls.resetPassword = (token) => {       return Meteor.absoluteUrl(`/reset-password/${token}`);};
  Accounts.urls.verifyEmail = (token) => {       return Meteor.absoluteUrl(`/verify-email/${token}`);};
  // If the Links collection is empty, add some data.
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
      email: SEED_EMAIL,
      profile: {
        firstname: SEED_FIRSTNAME,
        lastname: SEED_LASTNAME,
        dataNascimento: SEED_DATANASCIMENTO,
        sexo: SEED_SEXO,
        empresa: SEED_EMPRESA,
        createdAt: new Date(),
      },

    });
  }

  const user = await Accounts.findUserByUsername(SEED_USERNAME);

  if ((await TasksCollection.find().countAsync()) === 0) {
    [
      ["First Task", "Clean my room", "Cadastrada", false],
      ["Second Task", "Get rid of trash", "Em andamento", false],
      ["Third Task", "Pre relatorio de c2", "Em andamento", false],
      ["Fourth Task", "Prova eletromagnetismo", "Cadastrada", false],
      ["Fifth Task", "Prova AOC", "Cadastrada", false],
      ["Sixth Task", "Iniciar Tarefa", "Concluída", false],
      ["Seventh Task", "Finalizar Tarefa", "Cadastrada", true],
    ].forEach((taskElements) => insertTask(taskElements, user));
  }

});
