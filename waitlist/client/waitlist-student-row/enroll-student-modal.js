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

    while(i<student.daysWaitlisted.length) {
      if(day==student.daysWaitlisted[i].day){
        return "checked";
      }
      i++;
    }

    return false;
  },

  isDisabled:function(day) {
    var id=Session.get('studentToEnroll');
    var student = Students.findOne({_id:id});
    var i = 0;

    while(i<student.daysEnrolled.length) {
      if(day==student.daysEnrolled[i].day){
        return "disabled";
      }
      i++;
    }

    return false;
  },

  isReadonly:function(day) {
    var id=Session.get('studentToEnroll');
    var student = Students.findOne({_id:id});
    var i = 0;

    while(i<student.daysEnrolled.length) {
      if(day==student.daysEnrolled[i].day){
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
        Meteor.call('enrollStudent', id, totalDays, 'enroll');
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
    var daysSelected = Session.get('daysSelected');
    var daysNotSelected = Session.get('daysNotSelected');
    var totalDays = {
      daysChecked: daysSelected,
      daysNotChecked: daysNotSelected
    };
    Meteor.call('enrollStudent', id, totalDays, 'partial_enroll');

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
    Meteor.call('enrollStudent', id, totalDays, 'enroll');
  }
});
