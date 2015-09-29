Meteor.publish('parents', function () {
    return Parents.find();
});