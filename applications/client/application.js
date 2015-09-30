if(Meteor.isClient){
    Meteor.subscribe("applicationStudents");
    Meteor.subscribe("parents");
    Template.application.helpers({
        applicant: function () {

            // Otherwise, return all of the tasks
            return Students.find({status: "APPLICATION"},{sort: {createdAt: 1}});
        }


    });

}