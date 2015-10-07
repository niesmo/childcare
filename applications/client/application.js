Template.application.onCreated(function(){
  Meteor.subscribe("applicationStudents");
});

Template.application.helpers({
  /**
   * Returns all students with status equal to Application
   * @returns {*}
   */
  applicant: function () {
    return Students.find({status: "APPLICATION"},{sort: {createdAt: 1}});
  }
});