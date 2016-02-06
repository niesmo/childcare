Template.editStudentModal.onCreated(function(){
  Meteor.subscribe("waitlistedStudents");
  Meteor.subscribe("parents");
  Meteor.subscribe("studentParents");
  Errors.remove({type:'validation'});
  Session.set('parentToEdit', $( "#sel1").val());
  $("#dueDate").prop('disabled', true);
  checked = false;
});


Template.editStudentModal.helpers({
  /**
   * [student description]
   * @return {[type]} [description]
   */
  student: function () {
    var id = Session.get('studentToEdit');
    return Students.findOne({_id: id});
  },

  /**
   * [parent1 description]
   * @return {[type]} [description]
   */
  parent1: function () {
    var studentId = Session.get('studentToEdit');
    var studentParent = StudentParents.findOne({studentId: studentId});
    
    if(!studentParent) return;
    var parent = Parents.findOne({_id: studentParent.parentId},{sort: {createdAt: 1}});
    Session.set('parent1Id', parent._id);
    return parent;
  },

  /**
   * [parent2 description]
   * @return {[type]} [description]
   */
  parent2: function () {
    var studentId = Session.get('studentToEdit');
    var studentParents = StudentParents.find({studentId: studentId});
    var parentIds = studentParents.map(function(v){return v.parentId;});

    var parent = Parents.findOne({_id: {$in: parentIds}}, {sort: {createdAt: -1}});
    if(!parent){
      Session.set('parent2Id', "");
      return;
    }

    if(parent._id != Session.get('parent1Id')){
      Session.set('parent2Id', parent._id);
    }
    else{
      Session.set('parent2Id', "");
    }
    return parent;
  },

  /**
   * [daysChecked description]
   * @param  {[type]} day [description]
   * @return {[type]}     [description]
   */
  daysChecked:function(day){

    var id=Session.get('studentToEdit');
    var student = Students.findOne({_id:id});
    var i = 0;
    if(Session.get('editMode')=='waitlist') {
      while (i < student.daysWaitlisted.length) {
        if (day == student.daysWaitlisted[i].day) {
          return "checked";
        }
        i++;
      }
    }
    
    else if(Session.get('editMode')=='enrolled'){
      while (i < student.daysEnrolled.length) {
        if (day == student.daysEnrolled[i].day) {
          return "checked";
        }
        i++;
      }
    }

    return false;
  },

  /**
   * [isMember description]
   * @return {Boolean} [description]
   */
  isMember:function() {
    var id=Session.get('studentToEdit');
    var student = Students.findOne({_id:id});
    if(student.type=='MEMBER'){
      return true;
    }
    return false;
  },

  /**
   * [isExisting description]
   * @return {Boolean} [description]
   */
  isExisting:function(){
    var id=Session.get('studentToEdit');
    var student = Students.findOne({_id:id});
    if(student.type=='EXISTING'){
      return true;
    }
    return false;
  },

  /**
   * [isNew description]
   * @return {Boolean} [description]
   */
  isNew:function(){
    var id=Session.get('studentToEdit');
    var student = Students.findOne({_id:id});
    if(student.type=='REGULAR'){
      return true;
    }
    return false;
  },

  /**
   * [isInfant description]
   * @return {Boolean} [description]
   */
  isInfant:function(){
    var id=Session.get('studentToEdit');
    var student = Students.findOne({_id:id});
    if(student.group=='INFANT'){
      return true;
    }
    return false;
  },

  /**
   * [isToddler description]
   * @return {Boolean} [description]
   */
  isToddler:function(){
    var id=Session.get('studentToEdit');
    var student = Students.findOne({_id:id});
    if(student.group=='TODDLER'){
      return true;
    }
    return false;
  },

  /**
   * [isFlexible description]
   * @return {Boolean} [description]
   */
  isFlexible:function(){
    var id=Session.get('studentToEdit');
    var student = Students.findOne({_id:id});
    if(student.daysWaitlisted[0].flexible){
      return true;
    }
    return false;
  },

  /**
   * [parents description]
   * @return {[type]} [description]
   */
  parents: function () {
    var studentId = Session.get('studentToEdit');
    var studentParents = StudentParents.find({studentId: studentId});
    var parentIds = studentParents.map(function(v){return v.parentId;});
    var parents = Parents.find({_id: {$in: parentIds}}, {sort: {createdAt: 1}});
    return parents;
  },

  /**
   * [fromWaitlist description]
   * @return {[type]} [description]
   */
  fromWaitlist: function(){
    if(Session.get('editMode')=='waitlist'){
      return true;
    }else{
      return false;
    }
  }
});

