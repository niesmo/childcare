Template.editStudentModal.onCreated(function(){
  Meteor.subscribe("waitlistedStudents");
  Meteor.subscribe("parents");
  Meteor.subscribe("studentParents");

});

Template.editStudentModal.helpers({
  student: function () {
    var id = Session.get('studentToEdit');
    return Students.findOne({_id: id});
  },
  parent: function () {
    var studentId = Session.get('studentToEdit');
    var studentParent = StudentParents.findOne({studentId: studentId});
    var parent = Parents.findOne({_id: studentParent.parentId});

    return Parents.findOne({_id: studentParent.parentId});
  },
  daysChecked:function(day){

    var id=Session.get('studentToEdit');
    var student = Students.findOne({_id:id});
    var i = 0;
    while(i<student.daysWaitlisted.length) {
      if(day==student.daysWaitlisted[i].day){
        return true;
      }
      i++;
    }

    return false;
  },
  isMember:function() {
    var id=Session.get('studentToEdit');
    var student = Students.findOne({_id:id});
    if(student.type=='MEMBER'){
      return true;
    }
    return false;
  },
  isExisting:function(){
    var id=Session.get('studentToEdit');
    var student = Students.findOne({_id:id});
    if(student.type=='EXISTING'){
      return true;
    }
    return false;
  },
  isNew:function(){
    var id=Session.get('studentToEdit');
    var student = Students.findOne({_id:id});
    if(student.type=='REGULAR'){
      return true;
    }
    return false;
  },
  isInfant:function(){
    var id=Session.get('studentToEdit');
    var student = Students.findOne({_id:id});
    if(student.group=='INFANT'){
      return true;
    }
    return false;
  },
  isToddler:function(){
    var id=Session.get('studentToEdit');
    var student = Students.findOne({_id:id});
    if(student.group=='TODDLER'){
      return true;
    }
    return false;
  }
});

Template.editStudentModal.events({
  "submit form":function(event){
    event.preventDefault();
    //retrieve data from form
    var studentId = Session.get('studentToEdit');
    var studentParent = StudentParents.findOne({studentId: studentId});
    var parent = Parents.findOne({_id: studentParent.parentId});
    var days=[];
    $("input:checkbox[name=days]:checked").each(function(){
      days.push($(this).val());
    });

    var waitlist = {
      // Parent Information
      parent:{
        firstName: event.target.pfname.value,
        lastName: event.target.plname.value,
        address: event.target.address.value,
        phone: event.target['phone-number'].value,
        email: event.target.email.value
      },

      // Student information
      student:{
        firstName: event.target.fname.value,
        lastName: event.target.lname.value,
        dob: event.target.dob.value
      },

      // Other details of the application
      startDate: event.target.sdate.value,
      days: days,
      type: $(event.target).find('input:radio[name=type]:checked').val(),
      group: $(event.target).find('input:radio[name=group]:checked').val(),
      flexible: $(event.target).find('input:checkbox[name=flexible]:checked').val(),
      details: event.target.details.value,
      order: event.target.order.value
    };
    if(waitlist.details==null){
      waitlist.details="";
    }
var parentId = parent._id;


  Meteor.call('EditWaitlist', waitlist, studentId, parentId, EditWaitlistCallback);
    // Clear the form
    event.target.reset();
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
