Meteor.methods({
  /**
   * returns array of days that the student is currently enrolled in infant vut not selected to enroll in toddler
   * @param studentId id of student to check
   * @param days array of days enrolled
   * @returns {Array}  array of days that the student is enrolled for but were not selected for enrollment at toddler.
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
  /**
   * moves student to toddler classroom
   * @param id id of student to move
   * @param days days to be enrolled in toddler class
   */
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


      // TODO: Change this to a better efficient way
      var toBeIncremented = Students.find({
        $or: [{status: "WAITLIST"}, {status: "PARTIALLY_ENROLLED"}],
        group: group,
        order: {$gte: order}
      });
      toBeIncremented.forEach(function (student) {
        Students.update({_id: student._id}, {$inc: {order: 1}});
      });
    }
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
        classId: classID,
        group:group
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
  },

  /**
   * This function will remove the information about the application
   * for this student. This includes all the parents, and the student itself.
   * This function also update the order of the waitlist if the removed student
   * was in the waitlist or was partially enrolled
   * 
   * @param  {String} studentId ID of the student that this application is for
   * @return {}
   */
  'deleteStudentAndParents': function(studentId){
    if(!studentId){
      throw new Meteor.error("No student passed",
        "No application is selected to be removed.");      
    }

    // checking type of input
    check(studentId, String);

    // get the student for updating the order
    var tempStudent = Students.findOne(studentId);

    // find all parents of this student 
    var studentParents = StudentParents.find({studentId:studentId});
    var parentIds = studentParents.map(function(v){return v.parentId});
    var studentParentIds = studentParents.map(function(v){return v.studentId});

    // removing all parents
    Parents.remove({_id:{"$in":parentIds}});

    // removing all StudentParents
    StudentParents.remove({_id:{"$in": studentParentIds}});

    // remove the student
    Students.remove(studentId);


    // re order the waitlist to affect the change only if the student was
    // in the waitlist or was partially enrolled
    if(tempStudent.status != "WAITLIST" && tempStudent.status != "PARTIALLY_ENROLLED") return;

    // get all students that are going to be affected
    var studentsToMoveUp = Students.find({
      $or: [{status: "WAITLIST"}, {status: "PARTIALLY_ENROLLED"}],
      order: tempStudent.order,
      group: tempStudent.group
    });

    // update their order to go down (up the list) by one
    studentsToMoveUp.collection().update({}, {$inc: {order: -1}}, {multi: true});
  }
});