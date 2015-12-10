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
    Meteor.call('moveToWaitlist', Session.get('studentToWaitlist'), days, "INFANT", "WAITLIST");
  },

  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click #toddlerWaitlist": function(event){
    var days = Students.findOne({_id:Session.get('studentToWaitlist')}).daysEnrolled;
    var group = Students.findOne({_id:Session.get('studentToWaitlist')}).group;
    var order = Students.findOne({_id:Session.get('studentToWaitlist')}).order;
   
    Meteor.call('moveToWaitlist', Session.get('studentToWaitlist'), days, "TODDLER", "WAITLIST");
    if(group=='INFANT'){
      Meteor.call('reOrderAfterDelete', order, "INFANT");
    }
  }
});
