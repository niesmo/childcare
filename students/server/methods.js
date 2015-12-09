Meteor.methods({
  /**
   *
   * @param studentId id of student to check
   * @param days array of days that the student is enrolled for but were not selected for enrollment at toddler.
   * @returns {Array}
   */
  'compareDaysEnrolled': function(studentId, days){
    var student = Students.findOne({_id:studentId});
    student.color = "#3498db";
    var daysEnr = [];

    var week = {M: "monday", T: "tuesday", W: "wednesday", TH: "thursday", F: "friday"};
    days.forEach(function (day) {
      daysEnr.push({
        day: week[day].toUpperCase(),
        flexible: false
      });
    });
    //compare days waitlisted to days selected to enroll
    //if there are any days waitlisted that are not selected partially enroll
    var daysNotSelected = [];
    var daysEnrolled = student.daysEnrolled;
    var count = 0;
    var checkDay = false;
    while(count < daysEnrolled.length){
      var enrolledCount = 0;
      while(enrolledCount < daysEnr.length){
        if(daysEnrolled[count].day == daysEnr[enrolledCount].day){
          checkDay=true;
          break;
        }
        enrolledCount++;
      }
      if(!checkDay){
        daysNotSelected.push({
          day: daysEnrolled[count].day,
          flexible: daysEnrolled[count].flexible
        })
      }
      checkDay=false;
      count++;
    }
    return daysNotSelected;
  },
  'moveStudent':function(id, days){
    var daysEnr = [];
    var week = {M: "monday", T: "tuesday", W: "wednesday", TH: "thursday", F: "friday"};
    days.daysChecked.forEach(function (day) {
      daysEnr.push({
        day: week[day].toUpperCase(),
        flexible: false
      });
    });
    var classId = Classrooms.findOne({type:"TODDLER"})._id;
    Students.update(id, {
      $set: {
        daysEnrolled: daysEnr,
        group: "TODDLER",
        classId:classId
      }
    });
  },
  /**
   *
   * @param id
   * @param totalDays
   */
  'moveToWaitlist': function(id, totalDays){
    var student = Students.findOne({_id:id});
 /*   var daysToWait = [];
    var week = {M: "monday", T: "tuesday", W: "wednesday", TH: "thursday", F: "friday"};
    totalDays.forEach(function (day) {
      daysToWait.push({
        day: week[day].toUpperCase(),
        flexible: false
      });
    });
    */
    if(student.status =='WAITLIST' || student.status=="PARTIALLY_ENROLLED" ){
      totalDays = totalDays.concat(student.daysWaitlisted);
    }
    Students.update(id, {
      $set: {
        daysWaitlisted: totalDays,
        status: "PARTIALLY_ENROLLED"
      }
    });

  }
});