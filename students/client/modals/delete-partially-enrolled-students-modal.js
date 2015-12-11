Template.deletePartiallyEnrolledStudentsModal.onCreated(function(){
  Meteor.subscribe("waitlistedStudents");
});

Template.deletePartiallyEnrolledStudentsModal.events({
  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  'click #keepWaitlisted':function(event){
    event.preventDefault();
    var order = Students.findOne({_id:Session.get('studentId')}).order;
    Meteor.call('fullyWaitlist', Session.get('studentId'));
  },

  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  'click #entirely':function(event){
    event.preventDefault();
    var order = Students.findOne({_id:Session.get('studentId')}).order;
    Meteor.call('deleteStudentAndParents', Session.get('studentId')); //callback function exists in delete-confirm.js. Should a new one be created?
    Meteor.call('reOrderAfterDelete', order, Students.findOne({_id:Session.get('studentId')}).group, reOrderAfterDeleteCallback); //callback function exists in delete-confirm.js. Should a new one be created?
  }
});

function removeWaitlistCallback(err,res){
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