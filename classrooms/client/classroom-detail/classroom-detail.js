Template.classroomDetail.helpers({
  /**
   * All the students in this class
   * @return {Meteor.cursor} cursor to the db
   */
  students: function(){
    return Students.find({classId: this._id});
  },
  

  /**
   * This function returns all the days of the week
   * @return {Array} Array containing the days of the week
   */
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
  numOfStudentsPerDay: function(classId){
    var today = this.toString().toUpperCase();
    var numEnrolled=0;
    var studentCursor = Students.find({classId: classId});
    studentCursor.forEach(function(student){
      for(var i=0;i<student.daysEnrolled.length;i++){
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

    // console.log(Classrooms.findOne(this._id));

    return 20;
    //for each type, we need to have a dynamic number that can be accessed
    var currentClass=Session.get("classType");
    var currentClass=Classrooms.findOne({type: currentClass});
    return currentClass.capacity;
  },

  studentsTransitioning: function(){
    var moveDateRange = new Date();
    moveDateRange.setMonth(moveDateRange.getMonth()+2);
    //return Students.find({status: "WAITLIST", group: "INFANT"});
    var currentClassroom = Classrooms.findOne(this._id);
    var numToShowFromWaitlist = 3;
    if (currentClassroom.type == "INFANT") {
      return Students.find({$and: [{status: "WAITLIST"}, {group: "INFANT"}, {order: {$lte: numToShowFromWaitlist}}]});
    }
    else if (currentClassroom.type == "TODDLER") {
      return Students.find({$or: [{$and: [{group: "INFANT"}, {moveDate: {$lte: moveDateRange}}]}, {$and: [{status: "WAITLIST"}, {group: "TODDLER"}, {order: {$lte: numToShowFromWaitlist}}]}]});
    }
    //return Students.find({status: "WAITLIST", group: "INFANT"});
  },

  /**
   * Used to fill in the student table cell on the days they have requested class
   * @param student
   * @returns {Schemas.Student.color|{type, label}|color|*|string} the color given to the student
   */
  getColorIfRequestsClass: function(student){
    var today = this.toString().toUpperCase();
    for(var i=0;i<student.daysRequested.length;i++){
      if(today === student.daysRequested[i].day){
        return student.color || '#43ac6a';
      }
    }
  }
});