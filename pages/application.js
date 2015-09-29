if(Meteor.isClient){
    Meteor.subscribe("applicationStudents");
    Meteor.subscribe("parents");
    Template.application.helpers({
        applicant: function () {

            // Otherwise, return all of the tasks
            return Students.find({status: "APPLICATION"},{sort: {createdAt: 1}});
        }


    });
    Template.applications.helpers({
        parent: function(id){
            return Parents.find({studentId: id});
        }
    });
    Template.applications.events({

        "submit form": function(event) {
            event.preventDefault();
            var action = event.target.value;
            if(action=='add'){
                //accept submit
                Meteor.call('addToWaitlist', this._id);
                alert("hi");
            }
            if(action=='remove'){
                //remove submit
                alert("remove");
            }
        }


    });
}