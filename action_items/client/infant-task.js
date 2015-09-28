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