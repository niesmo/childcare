Template.enrollStudentModal.onCreated(function(){
  Meteor.subscribe("waitlistedStudents");

});
Template.enrollStudentModal.helpers({
  /**
   * [daysWaitlisted description]
   * @return {[type]} [description]
   */
  daysWaitlisted:function(){
    var id = Session.get('studentToEnroll');
    var student = Students.findOne({_id:id});
    if(!student) return;
    return student.daysWaitlisted;
  },

  /**
   * [days description]
   * @return {[type]} [description]
   */
  days:function(){
    return Session.get('daysNotSelected');
  },

  /**
   * [dayChecked description]
   * @param  {[type]} day [description]
   * @return {[type]}     [description]
   */
  dayChecked:function(day){
    var id=Session.get('studentToEnroll');
    var student = Students.findOne({_id:id});
    var i = 0;

    if(!student.daysWaitlisted) return false;

    while(i<student.daysWaitlisted.length) {
      if(day==student.daysWaitlisted[i].day){
        return "checked";
      }
      i++;
    }

    return false;
  },

  /**
   * Disables the checkbox for a day that a student is already enrolled for.
   * @param day
   * @returns {string} disabled
   */
  isDisabled:function(day) {
    var id=Session.get('studentToEnroll');
    var student = Students.findOne({_id:id});
    var i = 0;

    if(!student.daysEnrolled) return false;

    while(i<student.daysEnrolled.length) {
      if(day==student.daysEnrolled[i].day && student.status == "PARTIALLY_ENROLLED"){
        return "disabled";
      }
      i++;
    }

    return false;
  },

  /**
   * Sets the checkbox to readonly for a day that a student is already enrolled for.
   * @param day
   * @returns {string} readonly
   */
  isReadonly:function(day) {
    var id=Session.get('studentToEnroll');
    var student = Students.findOne({_id:id});
    var i = 0;

    if(!student.daysEnrolled) return false;

    while(i<student.daysEnrolled.length) {
      if(day==student.daysEnrolled[i].day && student.status == "PARTIALLY_ENROLLED"){
        return "readonly";
      }
      i++;
    }

    return false;
  }

});
Template.enrollStudentModal.events({

  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click #enroll": function(event) {
    event.preventDefault();
    var id = Session.get('studentToEnroll');
    var student = Students.findOne({_id:id});
    var days=[];

    $("input:checkbox[name=days]:checked").each(function(){
      days.push($(this).val());
    });
    Session.set('daysSelected', days);

    var daysNotSelected=[];
    //function returns an array of days that are waitlisted but not selected
    Meteor.call('compareDays', id, days, function(err,res){
      if(res.length > 0){
        //sets daysNotSelected session to the return value of compareDays
        Session.set('daysNotSelected',res);
        //shows and hides css classes
        $(".hidden").removeClass('hidden');
        $(".toHide").addClass('hidden');

      }
      else {
        //created object of days to enroll and days to waitlist, in this case the days to waitlist will be empty
        var totalDays = {
          daysChecked: days,
          daysNotChecked: []
        };
        if (student.group == "INFANT" && student.status == "ENROLLED") {
          var classId = Classrooms.findOne({type:"TODDLER"})._id;
          Students.update(id, {
            $set: {
              group: "TODDLER",
              classId:classId
            }
          })
        }
        Meteor.call('enrollStudent', id, totalDays, 'enroll', enrollStudentCallback);
        Modal.hide('enrollStudentModal');
      }
    });

  },

  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click #yes":function(event){
    event.preventDefault();
    var id = Session.get('studentToEnroll');
    var student = Students.findOne({_id:id});
    var daysSelected = Session.get('daysSelected');
    var daysNotSelected = Session.get('daysNotSelected');
    var totalDays = {
      daysChecked: daysSelected,
      daysNotChecked: daysNotSelected
    };
    Meteor.call('enrollStudent', id, totalDays, 'partial_enroll', enrollStudentCallback);

  },

  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click #no":function(event){
    event.preventDefault();

    var id = Session.get('studentToEnroll');
    var daysSelected = Session.get('daysSelected');
    var totalDays = {
      daysChecked: daysSelected,
      daysNotChecked: []
    };
    Meteor.call('enrollStudent', id, totalDays, 'enroll', enrollStudentCallback);
  }
});

function enrollStudentCallback(err,res){
  if(err){
    Errors.insert({type:'waitlist', message:'Something went wrong', seen:false});
    // Do some real error checking and let the use know what happned
    console.log(err);

    alert(err.reason);
  }

  return;
}
