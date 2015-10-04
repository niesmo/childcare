Template.waitlist.onCreated(function(){
    Meteor.subscribe("waitlistedStudents");
});


Template.waitlist.helpers({
  /**
   * Returns all students where status="WAITLIST" and group="INFANT"
   * Ordered by oldest first
   * @returns {*}
   */
  infants: function () {
    return Students.find({status:"WAITLIST", group:"INFANT"},{sort: {createdAt: 1}});
  },
  /**
   * Returns all students where status="WAITLIST" and group="TODDLER"
   * Ordered
   * @returns {*}
   */
  toddlers: function () {
    return Students.find({status:"WAITLIST", group:"TODDLER"},{sort: {createdAt: 1}});
  }
});