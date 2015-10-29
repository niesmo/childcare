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
  },
  /**
   *
   * @param waitlist
   * @param parentId
   * @param studentId
   * @returns {{status: string, studentId: *, parentId: *, studentParentId: *}}
   */
  'EditWaitlist': function(waitlist, sId, pId){
    // check to see if they have selected at least one day
    var student = Students.findOne({_id:sId});
    var oldOrder=student.order;
    var newOrder = waitlist.order;
    var students;
    if(newOrder < oldOrder){
      //re order when new order is lower (increment each student order that is greater than or equal to the new order and less than the old order)
      students = Students.find({$and:[{order:{$gte: newOrder}},{order:{$lte: oldOrder}}]});
      students.forEach(function(doc){
        Students.update({_id:doc.id}, {$inc: {order: 1}});
      });
    }
    else if(newOrder > oldOrder){
      //re order when new order is greater (decrement eache student order that is greater than old order and less than new order
        students = Students.find({$and:[{order:{$lte: newOrder}},{order:{$gte: oldOrder}}]});
      students.forEach(function(doc){
        Students.update({_id:doc.id}, {$inc: {order:-1}});
      });
    }
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

    var parentId = Parents.update(pId,{$set: {
      firstName: waitlist.parent.firstName,
      lastName: waitlist.parent.lastName,
      address: waitlist.parent.address,
      phoneNumber: waitlist.parent.phone,
      email: waitlist.parent.email
    }});

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
    var studentId = Students.update(sId,{$set: {
      firstName: waitlist.student.firstName,
      lastName: waitlist.student.lastName,
      dateOfBirth: new Date(waitlist.student.dob),
      group: waitlist.group.toUpperCase(),
      status: "waitlist".toUpperCase(),
      type: waitlist.type.toUpperCase(),
      startDate: waitlist.startDate,
      order: waitlist.order,
      details: waitlist.details,
      daysWaitlisted: days
    }

    });
    var updatedObj = {parentId:parentId, studentId:studentId};
    return updatedObj;
  },

});