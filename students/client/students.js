/** Subscribe to all the publications when the template is created */
Template.students.onCreated(function(){
  // this.subscribe('enrolledStudents');
  this.subscribe('enrolledStudentsFullInformation');
  this.subscribe('classrooms');
});


Template.students.helpers({
  selectedStudent: function(){
    var id = Session.get('selectedStudentId');
    if(!id) return undefined;

    var student = Students.findOne({_id: id});
    return student;
  },

  /**
   * gets all the classrooms
   * @return {Meteor.cursor} the cursor to the db
   */
  classrooms: function(){
    return Classrooms.find({}, {sort:{type:1}});
  },

  /**
   * This function will get all the students that are in the class with the ID passed
   * @param  {String} classId the ID of the classroom in the DB
   * @return {Meteor.cursor}         The cursor to the DB
   */
  studentInClass: function(classId){
    return Students.find({classId: classId});
  }
});