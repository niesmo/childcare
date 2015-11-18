Template.enrollStudent.onCreated(function(){
  Meteor.subscribe("waitlistedStudents");

});
Template.enrollStudent.helpers({
  daysWaitlisted:function(){
    var id = Session.get('studentToEnroll');
    var student = Students.findOne({_id:id});
    if(!student) return;
    return student.daysWaitlisted;
  },
  days:function(){
    return Session.get('daysNotSelected');
  },
  dayChecked:function(day){

    var id=Session.get('studentToEnroll');
    var student = Students.findOne({_id:id});
    var i = 0;
    while(i<student.daysWaitlisted.length) {
      if(day==student.daysWaitlisted[i].day){
        return true;
      }
      i++;
    }

    return false;
  }

});
Template.enrollStudent.events({
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
        Modal.hide('enrollStudent');
      }
    });

    },
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
  "click #no":function(event){
    event.preventDefault();
    alert("hello");
    var id = Session.get('studentToEnroll');
    var daysSelected = Session.get('daysSelected');
    var totalDays = {
      daysChecked: daysSelected,
      daysNotChecked: []
    };
    Meteor.call('enrollStudent', id, totalDays, 'enroll');
  }
});
