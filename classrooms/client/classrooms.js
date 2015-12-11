Template.classrooms.onCreated(function(){
  this.subscribe('classroomsWithStudents', {}, dataReady);
  function dataReady(){
    var id = Classrooms.findOne()._id;
    Session.set("selectedClassroomId", id);
  }
});

Template.classrooms.helpers({
  /**
   * gets all the classrooms
   * @return {Meteor.cursor} the cursor to the db
   */
  classrooms: function(){
    return Classrooms.find();
  },

  /**
   * This function will get all the students that are in the class with the ID passed
   * @param  {String} classId the ID of the classroom in the DB
   * @return {Meteor.cursor}         The cursor to the DB
   */
  studentInClass: function(classId){
    return Students.find({classId: classId, $or: [{status:"ENROLLED"}, {status:"PARTIALLY_ENROLLED"}]});
  },

  /**
   * This function will return all the students in the class of the selected tab
   * @return {Meteor.cursor} cursor to the DB
   */
  studentsInThisClass: function(){
    var id = Session.get("selectedClassroomId");    
    return Students.find({classId: id, $or: [{status:"ENROLLED"}, {status:"PARTIALLY_ENROLLED"}]});
  },


});

Template.classrooms.events({
  'click .classroom-tabs li': function () {
    Session.set("selectedClassroomId",  this._id);
  }
});