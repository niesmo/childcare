Template.classroomDetail.onCreated(function(){
  Meteor.subscribe("enrolledStudents");
  Meteor.subscribe("waitlistedStudents");
});

Template.classroomDetail.helpers({
  /**
   * All the students in this class
   * @return {Meteor.cursor} cursor to the db
   */
  students: function(){
    return Students.find({$or: [{status:"ENROLLED"}, {status:"PARTIALLY_ENROLLED"}], classId: this._id});
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
  getColorIfHasClass: function(student){
    var today = this.toString().toUpperCase();
    for(var i=0;i<student.daysEnrolled.length;i++){
      if(today === student.daysEnrolled[i].day){
        return student.color || '#43ac6a';
      }
    }

    for(var j=0;j<student.daysWaitlisted.length;j++){
      if(today === student.daysWaitlisted[j].day){
        return "#e74c3c";
      }
    }
  },
  
  /**
   * Number of students enrolled in this class type in this day
   * @param {String} classId The id of the class 
   * @return number of students enrolled in that class in that day
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
   * Function to get and show the students that will be transitioning into a classroom.
   * @returns {*} The students that will be transitioning into the classroom.
   */
  studentsTransitioning: function(){
    var infantMoveAlert = new Date();
    infantMoveAlert.setMonth(infantMoveAlert.getMonth()+2);
    var currentClassroom = Classrooms.findOne(this._id);
    var numToShowFromWaitlist = 3;
    
    if (currentClassroom.type == "INFANT") {
      return Students.find({$or: [{status:"WAITLIST"}, {status:"PARTIALLY_ENROLLED"}], group:"INFANT", order: {$lte: numToShowFromWaitlist}});
    }
    else if (currentClassroom.type == "TODDLER") {
      return Students.find({$or: [{$and: [{group: "INFANT"}, {moveDate: {$lte: infantMoveAlert}}]},
        {$and: [{status: "WAITLIST"}, {group: "TODDLER"}, {order: {$lte: numToShowFromWaitlist}}]},
        {$and: [{status: "PARTIALLY_ENROLLED"}, {group: "TODDLER"}]}]});
    }
  },

  /**
   * Used to fill in the student table cell on the days they have requested class
   * @param student
   * @returns {Schemas.Student.color|{type, label}|color|*|string} the color given to the student
   */
  getColorIfRequestsClass: function(student){
    var today = this.toString().toUpperCase();
    if (student.status === "PARTIALLY_ENROLLED") {
      for(var j=0;j<student.daysWaitlisted.length;j++){
        if(today === student.daysWaitlisted[j].day){
          return student.color || '#43ac6a';
        }
      }
    }
    else {
      for(var i=0;i<student.daysRequested.length;i++){
        if(today === student.daysRequested[i].day){
          return student.color || '#43ac6a';
        }
      }
    }
  }
});

Template.classroomDetail.events({
  /**
   * This function is trigerred to move the enroll the student to class
   * It will open a modal for the user to select the days to be enrolled
   * @param  {Event} event The event triggered
   * @param  {Template} tpl   The template at which this event occurs
   * @return {}
   */
  'click .move-to-class': function(event, tpl){
    event.preventDefault();

    var id = $(event.target).first().closest('tr').attr('student-id');
    if(!id){
      console.warning("No id is set for this row");
      return;
    }
   
    Session.set('studentToEnroll', id);
    Modal.show('enrollStudentModal');
  }
});