Template.deleteApplicationConfirmationModal.events({
  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click #delete-application-confirmed": function(event) {
    event.preventDefault();
    var studentId = Session.get('currentStudent');
    
    Meteor.call('deleteApplication', studentId, applicationDeletionCallback)
  }
});

function applicationDeletionCallback(err, res){
  if (err){
    console.log(err);
    alert("Something went wrong while delete applicaiton. Refresh & try again");
  }

  return;
}