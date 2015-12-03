

var checkForStudentsNearTransition= function() {
  currentStudents=Students.find({status:"ENROLLED"});
  //todays date, without the specific time
  currentDate=new Date();
  currentDate.setHours(0,0,0,0);
    //move the month up 2 months to notify 
  currentDate.setMonth(currentDate.getMonth()+2);
  var student;
  while (currentStudents.hasNext()) {
    student=currentStudents.next();
    var transDateMinusTime=student.moveDate;
    //we want to check against the date, we dont care about the time
    transDateMinusTime.setHours(0,0,0,0);
    //compare times, if correct create System Task. Use .valueOf, to avoid data issues
    if(transDateMinusTime.valueOf() ==currentDate.valueOf()){
      task={
        description: student.firstName+" "+student.lastName+" must be transitioned to next class on "+transDateMinusTime,
        type: student.type
      };
      Meteor.call("addSystemTask",task);
      //email staff as well
    }
  }
}

var checkForWaitlistNearDesired= function() {
  waitlistStudents=Students.find({status:"WAITLIST"});
  //todays date, without the specific time
  currentDate=new Date();
  currentDate.setHours(0,0,0,0);
  //move the month up 2 months to notify 
  currentDate.setMonth(currentDate.getMonth()+2);
  var student;
  while(waitlistStudents.hasNext()) {
    student=waitlistStudents.next();
    var transDateMinusTime=student.startDate;
    //we want to check against the date, we dont care about the time
    transDateMinusTime.setHours(0,0,0,0);
    //compare times, if correct create System Task. Use .valueOf, to avoid data issues
    if(transDateMinusTime.valueOf()==currentDate.valueOf()){
      task={
        description: student.firstName+" "+student.lastName+"'s desired start date is upcoming on "+transDateMinusTime,
        type: student.type
      };
      Meteor.call("addSystemTask",task);
      //email staff as well
    }
  }
}

var cron=new Meteor.Cron( {
  events:{
    "1 0 * * *" : checkForStudentsNearTransition,
    "10 0 * * *" : checkForWaitlistNearDesired
  }
});
