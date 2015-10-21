Template.waitlist.onCreated(function(){
  Meteor.subscribe("waitlistedStudents");
  Meteor.subscribe("classrooms");
});


Template.waitlist.helpers({
  /**
   * Returns all students where status="WAITLIST" and group="INFANT"
   * Ordered by oldest first
   * @returns {*}
   */
  students: function(){
    return Students.find({group: this.type, status:"WAITLIST"}, {sort:{order:1}});
  },

  waitlist: function(){
    return Classrooms.find();
  }
});