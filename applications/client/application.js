Template.application.onCreated(function(){
  Meteor.subscribe("applicationStudents");
});

Template.application.helpers({
  /**
   * Returns all students with status->Application
   * @returns {*}
   */
  applicant: function () {
    // Otherwise, return all of the tasks
    return Students.find({status: "APPLICATION"},{sort: {createdAt: 1}});
  }
});