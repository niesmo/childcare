Meteor.methods({
  /**
   * [addTask description]
   * @param {[type]} task [description]
   */
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
      type: task.type,
      createdBy: Meteor.userId(),
      createdAt: new Date(),
	  isCompleted: false,
    isSystemMessage: true
    });
  }
 });