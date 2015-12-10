Template.deletePartiallyEnrolled.onCreated(function(){
  Meteor.subscribe("waitlistedStudents");
});

Template.deletePartiallyEnrolled.events({
  'click #keepEnrolled':function(event){
    event.preventDefault();
    var order = Students.findOne({_id:Session.get('studentId')}).order;
    Meteor.call('fullyEnroll', Session.get('studentId'));
    Meteor.call('reOrderAfterDelete', order);

  },
  'click #fromSystem':function(event){
    event.preventDefault();
    var order = Students.findOne({_id:Session.get('studentId')}).order;
    Meteor.call('removeStudent', Session.get('studentId'));

    Meteor.call('reOrderAfterDelete', order);

  },


});