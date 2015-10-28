Template.profile.helpers({
    userEmail: function () {
        if(Meteor.user())
            return Meteor.user().emails[0].address;
    }
});