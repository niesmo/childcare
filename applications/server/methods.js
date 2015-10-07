Meteor.methods({
  /**
   * [Insert into parent collection]
   * @param  {{parent object}} parent [object containting all required information of a parent containing variables below]
   * @var  {[string]} lname   [Last name of parent]
   * @var  {[string]} fname   [First name of parent]
   * @var  {[string]} email   [email address]
   * @var  {[string]} phone   [phone number]
   * @var  {[string]} address [home address]
   * @return {[SimpleSchema.RegEx.Id]} id  [id of parent inserted]
   */
  'insertParent': function (parent) {

    var id=Parents.insert({
      lastName: parent.plname,
      firstName: parent.pfname,
      email: parent.email,
      phoneNumber: parent.phone,
      address: parent.address,
      createdAt: new Date() // current time
    });
    return id;
  },

  /**
   * [removes parent with id passed]
   * @param  {[SimpleSchema.RegEx.Id]} id [parent id]
   * @return {[type]}    [description]
   */
  'removeParent': function (id) {
    Parents.remove(id);

  },
  /**
   * [insert given data into student collection]
   * @param {{student object}} student [student object containing data for the following object variables]
   * @var  {[string]} lname   [last name of student]
   * @var  {[string]} fname   [first name of student]
   * @var  {[date]} DOB     [student date of birth]
   * @var  {[string]} group   [group the student is in, will be TODDLER or INFANT]
   * @param {{details object}} details [details object containing data for the following object variables]
   * @var  {[string]} status  [status of student, will be APPLICATION, WAITLIST or ENROLLED]
   * @var  {[array of type day (defined in student collection)]} days    [days of the week requested]
   * @var  {[string]} details [any added student details]
   * @param  {[type]} type    [type of student, will be REGULAR, MEMBER or EXISTING]
   *
   * @return {[SimpleSchema.RegEx.Id]} id    [id of student inserted]
   */
  'insertStudent': function (student,details) {

    var id =  Students.insert({
      lastName: student.lname,
      firstName: student.fname,
      dateOfBirth: student.DOB,
      DOW_WAITING: details.days,
      details: details.details,
      status: student.status,
      type: details.type,
      group: student.group,
      paidApplicationFee:details.paid,
      createdAt: new Date() // current time
    });

    return id;
  },
  
  /**
   * [removes student with passed id]
   * @param  {[SimpleSchema.RegEx.Id]} id [id of student to be removed]
   * @return {[type]}    [description]
   */
  'removeStudent': function (id) {
    Students.remove(id);
  },
  /**
   *Increments all student order greater than or equal to order passed
   * @param {{SimpleSchema.RegEx.Id}} id [id of student to increment
   */
  'incrementOrder': function (id) {
    Students.update({_id:id},{$inc:{order:1}});
  },

  /**
   * [description]
   * @param  {[SimpleSchema.RegEx.Id]} id [id of student to be added to waitlist]
   * @return {[type]}    [description]
   */
  'addToWaitlist': function(id, order){
    Students.update({_id: id},{$set:{status:"WAITLIST", order:order}});
  },
  /**
   *[Adds student id and parent id to the studentParent collection]
   * @param  {{SimpleSchema.RegEx.Id}} studentId [id of student associated with parent]
   * @param {{SimpleSchema.RegEx.Id}} parentId  [id of parent associated with student]
   * @returns {{SimpleSchema.RegEx.Id}} id [id of value insterted]
    */
  'insertStudentParent': function(studentId, parentId){
    StudentParents.insert({studentId:studentId, parentId:parentId});
  }
});