Meteor.publish("classrooms", function(){
  return Classrooms.find({}, {sort: {type:1}});
});

Meteor.publishComposite('classroomsWithStudents', {
  find: function(){
    return Classrooms.find({}, {sort: {type:1}});
  },
  children:[
    {
      find:function(classroom){
        return Students.find({status: "ENROLLED", classId: classroom._id});
      }
    }
  ]
});