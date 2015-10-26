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
	var date=new Date();
    return ActionItems.insert({
      title: "title",
      description: task.description,
      type: task.type,
      createdBy: Meteor.userId(),
      createdAt: date,
	  isCompleted: false,
	  //completedBy: "",
	  //completedAt: date
    });
  },
  addSystemTask: function(task){
    // Check the different variables passed
    // Use the Check Package https://atmospherejs.com/meteor/check
	check(task, {
    description: String,
	type: String
  });
	var date=new Date();
	var systemUser=Meteor.users.findOne({"emails.address": "SYSTEM@system.com"});
    return ActionItems.insert({
      title: "title",
      description: task.description,
      type: task.type,
      createdBy: systemUser,
      createdAt: date,
	  isCompleted: false,
	  //completedBy: "",
	  //completedAt: date
    });
  },
  completeTask: function(taskId){
  // Check the different variables passed
    // Use the Check Package https://atmospherejs.com/meteor/check
	check(taskId, String);
	var compDate=new Date();
	//created by
    return ActionItems.update(taskId,{
        $set: { completedBy:Meteor.userId(), completedAt:compDate, isCompleted:true}
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