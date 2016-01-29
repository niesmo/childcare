Meteor.methods({
  /**
   * This function will create an application using the given information
   * 1. Create the parent document
   * 2. Create the student document (with status = Application, paid applicationFee = false)
   * 3. Create the studentParents document
   * NOTE: if any of these three went wrong, all others must be reverted
   * 
   * @param  {Object} application All the information submitted from the client
   * @return {}             Result of the operations
   */
  'createApplication': function(application){
    // check to see if they have selected at least one day
    if(application.days.length === 0){
      throw new Meteor.error("No day select",
        "You must select at least one day of the week.");
    }

    // check if the start date is not before today
    /*if(new Date(application.startDate) < new Date()){
      throw new Meteor.error("Start date in the past",
        "You must select a start date in the future");
    }
    */
   
    //checking if not conceived was checked on application
    var notConceived;
    if(application.student.conceived=="NC"){
      notConceived = true;
    }
    else{
      notConceived=false;
    }
    if(!notConceived && application.student.dob == null){
      throw new Meteor.error("Must either have date of birth picked or not yet conceived selected");
    }


    var imageId = Random.id();
    // NOTE: Blocks the Thread
    // insert the parent
    var parentId = Parents.insert({
      firstName: application.parent.firstName,
      lastName: application.parent.lastName,
      address: application.parent.address.street + " " + application.parent.address.city + " " + application.parent.address.state + " " + application.parent.address.zip,
      phoneNumber: application.parent.phone,
      email: application.parent.email,
      image: "http://api.adorable.io/avatars/100/"+ imageId +".png",
      createdAt: new Date()
    });

    // constructing the days for the student document
    var days = [];
    var week = {M: "monday", T: "tuesday", W: "wednesday", TH: "thursday", F: "friday"};
    var flexible = false;
    if(application.flexible=="flexible"){
      flexible=true;
    }
    application.days.forEach(function (day) {
      days.push({
        day: week[day].toUpperCase(),
        flexible: flexible
      });
    });

    imageId = Random.id();

    var moveDate;
    var monthsToMoveDate;
    var dob;
    if (!notConceived) {
      dob = new Date(moment(application.student.dob));
    }
    else {
      dob = new Date(moment(application.student.dueDate));
    }
    var ageInMonths = moment().diff(dob, 'months') || "";
    if (ageInMonths < 16) {
      monthsToMoveDate = Meteor.settings.public.infantTransMonth;
      moveDate = new Date(new Date(dob).setMonth(dob.getMonth()+monthsToMoveDate));
    }
    else {
      monthsToMoveDate = Meteor.settings.public.toddlerTransMonth;
      moveDate = new Date(new Date(dob).setMonth(dob.getMonth()+monthsToMoveDate));
    }

    // insert the student, check if conceived to determine if dob should be inserted
    var studentToBeInserted = {
      firstName: application.student.firstName,
      lastName: application.student.lastName,
      dateOfBirth: dob,
      group: application.group.toUpperCase(),
      status: "application".toUpperCase(),
      paidApplicationFee: false,
      startDate: new Date(moment(application.startDate)),
      moveDate: moveDate,
      daysRequested: days,
      image: "http://api.adorable.io/avatars/100/" + imageId + ".png",
      createdAt: new Date(),
      color: "#3498db",
      details: application.details,
      conceived: notConceived,
      //dueDate: application.student.dueDate
    };

    // if the parents filled this out, set the type from the database
    if(application.sessionToken.toLowerCase() !== 'admin'){
      studentToBeInserted.type = Applications.findOne({token: application.sessionToken}).type;
    }
    else{
      studentToBeInserted.type = application.type.toUpperCase();
    }
    
    var studentId = Students.insert(studentToBeInserted);
    

    // inserting the studentParent document
    var studentParentId = StudentParents.insert({
      studentId: studentId,
      parentId: parentId,
      isPrimary: true,
      createdAt: new Date()
    });

    //check if there is second parent and then add parent
    if(application.secondParent.active){
      var secondParentId = Parents.insert({
        firstName: application.secondParent.firstName,
        lastName: application.secondParent.lastName,
        address: application.secondParent.address.street + " " + application.secondParent.address.city + " " + application.secondParent.address.state + " " + application.secondParent.address.zip,
        phoneNumber: application.secondParent.phone,
        email: application.secondParent.email,
        image: "http://api.adorable.io/avatars/100/"+ imageId +".png",
        createdAt: new Date()
      });
      var studentParentId = StudentParents.insert({
        studentId: studentId,
        parentId: secondParentId,
        isPrimary: true,
        createdAt: new Date()
      });
    }

    // set the application session to complete
    if(application.sessionToken.toLowerCase() !== 'admin'){
      Applications.update({token: application.sessionToken}, {$set: {submittedAt: new Date()}});
    }

    return {
      status: "201",
      studentId: studentId,
      parentId: parentId,
      studentParentId: studentParentId
    };
  },

  /**
   * This function will more an application from the APPLICATION status to a WAITLIST status
   * 1a. change the status
   * 1b. set the daysWaitlisted = daysRequested
   * 1c. set the paidApplicationFee = true
   * 2. set the order according the current list
   * 3. update the orders of the applications affected
   *  
   * @param  {String} studentId Id of the student that is about to be moved from the application to waitlist
   * @return {[type]}         [description]
   */
  'applicationAccepted': function(studentId){
    var student = Students.findOne({_id: studentId});
    
    // find out what the order for this student should be
    var order = 1;
    var lastInGroup = Students.findOne({$or: [{status: "WAITLIST"},{status:"PARTIALLY_ENROLLED"}], group: student.group, type: student.type}, {sort: {order:-1}});
    if(lastInGroup){
      order = lastInGroup.order + 1;
    }
    else {
      // if the student is a Staff and there is no one in the staff sub-section
      if(student.type === "MEMBER"){
        order = 1;
      }
      // if the student is not staff
      else{
        var where = {$or: [{status: "WAITLIST"},{status:"PARTIALLY_ENROLLED"}], group: student.group};
        if(student.type === "EXISTING"){
          where['type'] = "MEMBER";
        }

        var lastOtherGroup = Students.findOne(where, {sort: {order:-1}});
        if(lastOtherGroup){
          order = lastOtherGroup.order + 1;
        }
      }
    }

    // TODO: Change this to a better efficient way
    var toBeIncremented = Students.find({$or: [{status: "WAITLIST"},{status:"PARTIALLY_ENROLLED"}], group: student.group, order: {$gte: order}});
    toBeIncremented.forEach(function (student) {
      Students.update({_id: student._id}, {$inc: {order: 1}});
    });

    // THIS WAS NOT WORKING : IT WAS ONLY UPDATING THE LAST ELEMENT
    // Students.update({status:"WAITLIST", group: student.group, order: {$gte: order}}, {$inc: {order:1}});

    // update the student it self 
    Students.update({_id: studentId}, {$set: {status: "WAITLIST", order: order, daysWaitlisted: student.daysRequested, paidApplicationFee: true, }});
  },

  /**
   * [Insert into parent collection]
   * @param  {{parent object}} parent [object containing all required information of a parent containing variables below]
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
   * [removes parents in object passed]
   * @param  {[collections of parents]} parents [parents to delete]
   * @return {[type]}    [description]
   */
  'removeParent': function (parentId) {
      Parents.remove(parentId);
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
      createdAt: new Date(), // current time
      color: student.color,
    });

    return id;
  },
  
  /**
   * [removes student with passed id]
   * @param  {[SimpleSchema.RegEx.Id]} id [id of student to be removed]
   * @return {[type]}    [description]
   */
  'removeStudent': function (id, spid) {
    Students.remove(id);
    StudentParents.remove(spid);
  },

  /**
   *Increments student order with given id
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
  },

  
  /**
   * This function will send out the application to the email specified in the applicationInfo
   * @param  {Object} applicationInfo This object contains the email and the type of the application
   * @return {[type]}                 Status of the operation
   */
  'createNewApplicationSession': function(applicationInfo){
    // check if the user is logged in
    if(!Meteor.userId()){
      throw new Meteor.error("User Not Authorized", "User is not logged in. Access Denied!!");
    }

    // validate format
    if(!SimpleSchema.RegEx.Email.test(applicationInfo.email)){
      throw new Meteor.error("Wrong Email format", "Email does not have the correct format");
    }


    // valid application type
    if(['regular', 'member', 'existing'].indexOf(applicationInfo.applicationType.toLowerCase()) === -1){
      throw new Meteor.error("Wrong Application Type", "Application type can only be one of 'Current ', 'Member', or 'existing'");
    }

    // Creating the expiration date
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 2);
    expirationDate.setHours(0);
    expirationDate.setMinutes(0);
    expirationDate.setSeconds(1);


    // generate the token for the session
    var token = Random.id();


    // throws an exception when needed
    Applications.insert({
      effectiveDate: new Date(),
      expirationDate: expirationDate,
      sentAt: new Date(),
      sentBy: Meteor.userId(),
      sentTo: applicationInfo.email,
      token: token,
      type: applicationInfo.applicationType.toUpperCase()
    });

    // send an email to the parent
    
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    // process the url and see if it is correct
    // NOTE: THIS IS A BUG WHERE WHEN IN PRODUCTION USED, THERE IS AN 
    // EXTRA TOKEN IN THE URL OF THE APPLICATION ROOT. THIS IS TO FIX
    // THAT AND REMOVE IT WHEN NECESSARY.
    // Example: http://ourladyofbethlehem.org/waitlistapp/waitlistapp/new-application/ebt3q8oS64xAxwupF
    // Expected: http://ourladyofbethlehem.org/waitlistapp/new-application/ebt3q8oS64xAxwupF
    
    // Step 1: get the url
    var emailButtonUrl = Router.routes['applicationForm'].url({token: token});

    // Step 2: Check to see if there is any Application Root at all
    if (Meteor.settings.public.appRootDir && Meteor.settings.public.appRootDir !== ''){
      
      // tokenizing the temp url
      var urlTokens = emailButtonUrl.split('/');

      // checking to see if there is the repeated token
      if (urlTokens.length > 5 && urlTokens[3] == urlTokens[4]){

        // removing the duplicated token
        urlTokens.splice(3,1);

        // putting the string back together for the button link
        emailButtonUrl = urlTokens.join('/');
      }
    } 


    // Sending the actual email    
    PrettyEmail.send('call-to-action', {
      to: applicationInfo.email,
      subject: "Childcare Application",
      heading: 'Childcare Application',
      message: 'We hope you had a good tour at Our Lady of Bethlehem School and Childcare.\nPlease fill out the application in the link below.',
      buttonText: 'Application',
      buttonUrl: emailButtonUrl,
      messageAfterButton: "This application will expire in 2 days",
    });


    return token;
  }
});
