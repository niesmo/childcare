Template.actionItemTableChooser.helpers({
  isNotCompleted: function (tableType) {
    if(tableType=="INFANT"||tableType=="TODDLER"||tableType=="MISCELLANEOUS"){
      return true;
    }else {
      return false;
    }
  }
  });
  
 Template.classActionItemTable.onCreated(function(){
  Meteor.subscribe("actionItems");
});

 Template.completedActionItemTable.onCreated(function(){
  Meteor.subscribe("actionItems");
});

Template.classActionItemTable.helpers({
  classActionItems: function (classType) {
    return ActionItems.find({type:classType,isCompleted:false}, {sort: {createdAt: 1}});
  },
  completedTasks: function () {
    return ActionItems.find({isCompleted:true}, {sort: {completedAt: -1}});
  },

  selectedActionItem: function (){
    var id = Session.get('selectedActionItem');
    //remove ai from id, which is there so it doesnt start with numbers
    if(!id) return ;
    id=id.substring(2);

    var actionItem = ActionItems.findOne({_id: id});
    return actionItem;
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

Template.completedActionItemTable.helpers({
  classActionItems: function (classType) {
    return ActionItems.find({type:classType,isCompleted:false}, {sort: {createdAt: 1}});
  },
  completedActionItems: function () {
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

Template.classActionItemTable.events({
  /**
   * [description]
   * @param  {[type]} e   [description]
   * @param  {[type]} tpl [description]
   * @return {[type]}     [description]
   */
  "submit .new-task": function(e, tpl){
    e.preventDefault();

    // get the task attributes
    var task = {
      description: tpl.$("#description").val(),
      type: tpl.$("#type").val()
    }

    Meteor.call("addTask", task, function(e, r){
      // TODO: do actual error checking
      console.log(e, r);
    });

    // clear the form
    tpl.reset();
  },

  /**
   * [description]
   * @param  {[type]} e   [description]
   * @param  {[type]} tpl [description]
   * @return {[type]}     [description]
   */
  "click button.system-task": function(e, tpl){
    e.preventDefault();

    // get the task attributes
    var task = {
      description: "System Message",
      type: tpl.$("#type").val()
    }

    Meteor.call("addSystemTask", task, function(e, r){
      // TODO: do actual error checking
      console.log(e, r);
    });
  },

  /**
   * [description]
   * @param  {[type]} e   [description]
   * @param  {[type]} tpl [description]
   * @return {[type]}     [description]
   */
  'click tr.action-item-row': function (e,tpl) {
    // find the id of the selected student
    var id = $(e.target).parent().attr('id');

    // set the session value to that student
    Session.set('selectedActionItem', id);
  },

  /**
   * [description]
   * @param  {[type]} e   [description]
   * @param  {[type]} tpl [description]
   * @return {[type]}     [description]
   */
  'click button.action-item': function (e, tpl) {
    // console.log(this._id);
    Meteor.call("completeTask",this._id);
  }
});

Template.completedActionItemTable.events({
  /**
   * [description]
   * @param  {[type]} e   [description]
   * @param  {[type]} tpl [description]
   * @return {[type]}     [description]
   */
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

  /**
   * [description]
   * @param  {[type]} e   [description]
   * @param  {[type]} tpl [description]
   * @return {[type]}     [description]
   */
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

  },

  /**
   * [description]
   * @param  {[type]} e   [description]
   * @param  {[type]} tpl [description]
   * @return {[type]}     [description]
   */
  'click tr.action-item-row': function (e,tpl) {
    // find the id of the selected student
    var id = $(e.target).parent().attr('id');

    // set the session value to that student
    Session.set('selectedActionItem', id);
  },

  /**
   * [description]
   * @param  {[type]} e   [description]
   * @param  {[type]} tpl [description]
   * @return {[type]}     [description]
   */
  'click button.complete-action-item': function (e, tpl) {
    // console.log(this._id);
    Meteor.call("completeTask",this._id);
  },

  /**
   * [description]
   * @param  {[type]} e   [description]
   * @param  {[type]} tpl [description]
   * @return {[type]}     [description]
   */
  'click button.delete-action-item': function (e, tpl) {
    // console.log(this._id);
    Meteor.call("deleteTask",this._id);
  }
});
