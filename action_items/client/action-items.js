Template.actionItems.onCreated(function(){
  Meteor.subscribe("actionItems",{},dataReady);
  function dataReady(){
    Session.set("selectedActionItemType", "INFANT");
  }
});

Template.actionItems.helpers({
  infantTasks: function () {
    return ActionItems.find({type:"INFANT",isCompleted:false}, {sort: {createdAt: 1}});
  },
  toddlerTasks: function () {
    return ActionItems.find({type:"TODDLER",isCompleted:false}, {sort: {createdAt: 1}});
  },
  miscTasks: function () {
    return ActionItems.find({type:"MISCELLANEOUS",isCompleted:false}, {sort: {createdAt: 1}});
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
  actionItemTypes: function(){
    var itemTypes=["INFANT","TODDLER","MISCELLANEOUS","COMPLETED"];
    return itemTypes;
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
    tpl.$("#type").val("INFANT")
    tpl.$("#description").val("");
  },
  
  'click tr.action-item-row': function (e,tpl) {
    // find the id of the selected student
    var id = $(e.target).parent().attr('id');

    // set the session value to that student
    Session.set('selectedActionItem', id);
  },

  'click button.complete-action-item': function (e, tpl) {
    console.log(this._id);
    Meteor.call("completeTask",this._id);
  },
  'click button.delete-action-item': function (e, tpl) {
    console.log(this._id);
    Meteor.call("deleteTask",this._id);
  },
  'click .action-item-tabs li': function () {
    Session.set("selectedActionItemType",  this._id);
  }
});
