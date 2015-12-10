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
    Meteor.call('removeStudent', Session.get('studentId'));
    Meteor.call('reOrderAfterDelete', order, Students.findOne({_id:Session.get('studentId')}).group);
  }
});