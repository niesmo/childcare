Meteor.methods({
  /**
   * [description]
   * @param  {[type]} lname   [description]
   * @param  {[type]} fname   [description]
   * @param  {[type]} email   [description]
   * @param  {[type]} phone   [description]
   * @param  {[type]} address [description]
   * @param  {[type]} id      [description]
   * @return {[type]}         [description]
   */
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