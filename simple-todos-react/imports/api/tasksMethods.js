import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  "tasks.insert"(doc) {
    if (!this.userId) {
      throw new Meteor.Error("Not-authorized.");
    }

    return TasksCollection.insertAsync({
      ...doc,
      userId: this.userId,
    });
  },
  "tasks.toggleChecked"({ _id, situacao }) {

    return TasksCollection.updateAsync(_id, {
      $set: { situacao: situacao },
    });
  },
  "tasks.delete"({ _id }) {
    return TasksCollection.removeAsync(_id);
  },
  "tasks.edit"({ _id, doc }) {
    if (!this.userId) {
      throw new Meteor.Error("Not-authorized.");
    }

    return TasksCollection.updateAsync(
      _id,
      {
        $set: {
          ...doc,
          createdAt: new Date()
        }
      });
  },
  async "CreateUser"(doc) {

    if (!doc.email || !doc.password || !doc.username) {
            return 'Email, Nome de Usuário e Senha são obrigatórios.';
        }

    if (!(await Accounts.findUserByUsername(doc.username))) {
      await Accounts.createUserAsync({
        username: doc.username, 
        email: doc.email,       
        password: doc.password, 
        profile: {
                primeiroNome: doc.primeiroNome,
                segundoNome: doc.segundoNome,
                empresa: doc.empresa,
                sexo: doc.sexo,
                dataNasc: new Date(doc.dataNasc), 
                createdAt: new Date(),
            },
      });
      return("Cadastro feito com sucesso");
    }
      return("Cadastro já existente!");
  },
});