Meteor.publish('waitlistedStudents', function(){
  return Students.find({$or: [{status:"WAITLIST"}, {status:"PARTIALLY_ENROLLED"}]});
});

Meteor.publishComposite('waitlistedStudentsFullInformation', {
  // must return a cursor
  find: function(){
    return Students.find({$or: [{status:"WAITLIST"}, {status:"PARTIALLY_ENROLLED"}]});
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

Meteor.publish('enrolledStudents', function(){
  return Students.find({$or: [{status:"ENROLLED"}, {status:"PARTIALLY_ENROLLED"}]});
});

Meteor.publishComposite('enrolledStudentsFullInformation', {
  // must return a cursor
  find: function(){
    return Students.find({$or: [{status:"ENROLLED"}, {status:"PARTIALLY_ENROLLED"}]});
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

Meteor.publishComposite('applicationStudentsFullInformation', {
  // must return a cursor
  find: function(){
    return Students.find({status: 'APPLICATION'});
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