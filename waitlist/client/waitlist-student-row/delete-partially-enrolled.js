Template.deletePartiallyEnrolled.onCreated(function(){
  Meteor.subscribe("waitlistedStudents");
});

Template.deletePartiallyEnrolled.events({
  'click #keepEnrolled':function(event){
    event.preventDefault();
    var order = Students.findOne({_id:Session.get('studentId')}).order;
    var group = Students.findOne({_id:Session.get('studentId')}).group;
    Meteor.call('fullyEnroll', Session.get('studentId'));
    Meteor.call('reOrderAfterDelete', order, group);

  },
  'click #fromSystem':function(event){
    event.preventDefault();
    var group = Students.findOne({_id:Session.get('studentId')}).group;
    var order = Students.findOne({_id:Session.get('studentId')}).order;
    Meteor.call('deleteStudentAndParents', Session.get('studentId'));

    Meteor.call('reOrderAfterDelete', order, group);

  },


});