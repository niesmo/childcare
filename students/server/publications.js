Meteor.publish('waitlistedStudents', function(){
  return Students.find({status: 'WAITLIST'});
});

Meteor.publish('enrolledStudents', function(){
  return Students.find({status: "ENROLLED"});
});

Meteor.publishComposite('enrolledStudentsFullInformation', {
  // must return a cursor
  find: function(){
    return Students.find({status: 'ENROLLED'});
  },
  children:[
    // The classroom
    {
      find: function(student){
        return Classrooms.find({_id: student.classId});
      }
    },

    // StudentParents
    {
      find: function(student){
        return StudentParents.find({studentId: student._id});
      }
    },

    // The parents
    {
      find: function(student){
        // find the id of all parents
        var studentParents = StudentParents.find({studentId: student._id}).fetch();
        var parentIds = [];
        studentParents.forEach(function (studentParent) {
          parentIds.push(studentParent.parentId);
        });

        // return the cursor to all parents
        return Parents.find({_id: {$in: parentIds}});
      }
    }
  ]
});

Meteor.publish('applicationStudents', function(){
  return Students.find({status: "APPLICATION"});
});