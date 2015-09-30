if(Meteor.isServer) {
    Meteor.methods({
        'insertStudent': function (lname, fname, DOB, days, details, status, type, group) {

            var id =  Students.insert({
                lastName: lname,
                firstName: fname,
                dateOfBirth: DOB,
                DOW_WAITING: days,
                details: details,
                status: status,
                type: type,
                group: group,
                createdAt: new Date() // current time
            });
            return id;
        },
        'removeStudent': function (id) {

            Students.remove(id);
            // code goes here

        },
        'addToWaitlist': function(id){
            Students.update({_id: id},{$set:{status:"WAITLIST"}});
        }


    });

}