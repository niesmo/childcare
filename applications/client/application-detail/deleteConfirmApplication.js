Template.deleteConfirmApplication.events({
    "click #delete": function(event) {
        event.preventDefault();
        var sid = Session.get('currentStudent');
        //delete student
        var student_parent = StudentParents.findOne({studentId:sid});

        var parents = Parents.find({_id:student_parent.parentId});
        parents.forEach(function(parent){
            Meteor.call('removeParent', parent._id);
        });

        Meteor.call('removeStudent', sid, student_parent._id);


        //find all parents of the student


        //delete from student, parent and student-parent

    }


});