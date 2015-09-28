Meteor.methods({
  /**
   * [addTask description]
   * @param {[type]} task [description]
   */
  addTask: function(task){
    // Check the different variables passed
    // Use the Check Package https://atmospherejs.com/meteor/check
    return ActionItems.insert({
      title: task.title,
      description: task.description,
      type: task.type,
      createdBy: Meteor.user().emails[0].address,
      createdAt: new Date()
    });
  },


  deleteToddlerTask: function (taskId) {
    ActionItems.remove(taskId);
  },
  
  /*
  setChecked: function (taskId, setChecked) {
    ToddlerTasks.update(taskId, { $set: { checked: setChecked} });
  },
  */

  deleteInfantTask: function (taskId) {
    ActionItems.remove(taskId);
  }
});