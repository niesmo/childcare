Meteor.publish("classrooms", function(){
  return Classrooms.find();
});