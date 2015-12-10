Template.toToddler.onCreated(function(){
  Meteor.subscribe("enrolledStudents");

});
Template.toToddler.helpers({
  daysEnrolled:function(){
    var id = Session.get('studentToAdvance');
    var student = Students.findOne({_id:id});
    if(!student) return;
    return student.daysEnrolled;
  },
  days:function(){
    return Session.get('daysNotSelected');
  },
  dayChecked:function(day){

    var id=Session.get('studentToAdvance');
    var student = Students.findOne({_id:id});
    var i = 0;
    while(i<student.daysEnrolled.length) {
      if(day==student.daysEnrolled[i].day){
        return true;
      }
      i++;
    }

    return false;
  }

});
Template.toToddler.events({
  "click #advance": function(event) {
    event.preventDefault();
    var id = Session.get('studentToAdvance');
    var days=[];

    $("input:checkbox[name=days]:checked").each(function(){
      days.push($(this).val());
    });
    Session.set('daysSelected', days);

    var daysNotSelected=[];
    //function returns an array of days that are waitlisted but not selected
    Meteor.call('compareDaysEnrolled', id, days, function(err,res){
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
        Meteor.call('moveStudent', id, totalDays);
        Modal.hide('toToddler');
      }
    });

  },
  "click #yes":function(event){
    event.preventDefault();
    var id = Session.get('studentToAdvance');
    var daysSelected = Session.get('daysSelected');
    var daysNotSelected = Session.get('daysNotSelected');
    var totalDays = {
      daysChecked: daysSelected,
      daysNotChecked: daysNotSelected
    };

    Meteor.call('moveStudent', id, totalDays, function(err,res){
      Meteor.call('moveToWaitlist', id, totalDays.daysNotChecked, "TODDLER", "PARTIALLY_ENROLLED");
    });

  },
  "click #no":function(event){
    event.preventDefault();

    var id = Session.get('studentToAdvance');
    var daysSelected = Session.get('daysSelected');
    var totalDays = {
      daysChecked: daysSelected,
      daysNotChecked: []
    };
    Meteor.call('moveStudent', id, totalDays);
  }
});
