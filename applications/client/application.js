Template.application.onCreated(function(){
  Meteor.subscribe("applicationStudents");
});

Template.application.helpers({
  applicant: function () {
    // Otherwise, return all of the tasks
    return Students.find({status: "APPLICATION"},{sort: {createdAt: 1}});
  }
});