Template.waitlist.onCreated(function(){
    Meteor.subscribe("waitlistedStudents");
});


Template.waitlist.helpers({
  infants: function () {
    return Students.find({status:"WAITLIST", group:"INFANT"},{sort: {createdAt: 1}});
  },
  toddlers: function () {
    return Students.find({status:"WAITLIST", group:"TODDLER"},{sort: {createdAt: 1}});
  }
});