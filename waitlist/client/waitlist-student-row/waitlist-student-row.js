Template.waitlistStudentRow.onCreated(function(){
  Meteor.subscribe("waitlistedStudents");

});

Template.waitlistStudentRow.helpers({

  /**
   *
   * @param {{SimpleSchema.RegEx.Id}} id [id of student to get days of week requested]
   */
  days: function(id){
    var student = Students.findOne({_id:id});
    return student.daysWaitlisted;
  }

});
Template.waitlistStudentRow.events({
  /**
   *
   * @param event
   */
  "click .remove": function(event){
    event.preventDefault();
    Meteor.call('removeStudent', this._id);
  },
  /**
   *
   * @param event
   */
  "click .glyphicon glyphicon-pencil": function(event){
      event.preventDefault();

  }
});