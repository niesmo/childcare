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

function enrollCallback(err, res){
  if(err){
    Errors.insert({type:'enroll', message:'Something went wrong', seen:false});
    // Do some real error checking and let the use know what happned
    console.log(err);
    alert(err);
  }

  if(res.status === 201){

    Router.go("applications");
  }
  return;
}
