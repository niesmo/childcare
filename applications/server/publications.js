Meteor.publish('applications', function(token){
    return Applications.find({token: token});
});