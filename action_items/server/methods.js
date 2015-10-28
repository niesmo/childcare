Meteor.methods({
  /**
   * [addTask description]
   * @param {[type]} task [description]
   */
  addTask: function(task){
    // Check the different variables passed
    // Use the Check Package https://atmospherejs.com/meteor/check
	check(task, {
    description: String,
	type: String
  });
    return ActionItems.insert({
      title: "title",
      description: task.description,
      type: task.type,
      createdBy: Meteor.userId(),
      createdAt: new Date(),
	  isCompleted: false,
    isSystemMessage: false
    });
  },
  addSystemTask: function(task){
    // Check the different variables passed
    // Use the Check Package https://atmospherejs.com/meteor/check
	check(task, {
    description: String,
	type: String
  });
    return ActionItems.insert({
      title: "title",
      description: task.description,
      type: "INFANT",
      createdAt: new Date(),
	  isCompleted: false,
    isSystemMessage: true
    });
  },
  completeTask: function(taskId){
  // Check the different variables passed
    // Use the Check Package https://atmospherejs.com/meteor/check
	check(taskId, String);
	//created by
    return ActionItems.update(taskId,{
        $set: { completedBy:Meteor.userId(), completedAt:new Date(), isCompleted:true}
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