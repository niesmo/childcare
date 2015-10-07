Template.applicationForm.events({
  /**
   * Submits form and inserts student and parent information. Will appear on waitlist.
   * @param  {[eventMap]} event [description]
   * @return {[type]}       [description]
   */
  "submit form": function(event){
    event.preventDefault();

    //retrieve data from form
    var days=[];
    $("input:checkbox[name=days]:checked").each(function(){
      days.push($(this).val());
    });

    var application = {
      // Parent Information
      parent:{
        firstName: event.target.pfname.value,
        lastName: event.target.plname.value,
        address: {
          street: event.target.street.value,
          city: event.target.city.value,
          state: event.target.state.value
        },
        phone: event.target['phone-number'].value,
        email: event.target.email.value
      },
      // Student information 
      student:{
        firstName: event.target.fname.value,
        lastName: event.target.lname.value,
        dob: event.target.dob.value,
      },

      // Other details of the application
      startDate: event.target.sdate.value,
      days: days,
      type: $(event.target).find('input:radio[name=type]:checked').val(),
      group: $(event.target).find('input:radio[name=group]:checked').val(),
      details: event.target.details.value
    };


    // console.log(application);

    // var studentObj = ({lname:lname,fname:fname,DOB:DOB,group:group, status:"APPLICATION"});
    // var parentObj=({plname:plname,pfname:pfname,address:address,email:email,phone:phone});
    // var detailsObj=({days:days, type:type, details:details,requestedStart:requestedStart,paid:false});

    Meteor.call("createApplication", application, createApplicationCallback);

    // Clear the form
    event.target.reset();
	}
});

/**
 * This function simply handles the result of the 
 * @param  {[type]} res [description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
function createApplicationCallback(res, err){
  if(err){
    // Do some real error checking and let the use know what happned
    alert("Something went wrong.");
    console.log(err);
  }

  if(res.status === 201){
    Router.go("applications");
  }
  return;
}