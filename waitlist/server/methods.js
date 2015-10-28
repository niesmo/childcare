Meteor.methods({
  /**
   * This function will simply enroll 
   * @param  {String} studentId The id of the student that is about to be enrolled
   * @return {}
   */
  "enrollStudent": function(studentId, days){
    // get the student with such id
    var student = Students.findOne({_id: studentId});

    // get the class id of the class that student wants to enroll in
    var classroom = Classrooms.findOne({type: student.group});

    // get the count of the student enrolled in this class
    var enrolledCount = Students.find({status: "ENROLLED", classId: classroom._id}).count(); 

    // check the capacity of the room and see if it has room
    if(enrolledCount >= classroom.capacity){
      throw new Meteor.error("Classroom is full",
        "This classroom is already at its capacity");
    }

    // check if this person is requesting any days to be enrolled or not
    if(student.daysWaitlisted.length === 0){
      throw new Meteor.error("No days waitlisted",
        "This student is not waitlisted for any days, so it cannot be enrolled in any class");
    }

    var daysEnr = [];
    var week = {M: "monday", T: "tuesday", W: "wednesday", TH: "thursday", F: "friday"};
    days.forEach(function (day) {
      daysEnr.push({
        day: week[day].toUpperCase(),
        flexible: false
      });
    });
    // enroll the student
    Students.update({_id: studentId}, {$set: {status: "ENROLLED", classId: classroom._id, daysEnrolled: daysEnr}});

    // fix the order of the waitlist
    var toBeUpdated = Students.find({status:"WAITLIST", group:student.group, order: {$gt: student.order}});
    toBeUpdated.forEach(function (student) {
      Students.update({_id: student._id}, {$inc: {order: -1}});
    });
  }
});