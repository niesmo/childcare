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
        return Students.find({$or: [{status:"ENROLLED"}, {status:"PARTIALLY_ENROLLED"}], classId: classroom._id});
      }
    }
  ]
});