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

  getCreatedByUser: function(){
    if(!this._id) return;

    var actionItem = ActionItems.findOne({_id: this._id});
    if(actionItem.isSystemMessage){
      return "SYSTEM";
    }
    var createdByUser= Meteor.users.findOne(actionItem.createdBy);
    var label = "";
    try{
      label = createdByUser.profile.firstName+" "+completedByUser.profile.lastName;
    }
    catch(err){
      label = createdByUser.emails[0].address;
    }
    return label;
  },

  getCompletedByUser: function(){
    if(!this._id) return ;

    var actionItem = ActionItems.findOne({_id: this._id});
    if(actionItem.isSystemMessage){
      return "SYSTEM";
    }
    var completedByUser= Meteor.users.findOne(actionItem.completedBy);
    if(completedByUser){
      var label = "";
      try{
        label = completedByUser.profile.firstName+" "+completedByUser.profile.lastName;
      }
      catch(err){
        label = completedByUser.emails[0].address;
      }
      return label;
    }
  },
  
  getTableRowClass: function(){
    var rowType="";

    if(!this._id) return ;

    var actionItem = ActionItems.findOne({_id: this._id});
    if(actionItem.isSystemMessage)
    {
      rowType="danger";
    }
    return rowType;
  }
  
});

Template.actionItems.events({
  "submit .new-task": function(e, tpl){
    e.preventDefault();

    // get the task attributes
    var task = {
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
      description: "System Message",
      type: tpl.$("#type").val()
    }

    Meteor.call("addSystemTask", task, function(e, r){
      console.log(e, r);
    });

  }
  ,
  'click tr.action-item-row': function (e,tpl) {

    // find the id of the selected student
    var id = $(e.target).parent().attr('id');

    console.log(id);

    // set the session value to that student
    Session.set('selectedActionItem', id);
  },

  'click button.action-item': function (e, tpl) {
    console.log(this._id);
    Meteor.call("completeTask",this._id);
  }
});
