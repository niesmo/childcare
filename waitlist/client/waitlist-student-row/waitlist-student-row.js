Template.waitlistStudentRow.onCreated(function(){
  Meteor.subscribe("waitlistedStudents");

});

Template.waitlistStudentRow.events({
  /**
   *
   * @param event
   */
  "click .remove": function(event){
    event.preventDefault();
    Meteor.call('removeStudent', this._id);
  },
  /**
   *
   * @param event
   */
  "click .glyphicon glyphicon-pencil": function(event){
      event.preventDefault();
  },

  /**
   * This is the handler for when the user wants to enroll the student to the classroom
   * @param  {Event} e   The triggered event
   * @param  {[type]} tpl The template that the event is triggered on
   * @return {}     
   */
  "click button.enroll": function(e, tpl){
    
    Meteor.call("enrollStudent", this._id, enrollStudentCallback);
  }
});

function enrollStudentCallback(err, res){
  if(err){
    console.log(err);
    alert("Something went wrong");
  }
  return;
}