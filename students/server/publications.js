Meteor.publish("waitlistedStudents", function(){
  return Students.find({status: 'WAITLIST'});
});

Meteor.publish('enrolledStudents', function(){
  return Students.find({status: "ENROLLED"});
});

Meteor.publish('applicationStudents', function(){
  return Students.find({status: "APPLICATION"});
});