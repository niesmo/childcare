Meteor.publish('parents', function(){
    return Parents.find();
});

Meteor.publish('studentParents', function(){
    return StudentParents.find();
});