Template.editStudentModal.events({
  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "submit form":function(event){
    event.preventDefault();

    Errors.remove({type:'validation'});
    //retrieve data from form
    var studentId = Session.get('studentToEdit');
    var studentParent = StudentParents.findOne({studentId: studentId});
    var parent = Parents.findOne({_id: studentParent.parentId});

    //retrieve data from form
    var formValidated=true;
    var days=[];
    $("input:checkbox[name=days]:checked").each(function(){
      days.push($(this).val());
    });

    var secondParentObj = {
      active: false
    };

    if(Session.get("parent2Id") != ""){
      secondParentObj = {
        lastName:event.target['second-plname'].value,
        firstName:event.target['second-pfname'].value,
        email:event.target['second-email'].value,
        address: event.target['second-address'].value,
        phone:event.target['second-phone-number'].value,
        id:Session.get("parent2Id"),
        active: true
      };

    }

    if(Session.get('editMode')=='waitlist') {
      if(Session.get('editMode')=='waitlist') {
        var notConceived = $(event.target).find('input:checkbox[name=notConceived]:checked').val();
      }
      var data = {
        // Parent Information
        parent: {
          firstName: event.target.pfname.value,
          lastName: event.target.plname.value,
          address: event.target.address.value,
          phone: event.target['phone-number'].value,
          email: event.target.email.value,
          id: Session.get('parent1Id')
        },
        secondParent: secondParentObj,
        // Student information
        student: {
          firstName: event.target.fname.value,
          lastName: event.target.lname.value,
          dob: event.target.dob.value,
          conceived: notConceived,
        },

        // Other details of the application
        startDate: event.target.sdate.value,
        days: days,
        type: $(event.target).find('input:radio[name=type]:checked').val(),
        group: $(event.target).find('input:radio[name=group]:checked').val(),
        flexible: $(event.target).find('input:checkbox[name=flexible]:checked').val(),
        details: event.target.details.value,
        moveDate: event.target.moveDate.value,
        status: "",
      };
    }
    else{
      var data = {
        // Parent Information
        parent: {
          firstName: event.target.pfname.value,
          lastName: event.target.plname.value,
          address: event.target.address.value,
          phone: event.target['phone-number'].value,
          email: event.target.email.value,
          id: Session.get('parent1Id')
        },
        secondParent: secondParentObj,
        // Student information
        student: {
          firstName: event.target.fname.value,
          lastName: event.target.lname.value,
          dob: event.target.dob.value,

          // conceived: notConceived,
        },

        // Other details of the application
        // startDate: event.target.sdate.value,
        days: days,
        type: $(event.target).find('input:radio[name=type]:checked').val(),
        group: $(event.target).find('input:radio[name=group]:checked').val(),
        flexible: $(event.target).find('input:checkbox[name=flexible]:checked').val(),
        details: event.target.details.value,
        status: "",
        moveDate: event.target.moveDate.value,
      };
    }

    if(!editValidate(data, Students.findOne({_id:studentId}).status)){
      formValidated = false;
    }
    if(!formValidated){
      scroll(0,0);
      return;
    }

    if(data.details==null){
      data.details="";
    }

    Meteor.call('compareDays', studentId, data.days, function(err,res){

      //if from enrolled, make new waitlisted days the days that are still not selected
      if(Session.get('editMode')=='enrolled'){
        data.waitlistedDays = res;
        if(res.length==0){
          data.status = "ENROLLED";
        }
      }
      Errors.remove({});

      Meteor.call('EditWaitlist', data, studentId, Session.get('editMode'), EditWaitlistCallback);
      Modal.hide('editStudentModal');
    });


    Errors.remove({});
  //  Meteor.call('EditWaitlist', data, studentId, Session.get('editMode'), EditWaitlistCallback);
    Modal.hide('editStudentModal');
  },

  /**
   * [description]
   * @param  {[type]} e   [description]
   * @param  {[type]} tpl [description]
   * @return {[type]}     [description]
   */
  'change #sel1': function(e,tpl){

    if(tpl.$( "#parent1" ).hasClass( "hidden" )){
      Session.set('parentToEdit', 'parent1');
      tpl.$( "#parent1").removeClass('hidden');
      tpl.$( "#parent2").addClass('hidden');
    }
    else{
      Session.set('parentToEdit', 'parent2');
      tpl.$( "#parent2").removeClass('hidden');
      tpl.$( "#parent1").addClass('hidden');
    }
  },

  /**
   * [description]
   * @param  {[type]} e   [description]
   * @param  {[type]} tpl [description]
   * @return {[type]}     [description]
   */
  'change #nc': function(e,tpl){


      $("#dueDate").prop('disabled', checked);
      $("#dob").prop('disabled', !checked);
      checked = !checked;

  },

  /**
   * [description]
   * @param  {[type]} event [description]
   * @param  {[type]} tpl   [description]
   * @return {[type]}       [description]
   */
  'click #show':function(event, tpl){
    event.preventDefault();
    tpl.$("#collapse").removeClass('hidden');
    tpl.$("#parentInfo").removeClass('hidden');
    tpl.$("#show").addClass("hidden");


  },

  /**
   * [description]
   * @param  {[type]} event [description]
   * @param  {[type]} tpl   [description]
   * @return {[type]}       [description]
   */
  'click #collapse':function(event, tpl){
    event.preventDefault();
    tpl.$("#collapse").addClass("hidden");
    tpl.$("#show").removeClass("hidden");
    tpl.$("#parentInfo").addClass("hidden");
  }
});

function EditWaitlistCallback(err, res){
  if(err){
    // Do some real error checking and let the use know what happned
    console.log(err);
    alert("Something went wrong. " + err);
  }

  if(res.status === 201){
    Router.go("waitlist");
  }
  return;
}