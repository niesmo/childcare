Meteor.methods({
  /**
   * [Insert into parent collection]
   * @param  {{parent object}} parent {object with all t
   * @param  {[type]} lname   [description]
   * @param  {[type]} fname   [description]
   * @param  {[type]} email   [description]
   * @param  {[type]} phone   [description]
   * @param  {[type]} address [description]
   * @return {[SimpleSchema.RegEx.Id]} id  [id of parent inserted]
   */
  'insertParent': function (parent) {

    var id=Parents.insert({
      lastName: parent.plname,
      firstName: parent.fname,
      email: parent.email,
      phoneNumber: parent.phone,
      address: parent.address,
      createdAt: new Date() // current time
    });
    return id;
  },

  /**
   * [description]
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  'removeParent': function (id) {
    Parents.remove(id);
    // code goes here
  },
  /**
   * [description]
   * @param  {[type]} lname   [description]
   * @param  {[type]} fname   [description]
   * @param  {[type]} DOB     [description]
   * @param  {[type]} days    [description]
   * @param  {[type]} details [description]
   * @param  {[type]} status  [description]
   * @param  {[type]} type    [description]
   * @param  {[type]} group   [description]
   * @return {[type]}         [description]
   */
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
  
  /**
   * [description]
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  'removeStudent': function (id) {
    Students.remove(id);
  },

  /**
   * [description]
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  'addToWaitlist': function(id){
    Students.update({_id: id},{$set:{status:"WAITLIST"}});
  }
});