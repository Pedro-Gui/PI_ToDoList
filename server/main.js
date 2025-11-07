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
const SEED_IMAGEM_SRC = "picture/AllMightPic.png" ;

function bytesToBase64(bytes) {
  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte),
  ).join("");
  return btoa(binString);
}

Meteor.startup(async () => {
  process.env.MAIL_URL = "smtps://" + encodeURIComponent("resetsenhatodolist@gmail.com") + ":" + encodeURIComponent("hcsbsohwkwaqpqzg") + "@smtp.gmail.com:465";
  Accounts.urls.resetPassword = (token) => { return Meteor.absoluteUrl(`/reset-password/${token}`); };
  Accounts.urls.verifyEmail = (token) => { return Meteor.absoluteUrl(`/verify-email/${token}`); };
  Accounts.emailTemplates.verifyEmail = {
    subject() {
      return ` Confirme seu endereço de e-mail`;
    },
    text(user, url) {
      const nome = user.profile?.firstname || user.username;

      return `Olá, ${nome}!\n\n`
        + `Para ativar sua conta no ToDoList, por favor clique no link abaixo:\n\n`
        + `${url}\n\n`
        + `Obrigado,\n`;
    }
  };
  Accounts.emailTemplates.resetPassword = {
    subject() {
      return "Redefinição da sua senha";
    },
    text(user, url) {
      const nome = user.profile?.firstname || user.username;

      return `Olá, ${nome}.\n\n`
        + `Para criar uma nova senha no ToDoList, clique no link abaixo:\n\n`
        + `${url}\n\n`
        + `Se você não solicitou isso, apenas ignore este e-mail.\n\n`
        + `Obrigado,\n`;
    }
  }; 

  const base64Imagem = `data:image/png;base64,${bytesToBase64(await Assets.getBinaryAsync(SEED_IMAGEM_SRC))}`;

  // If the Links collection is empty, add some data.
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
      email: SEED_EMAIL,
      profile: {
        firstname: SEED_FIRSTNAME,
        lastname: SEED_LASTNAME,
        dataNasc: SEED_DATANASCIMENTO,
        sexo: SEED_SEXO,
        empresa: SEED_EMPRESA,
        imagem: base64Imagem,
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
