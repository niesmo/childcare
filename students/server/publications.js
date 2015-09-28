Meteor.publish("waitlistedStudents", function(){
  return Students.find({status: 'WAITLIST'});
});