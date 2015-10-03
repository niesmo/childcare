Template.actionItems.onCreated(function(){
  Meteor.subscribe("actionItems");
});

Template.actionItems.helpers({
  infantTasks: function () {
    return ActionItems.find({type:"INFANT"}, {sort: {createdAt: 1}});
  },
  toddlerTasks: function () {
    return ActionItems.find({type:"TODDLER"}, {sort: {createdAt: 1}});
  },
  selectedActionItem: function(){
    var id = Session.get('selectedActionItem');
    if(!id) return undefined;

    var actionItem = ActionItems.findOne({Title: id});
    return actionItem;
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

  "submit .new-infantTask": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a task into the collection
    Meteor.call("addInfantTask",text);

    // Clear form
    event.target.text.value = "";
  },

  "submit .new-toddlerTask": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a task into the collection
    Meteor.call("addToddlerTask",text);

    // Clear form
    event.target.text.value = "";
  },
  'click td.action-item': function (e, tpl) {
    // find the id of the selected student
    var id = e.target.id;

    // set the session value to that student
    Session.set('selectedActionItem', id);
  }
});
