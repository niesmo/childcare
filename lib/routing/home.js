ActionItems = new Mongo.Collection("action-items");

Router.route("/",{
  name:"home",
  layoutTemplate: 'layout'
});
 
if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("action-items");
  
  Template.body.helpers({
    infantTasks: function () {
      return ActionItems.find({type:"INFANT"}, {sort: {createdAt: -1}});
    },
	toddlerTasks: function () {
      return ActionItems.find({type:"TODDLER"}, {sort: {createdAt: -1}});
    }
  });
  
  Template.body.events({
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
    }
  });
  
  Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Meteor.call("setChecked", this._id, ! this.checked);
    },
    "click .deleteToddlerTask": function () {
      Meteor.call("deleteToddlerTask", this._id);
    },
	"click .deleteInfantTask": function () {
      Meteor.call("deleteInfantTask", this._id);
    }
  });
  
  }
  
  if (Meteor.isServer) {
    // code to run on server at startup
	Meteor.publish("action-items", function () {
    return ActionItems.find();
  });
}

Meteor.methods({
  addToddlerTask: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    ActionItems.insert({
      text: text,
      createdAt: new Date(),
	  type: "TODDLER",
      createdBy: Meteor.user().username
    });
  },
  deleteToddlerTask: function (taskId) {
    ActionItems.remove(taskId);
  },/*
  setChecked: function (taskId, setChecked) {
    ToddlerTasks.update(taskId, { $set: { checked: setChecked} });
  },*/
  addInfantTask: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    ActionItems.insert({
      text: text,
      createdAt: new Date(),
	  type: "INFANT",
      createdBy: Meteor.user().username
    });
  },
  deleteInfantTask: function (taskId) {
    ActionItems.remove(taskId);
  }
});
