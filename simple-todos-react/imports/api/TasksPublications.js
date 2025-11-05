import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.publish({
  "tasks"(hideCompleted = false) {
    const userId = this.userId;
    if (!userId) {
      return this.ready();
    }
    return TasksCollection.find({
      $or: [
        { privado: false },
        { userId: userId }
      ],
      ...(hideCompleted ? { situacao: { $ne: "Concluída" } } : {})

    });
  },
  "task"(taskId) {
    if (!this.userId) {
      return this.ready();
    }

    return TasksCollection.find({ _id: taskId });
  }
});
