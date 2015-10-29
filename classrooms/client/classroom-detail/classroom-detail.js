Template.classroomDetail.onCreated(function(){
  Session.set("classType", "INFANT");
});

Template.classroomDetail.helpers({
  /**
   * All the students in this class
   * @return {Meteor.cursor} cursor to the db
   */
   students: function(){
    return Students.find({classId: this._id});
  },
  
  classType: function(){
    var studentWithCorrectGroupId=Students.findOne({classId: this._id});
    var currentClassType=studentWithCorrectGroupId.group;
    Session.set("classType", currentClassType);
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
  },
  
  /**
  *Number of students enrolled in this class type in this day
  *@return number of students enrolled in that class in that day
  */
  numOfStudentsPerDay: function(){
    var today = this.toString().toUpperCase();
    var numEnrolled=0;
    var currentClass=Session.get("classType");
    var studentCursor = Students.find({group: currentClass});
    var student;
    studentCursor.forEach(function(student) {
      console.log(student.daysEnrolled);
      for(var j=0;j<student.daysEnrolled.length;j++){
        if(today == student.daysEnrolled[i].day){
          numEnrolled++;
        }
      }
    });
    return numEnrolled;
  },

  /**
  *Total number of students allowed to be enrolled in this class type in this day
  *@return number of students enrolled in that class in that day
  */
  totalStudentsAllowed: function(){
    //for each type, we need to have a dynamic number that can be accessed
    var currentClass=Session.get("classType");
    var currentClass=Classrooms.findOne({type: currentClass});
    return currentClass.capacity;
  }
});