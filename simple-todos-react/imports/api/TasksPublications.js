import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.publish({
  "tasks"() {
    const userId = this.userId;
    if (!userId) {
      return this.ready();
    }
    return TasksCollection.find({ $or: [
            { privado: false }, 
            { userId: userId }  
        ] });
  },
  "task"(taskId) {
    if (!this.userId) {
      return this.ready();
    }

    return TasksCollection.find({ _id: taskId });
  }
});
