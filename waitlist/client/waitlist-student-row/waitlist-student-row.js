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

  }
});