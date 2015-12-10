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
    var order = Students.findOne({_id:this._id}).order;

    if(Students.findOne({_id:this._id}).status=="PARTIALLY_ENROLLED"){
      Session.set('studentId', this._id);
      Modal.show('deletePartiallyEnrolled');
    }
    else{
      Session.set('studentToDelete', this._id);
      Modal.show('deleteConfirm');

    }

  },
  /**
   *
   * @param event
   */
  "click .edit": function(event){
    event.preventDefault();

    Session.set('studentToEdit', this._id);
    //sets editMode to waitlist to differentiate between waitlist and enrolled student edit
    Session.set('editMode', 'waitlist');
    Modal.show('editStudentModal');

  },

  /**
   * This is the handler for when the user wants to enroll the student to the classroom
   * @param  {Event} e   The triggered event
   * @param  {[type]} tpl The template that the event is triggered on
   * @return {}     
   */
  "click button.enroll": function(e, tpl){
    Session.set('studentToEnroll', this._id);
    Modal.show('enrollStudentModal');
  }
});