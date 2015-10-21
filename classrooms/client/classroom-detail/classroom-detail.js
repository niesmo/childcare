Template.classroomDetail.helpers({
  /**
   * All the students in this class
   * @return {Meteor.cursor} cursor to the db
   */
  students: function(){
    return Students.find({classId: this._id});
  },

  daysOfWeek:function(){
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  },

  /**
   * Used to fill in the student table cell on the days they have class
   * @param student
   * @returns {Schemas.Student.color|{type, label}|color|*|string} the color given to the student
   */
  getColorIfhasClass: function(student){
    var today = this.toString().toUpperCase();
    for(var i=0;i<student.daysEnrolled.length;i++){
      if(today === student.daysEnrolled[i].day){
        return student.color || '#43ac6a';
      }
    }
  }
});