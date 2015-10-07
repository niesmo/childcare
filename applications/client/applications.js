Template.applications.onCreated(function(){
  Meteor.subscribe("applicationStudents");
});

Template.applications.helpers({
  /**
   * Returns all students with status equal to Application
   * @returns {*}
   */
  applicants: function () {
    return Students.find({status: "APPLICATION"},{sort: {createdAt: 1}});
  }
});