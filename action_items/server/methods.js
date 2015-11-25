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
  completeTask: function(taskId){
  // Check the different variables passed
    // Use the Check Package https://atmospherejs.com/meteor/check
	check(taskId, String);
	//created by
    return ActionItems.update(taskId,{
        $set: { completedBy:Meteor.userId(), completedAt:new Date(), isCompleted:true}
		});
  },


  deleteTask: function (taskId) {
    check(taskId, String);
    return ActionItems.remove(taskId);
  }
});