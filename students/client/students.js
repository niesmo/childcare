/** Subscribe to all the publications when the template is created */
Template.students.onCreated(function(){
  this.subscribe('enrolledStudents');
});

Template.students.helpers({
  /**
   * This helper sends data to the template about all the infants
   * @return {Meteor.cursor} The cursor to the db
   */
  infants: function () {
    return Students.find({group: "INFANT"});
  },


  /**
   * This helper sends data to the template about all the toddlers
   * @return {Meteor.cursor} The cursor to the db
   */
  toddlers: function () {
    return Students.find({group: "TODDLER"});
  },
});