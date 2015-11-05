Template.enrollStudent.onCreated(function(){
  Meteor.subscribe("waitlistedStudents");

});
Template.enrollStudent.helpers({
  daysWaitlisted:function(){
    var id = Session.get('studentToEnroll');
    var student = Students.findOne({_id:id});
    return student.daysWaitlisted;
  }

});
Template.enrollStudent.events({
  "click #enroll": function(event) {
    event.preventDefault();

    var id = Session.get('studentToEnroll');
    var days=[];

    $("input:checkbox[name=days]:checked").each(function(){
      days.push($(this).val());
    });

    Meteor.call('enrollStudent', id ,days);
  }
});
