if(Meteor.isServer) {
    Meteor.methods({
        'insertParent': function (lname, fname, email, phone, address,id) {

            Parents.insert({
                lastName: lname,
                firstName: fname,
                email: email,
                phoneNumber: phone,
                address: address,
                studentId: id,
                createdAt: new Date() // current time
            });
        },
        'removeParent': function (id) {

            Parents.remove(id);
            // code goes here

        }

    });

}