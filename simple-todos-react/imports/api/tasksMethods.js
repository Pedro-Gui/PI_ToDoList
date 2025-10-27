import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

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
});