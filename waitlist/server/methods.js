Meteor.methods({
  /**
   * This function will simply enroll 
   * @param  {String} studentId The id of the student that is about to be enrolled
   * @param  {object} totalDays object containing the days to enroll and the days to waitlist
   * @param  {String} enrollType 'enroll' if taking off waitlist and 'partial_enroll' if staying on waitlist
   * @return {}
   */
  "enrollStudent": function(studentId, totalDays, enrollType){
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
        "This student is not waitlisted for any days, so they cannot be enrolled in any class");
    }

    var daysEnr = [];
    var week = {M: "monday", T: "tuesday", W: "wednesday", TH: "thursday", F: "friday"};
    totalDays.daysChecked.forEach(function (day) {
      daysEnr.push({
        day: week[day].toUpperCase(),
        flexible: false
      });
    });

    //if student is already partially enrolled, then concat the new days enrolled with days student is already enrolled
    if(student.status=="PARTIALLY_ENROLLED"){
      daysEnr = daysEnr.concat(student.daysEnrolled);
    }
    if(enrollType=='enroll') {

      // enroll the student
      Students.update({_id: studentId}, {$set: {status: "ENROLLED", classId: classroom._id, daysEnrolled: daysEnr}});

      // fix the order of the waitlist
      var toBeUpdated = Students.find({$or: [{status:"WAITLIST"}, {status:"PARTIALLY_ENROLLED"}], group: student.group, order: {$gt: student.order}});
      toBeUpdated.forEach(function (student) {
        Students.update({_id: student._id}, {$inc: {order: -1}});
      });
    }
    //if status id partial_enroll, change status to partially_enrolled, change daysWaitlisted to unchecked days and don't reorder waitlist
    else if(enrollType=='partial_enroll'){
      Students.update({_id: studentId}, {$set: {status: "PARTIALLY_ENROLLED", classId: classroom._id, daysEnrolled: daysEnr, daysWaitlisted: totalDays.daysNotChecked}});
    }
  },
  /**
   *
   * @param waitlist
   * @param parentId
   * @param studentId
   * @returns {{status: string, studentId: *, parentId: *, studentParentId: *}}
   */
  'EditWaitlist': function(waitlist, sId, editMode){

    if(waitlist.days.length === 0){
      throw new Meteor.error("No day select",
          "You must select at least one day of the week.");
    }

    // check if the start date is not before today
 /*   if(new Date(waitlist.startDate) < new Date()){
      throw new Meteor.error("Start date in the past",
          "You must select a start date in the future");
    }

*/
    var status = Students.findOne({_id:sId}).status;
    var parentId = Parents.update(waitlist.parent.id,{$set: {
      firstName: waitlist.parent.firstName,
      lastName: waitlist.parent.lastName,
      address: waitlist.parent.address,
      phoneNumber: waitlist.parent.phone,
      email: waitlist.parent.email
    }});
    if(waitlist.secondParent.active){
      var secondParentId = Parents.update(waitlist.secondParent.id,{$set: {
        firstName: waitlist.secondParent.firstName,
        lastName: waitlist.secondParent.lastName,
        address: waitlist.secondParent.address,
        phoneNumber: waitlist.secondParent.phone,
        email: waitlist.secondParent.email
      }});
    }

    // constructing the days for the student document
    var days = [];
    var week = {M: "monday", T: "tuesday", W: "wednesday", TH: "thursday", F: "friday"};
    var flexible = false;
    if(waitlist.flexible=="flexible"){
      flexible=true;
    }
    waitlist.days.forEach(function (day) {
      days.push({
        day: week[day].toUpperCase(),
        flexible: flexible
      });
    });

    // insert the student
    //if edit from waitlist, change days waitlisted
    if(editMode=='waitlist') {
      var studentId = Students.update(sId, {
        $set: {
          firstName: waitlist.student.firstName,
          lastName: waitlist.student.lastName,
          dateOfBirth: new Date(moment(waitlist.student.dob)),
          group: waitlist.group.toUpperCase(),
          status: status,
          type: waitlist.type.toUpperCase(),
          startDate: new Date(moment(waitlist.startDate)),
          order: waitlist.order,
          details: waitlist.details,
          daysWaitlisted: days,
          moveDate: new Date(moment(waitlist.moveDate)),
        }
      });
    }else if(editMode=='enrolled'){
      var studentId = Students.update(sId, {
        $set: {
          firstName: waitlist.student.firstName,
          lastName: waitlist.student.lastName,
          dateOfBirth: new Date(moment(waitlist.student.dob)),
          group: waitlist.group.toUpperCase(),
          status: status,
          type: waitlist.type.toUpperCase(),
          order: waitlist.order,
          details: waitlist.details,
          daysEnrolled: days,
          moveDate:new Date(moment(waitlist.moveDate)),
        }
      });
    }
    var updatedObj = {parentId:parentId, studentId:studentId};
    return updatedObj;
  },
  /**
   *
   * @param studentId id of student to check
   * @param days array of days that the student is waitlisted for but were not selected for enrollment.
   * @returns {Array}
   */
  'compareDays': function(studentId, days){
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
    var daysWaiting = student.daysWaitlisted;
    var count = 0;
    var checkDay = false;
    while(count < daysWaiting.length){
      var waitlistCount = 0;
      while(waitlistCount < daysEnr.length){
        if(daysWaiting[count].day == daysEnr[waitlistCount].day){
          checkDay=true;
          break;
        }
        waitlistCount++;
      }
      if(!checkDay){
        daysNotSelected.push({
          day: daysWaiting[count].day,
          flexible: daysWaiting[count].flexible
        })
      }
      checkDay=false;
      count++;
    }
    return daysNotSelected;
  },

  /**
   *
   * @param studentId
   * @param newOrder
   * @param currentOrder
   */
  'reOrderWaitlist':function(studentId, newOrder, currentOrder){

    var studentMoved = Students.findOne({_id:studentId});
    var toBeUpdated;
    //case if moved higher in waitlist
    if(newOrder > currentOrder){
      //decrement student order for students whose order is less than or equal to the students new order AND greater than students current order
     
       toBeUpdated = Students.find({$or: [{status:"WAITLIST"}, {status:"PARTIALLY_ENROLLED"}], group:studentMoved.group, $and: [{order: {$lte: newOrder}},{order: {$gt: currentOrder}}]});
      toBeUpdated.forEach(function (student) {
        Students.update({_id: student._id}, {$inc: {order: -1}});
      });

    }
    //case if moved lower on waitlist
    else if(newOrder < currentOrder){

      //increment student order for students whose order is greater than or equal to students new order and less than students current order
       toBeUpdated = Students.find({$or: [{status:"WAITLIST"}, {status:"PARTIALLY_ENROLLED"}], group:studentMoved.group, $and: [{order: {$gte: newOrder}},{order: {$lt: currentOrder}}]});
      toBeUpdated.forEach(function (student) {
        Students.update({_id: student._id}, {$inc: {order: 1}});
      });
    }
    Students.update(studentId, {
      $set: {order: newOrder}});


  },
  'reOrderAfterDelete':function(order) {
  
    var students = Students.find({
      $or: [{status: "WAITLIST"}, {status: "PARTIALLY_ENROLLED"}],
      order: {$gt: order}
    });
    students.forEach(function (student) {
      Students.update({_id: student._id}, {$inc: {order: -1}});
    });
  }
});