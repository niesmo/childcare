Template.deleteConfirm.onCreated(function(){
  Meteor.subscribe("waitlistedStudentsFullInformation");
  Meteor.subscribe("enrolledStudentsFullInformation");
  Meteor.subscribe("applicationStudentsFullInformation");
});

Template.deleteConfirm.events({
  "click #delete-confirmed": function(event) {
    event.preventDefault();
    var studentId = Session.get('studentToDelete');

    Meteor.call("deleteStudentAndParents", studentId, studentAndParentDeletionCallback);
  }
});

function studentAndParentDeletionCallback(err, res){
  if(err){
    Errors.insert({type:'waitlist', message:'Something went wrong while deleting the student', seen:false});
    // Do some real error checking and let the use know what happned
    console.log(err);
  }

  return;
}

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