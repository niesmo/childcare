Template.toWaitlist.onCreated(function(){
  Meteor.subscribe("enrolledStudents");



});
Template.toWaitlist.events({
  isInfant:function() {
  }
});

Template.toWaitlist.events({

  "click #infantWaitlist": function(event){

    var days = Students.findOne({_id:Session.get('studentToWaitlist')}).daysEnrolled;
    Meteor.call('moveToWaitlist', Session.get('studentToWaitlist'), days, "INFANT", "WAITLIST");
  },
  "click #toddlerWaitlist": function(event){

    var days = Students.findOne({_id:Session.get('studentToWaitlist')}).daysEnrolled;
    Meteor.call('moveToWaitlist', Session.get('studentToWaitlist'), days, "TODDLER", "WAITLIST");
  }
});
