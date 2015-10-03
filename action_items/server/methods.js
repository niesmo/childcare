Meteor.methods({
  /**
   * [addTask description]
   * @param {[type]} task [description]
   */
  addTask: function(task){
    // Check the different variables passed
    // Use the Check Package https://atmospherejs.com/meteor/check
	var date=new Date();
	date=date.toString('hh:mm MM-DD-YYYY');
    return ActionItems.insert({
      title: task.title,
      description: task.description,
      type: task.type,
      createdBy: Meteor.user().emails[0].address,
      createdAt: date
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