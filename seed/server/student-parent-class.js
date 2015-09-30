Meteor.startup(function(){
  // add the classes
  var classroomIds = [];
  var parentCount = 50;

  if(Classrooms.find().count() === 0){
    [
      {
        name: "Infant Classroom",
        type: "INFANT",
        capacity: 20,
        createdAt: new Date()
      },
      {
        name: "Toddler Classroom",
        type: "TODDLER",
        capacity: 15,
        createdAt: new Date()
      }
    ].forEach(function (classroom) {
      classroomIds.push(Classrooms.insert(classroom));
    });
  }

  // add all the parents
  // 
  var studentGroups = ['TODDLER', 'INFANT'];
  var studentStatus = ['WAITLIST', 'APPLICATION', 'ENROLLED'];
  var studentTypes = ['REGULAR', 'MEMBER', 'EXISTING'];
  if(Parents.find().count() === 0){
    for(var i=0;i<parentCount;i++){
      HTTP.get("https://randomuser.me/api/", {headers:{dataType: 'json'}}, function(err, data){
        var person = EJSON.parse(data.content).results[0].user;

        var parent = {
          firstName: person.name.first,
          lastName: person.name.last,
          dateOfBirth: person.dob,
          image: person.picture.medium,
          email: person.email,
          phoneNumber: person.phone,
          isPrimary: true,
          createdAt: new Date()
        };

        var parentId = Parents.insert(parent);

        // create the kids for them
        var studentCount = Math.floor(Math.random()*3)+1;
        for (var j=0;j<studentCount;j++){
          HTTP.get("https://randomuser.me/api/", {headers:{dataType: 'json'}}, function(err, data){
            var newStudent = EJSON.parse(data.content).results[0].user;

            var status = studentStatus[Math.floor(Math.random()*3)];
            var group = studentGroups[Math.floor(Math.random()*2)];
            var student = {
              firstName: newStudent.name.first,
              lastName: newStudent.name.last,
              dateOfBirth: newStudent.dob,
              image: "http://api.adorable.io/avatars/150/" + newStudent.salt,
              group: group,
              status: status,
              type: studentTypes[Math.floor(Math.random()*3)],
              classId: (group == "INFANT")?classroomIds[0]:classroomIds[1],
              paidApplicationFee: (status == "APPLICATION")?false:true,
              createdAt: new Date()
            };

            var studentId = Students.insert(student);

            // connect the student and parent
            StudentParents.insert({
              parentId: parentId,
              studentId: studentId
            });
          })
        }
      });
    }
  }
});