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
      createdAt: date,
	  isCompleted: "FALSE",
	  //completedBy: "",
	  //completedAt: date
    });
  },
  completeTask: function(taskId){
  // Check the different variables passed
    // Use the Check Package https://atmospherejs.com/meteor/check
	var compDate=new Date();
	compDate=compDate.toString('hh:mm MM-DD-YYYY');
	console.log(compDate);
	//created by
    return ActionItems.update(taskId,({
        $set: { completedBy:Meteor.user().emails[0].address}
		},{
		$set: { completedAt:compDate}
		},{
		$set: { isCompleted:"TRUE"}
		}));
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