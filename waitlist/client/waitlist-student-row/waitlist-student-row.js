Template.waitlistStudentRow.events({
  "click .remove": function(){
    Meteor.call('removeStudent', this._id);
  }
});