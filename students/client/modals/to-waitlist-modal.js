Template.toWaitlistModal.onCreated(function(){
  Meteor.subscribe("enrolledStudents");
});

Template.toWaitlistModal.onRendered(function(){
  var studentToWaitlist = Students.findOne({_id:Session.get('studentToWaitlist')});
  if(studentToWaitlist.group == 'INFANT') {
    $("#infantWaitlist").removeClass('hidden');
  }
});


Template.toWaitlistModal.events({
  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click #infantWaitlist": function(event){
    var days = Students.findOne({_id:Session.get('studentToWaitlist')}).daysEnrolled;
    Meteor.call('moveToWaitlist', Session.get('studentToWaitlist'), days, "INFANT", "WAITLIST", moveToWaitlistCallback); 
  },

  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click #toddlerWaitlist": function(event){
    var student = Students.findOne({_id:Session.get('studentToWaitlist')});

    Meteor.call('moveToWaitlist', Session.get('studentToWaitlist'), student.daysEnrolled, "TODDLER", "WAITLIST", moveToWaitlistCallback); 
    if(student.group == 'INFANT'){
      Meteor.call('reOrderAfterDelete', student.order, "INFANT", reOrderAfterDeleteCallback);
    }
  }
});

function moveToWaitlistCallback(err,res){
  if(err){
    Errors.insert({type:'students', message:'Something went wrong while moving the student to waitlist', seen:false});
    // Do some real error checking and let the use know what happned
    console.log(err);
  }

  return;
}

function reOrderAfterDeleteCallback(err, res){
  if(err){
    Errors.insert({type:'students', message:'Something went wrong reordering the waitlist', seen:false});
    // Do some real error checking and let the use know what happned
    console.log(err);
  }

  return;
}