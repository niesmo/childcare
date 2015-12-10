Template.deleteConfirm.onCreated(function(){
  Meteor.subscribe("waitlistedStudentsFullInformation");
  Meteor.subscribe("enrolledStudentsFullInformation");
  Meteor.subscribe("applicationStudentsFullInformation");

});

Template.deleteConfirm.events({
  "click #delete": function(event) {
    event.preventDefault();
    var sid = Session.get('studentToDelete');
    //delete student

    var student_parent = StudentParents.findOne({studentId:sid});
    var status = Students.findOne({_id:sid}).status;
    var group = Students.findOne({_id:sid}).group;
    var parents = Parents.find({_id:student_parent.parentId});
    parents.forEach(function(parent){
      Meteor.call('removeParent', parent._id);
    });
    var order = Students.findOne({_id:sid}).order;



    Meteor.call('removeStudent', sid, student_parent._id, removeStudentCallback);
    if(status=="WAITLIST" || status=='PARTIALLY_ENROLLED'){
      Meteor.call('reOrderAfterDelete', order, group, reOrderAfterDeleteCallback);
    }


    //find all parents of the student


    //delete from student, parent and student-parent

  }


});

function removeParentCallback(err,res){
  if(err){
    Errors.insert({type:'waitlist', message:'Something went wrong', seen:false});
    // Do some real error checking and let the use know what happned
    console.log(err);
    // alert(err);
  }

  if(res.status === 201){

    Router.go("waitlist");
  }
  return;
}


function removeStudentCallback(err,res){
  if(err){
    Errors.insert({type:'waitlist', message:'Something went wrong', seen:false});
    // Do some real error checking and let the use know what happned
    console.log(err);
    // alert(err);
  }

  if(res.status === 201){

    Router.go("waitlist");
  }
  return;
}

function reOrderAfterDeleteCallback(err,res){
  if(err){
    Errors.insert({type:'waitlist', message:'Something went wrong', seen:false});
    // Do some real error checking and let the use know what happned
    console.log(err);
    // alert(err);
  }

  if(res.status === 201){

    Router.go("waitlist");
  }
  return;
}