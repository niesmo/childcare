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
   * adds student to waitlist
   * @param id student id
   * @param totalDays days to waitlist
   * @param group infant or toddler
   * @param status either waitlist or partially_waitlisted
   */
  'moveToWaitlist': function(id, totalDays, group, status){
    var student = Students.findOne({_id:id});
    var classID = student.classId;
    var order = student.order;
    //if statement to check if student already has appropriate order or if order needt to be calculated
    if(!(student.group == group && student.status=='PARTIALLY_ENROLLED')) {
       order = 1;
      var lastInGroup = Students.findOne({
        $or: [{status: "WAITLIST"}, {status: "PARTIALLY_ENROLLED"}],
        group: group,
        type: student.type
      }, {sort: {order: -1}});
      if (lastInGroup) {
        order = lastInGroup.order + 1;
      }
      else {
        // if the student is a Staff and there is no one in the staff sub-section
        if (student.type === "MEMBER") {
          order = 1;
        }
        // if the student is not staff
        else {
          var where = {$or: [{status: "WAITLIST"}, {status: "PARTIALLY_ENROLLED"}], group: group};
          if (student.type === "EXISTING") {
            where['type'] = "MEMBER";
          }

          var lastOtherGroup = Students.findOne(where, {sort: {order: -1}});
          if (lastOtherGroup) {
            order = lastOtherGroup.order + 1;
          }
        }
      }
    }

    // TODO: Change this to a better efficient way
    var toBeIncremented = Students.find({$or: [{status: "WAITLIST"},{status:"PARTIALLY_ENROLLED"}], group: group, order: {$gte: order}});
    toBeIncremented.forEach(function (student) {
      Students.update({_id: student._id}, {$inc: {order: 1}});
    });

    if(student.status =='WAITLIST' || student.status=="PARTIALLY_ENROLLED" ){
      totalDays = totalDays.concat(student.daysWaitlisted);
    }
    //if moving back to waitlist, make classId null
    if(status=="WAITLIST"){
      classID = null;
    }
    Students.update(id, {
      $set: {
        daysWaitlisted: totalDays,
        status: status,
        order: order,
        classId: classID
      }
    });

  },
  /**
   * Switches student from partially_enrolled to waitslit
   * @param studentId id of student to switch
   */
  'fullyWaitlist':function(studentId){
    Students.update(studentId, {
      $set: {status: "WAITLIST", daysEnrolled:[], classId:null}});
  }
});