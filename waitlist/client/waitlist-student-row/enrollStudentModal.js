Template.enrollStudent.onCreated(function(){
    Meteor.subscribe("waitlistedStudents");

});
Template.enrollStudent.helpers({
    daysWaitlisted:function(){
        var id = Session.get('studentToEnroll');
        var student = Students.findOne({_id:id});
        return student.daysWaitlisted;
    }

});
Template.enrollStudent.events({
    "click #enroll": function(event) {
        var id = Session.get('studentToEnroll');
        alert("add");
        event.preventDefault();
        var days=[];
        $("input:checkbox[name=days]:checked").each(function(){
            days.push($(this).val());
        });
        alert(days[0]);

        Meteor.call('enrollStudent', id ,days);
        alert("enrolled");

    }


});
