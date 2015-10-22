Template.actionItems.onCreated(function(){
  Meteor.subscribe("actionItems");
});

Template.actionItems.helpers({
  infantTasks: function () {
    return ActionItems.find({type:"INFANT",isCompleted:false}, {sort: {createdAt: 1}});
  },
  toddlerTasks: function () {
    return ActionItems.find({type:"TODDLER",isCompleted:false}, {sort: {createdAt: 1}});
  },
  completedTasks: function () {
    return ActionItems.find({isCompleted:true}, {sort: {createdAt: -1}});
  },

  selectedActionItem: function (){
    var id = Session.get('selectedActionItem');
    //remove ai from id, which is there so it doesnt start with numbers
    if(!id) return ;
    id=id.substring(2);

    var actionItem = ActionItems.findOne({_id: id});
    return actionItem;
  },

  getCreatedByUser: function(actionItemID){
    if(!actionItemID) return;

    var actionItem = ActionItems.findOne({_id: actionItemID});
    var createdByUser= Meteor.users.findOne(actionItem.createdBy);
    return createdByUser.emails[0].address;
  },

  getCompletedByUser: function(actionItemID){
    if(!actionItemID) return ;

    var actionItem = ActionItems.findOne({_id: actionItemID});
    var completedByUser= Meteor.users.findOne(actionItem.completedBy);
    if(completedByUser){
      return completedByUser.emails[0].address;
    }
  },
  
  getTableRowType: function(actionItemID){
    var rowType="action-item-row";
	
	if(!actionItemID) return ;

    var actionItem = ActionItems.findOne({_id: actionItemID});
    var createdByUser= Meteor.users.findOne(actionItem.createdBy);
	if(createdByUser.emails[0].address=="SYSTEM@system.com")
	{
		rowType="danger action-item-row";
	}
	return rowType;
  }
  
});

Template.actionItems.events({
  "submit .new-task": function(e, tpl){
    e.preventDefault();

    // get the task attributes
    var task = {
      title: tpl.$("#title").val(),
      description: tpl.$("#description").val(),
      type: tpl.$("#type").val()
    }

    Meteor.call("addTask", task, function(e, r){
      console.log(e, r);
    });

    // clear the form
    tpl.reset();
  },
  "click button.system-task": function(e, tpl){
    e.preventDefault();

    // get the task attributes
    var task = {
      title: "System Message",
      description: "System Message",
      type: tpl.$("#type").val()
    }

    Meteor.call("addSystemTask", task, function(e, r){
      console.log(e, r);
    });

    // clear the form
    tpl.reset();
  }
  ,
  'click td.action-row-item': function (e,tpl) {
    // find the id of the selected student
    var id = e.target.id;

    // set the session value to that student
    Session.set('selectedActionItem', id);
  },

  'click button.action-item': function (e, tpl) {
    console.log(this._id);
    Meteor.call("completeTask",this._id);
  }
});
