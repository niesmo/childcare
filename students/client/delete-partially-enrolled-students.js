Template.deletePartiallyEnrolledStudents.onCreated(function(){
  Meteor.subscribe("waitlistedStudents");
});

Template.deletePartiallyEnrolledStudents.events({
  'click #keepWaitlisted':function(event){
    event.preventDefault();
    var order = Students.findOne({_id:Session.get('studentId')}).order;
    Meteor.call('fullyWaitlist', Session.get('studentId'));


  },
  'click #entirely':function(event){
    event.preventDefault();
    var order = Students.findOne({_id:Session.get('studentId')}).order;
    Meteor.call('removeStudent', Session.get('studentId'));
    Meteor.call('reOrderAfterDelete', order);

  },


});