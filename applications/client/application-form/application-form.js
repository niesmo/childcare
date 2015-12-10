//removes errors if returning to application page
Template.applicationForm.rendered = function(){
  Errors.remove({type:'validation'});
  Session.set("secondParent", false);
};


Template.applicationForm.events({
  /**
   * Submits form and inserts student and parent information. Will appear on waitlist.
   * @param  {[eventMap]} event [description]
   * @return {[type]}       [description]
   */
  "submit form": function(event){
    event.preventDefault();

    // getting the token from the URL 
    sessionToken = Router.current().params.token;

    Errors.remove({type:'validation'});


    //retrieve data from form
    var formValidated=true;
    var notConceived = $(event.target).find('input:checkbox[name=notConceived]:checked').val();
    var days=[];
    $("input:checkbox[name=days]:checked").each(function(){
      days.push($(this).val());
    });


    var secondParentObj = {
      active: false
    };
    
    if(Session.get("secondParent")){
       secondParentObj = {
        lastName:event.target['second-plname'].value,
        firstName:event.target['second-pfname'].value,
        email:event.target['second-email'].value,
        address: {
          street:event.target['second-street'].value,
          city:event.target['second-city'].value,
          state:event.target['second-state'].value,
          zip:event.target['second-zip'].value,
        },
        phone:event.target['second-phone-number'].value,
        active: true
      };
    }

    var application = {
      // Parent Information
      parent:{
        firstName: event.target.pfname.value,
        lastName: event.target.plname.value,
        address: {
          street: event.target.street.value,
          city: event.target.city.value,
          state: event.target.state.value,
          zip: event.target.zip.value
        },
        phone: event.target['phone-number'].value,
        email: event.target.email.value
      },
      //second aprent information
      secondParent: secondParentObj,
      // Student information 
      student:{
        firstName: event.target.fname.value,
        lastName: event.target.lname.value,
        dob: event.target.dob.value,
        conceived: notConceived,
        dueDate: event.target.dueDate.value
      },

      // Other details of the application
      startDate: event.target.sdate.value,
      days: days,
      type: $(event.target).find('input:radio[name=type]:checked').val(),
      group: $(event.target).find('input:radio[name=group]:checked').val(),
      flexible: $(event.target).find('input:checkbox[name=flexible]:checked').val(),
      details: event.target.details.value,
      sessionToken: sessionToken
    };
    if(!applicationValidate(application)){
      formValidated = false;
    }
    if(!formValidated){
      scroll(0,0);
      return;
    }
    //formats phone number with dashes
    if(application.parent.phone.indexOf('-')===-1 && application.parent.phone.indexOf('.')===-1){
      application.parent.phone = application.parent.phone.substring(0,3) + '-' +application.parent.phone.substring(3,6) + '-' + application.parent.phone.substring(6,10);
    }
    if(Session.get("secondParent")) {
      if(application.secondParent.phone.indexOf('-')===-1 && application.secondParent.phone.indexOf('.')===-1){
        application.secondParent.phone = application.secondParent.phone.substring(0,3) + '-' +application.secondParent.phone.substring(3,6) + '-' + application.secondParent.phone.substring(6,10);
      }
    }
    Errors.remove({});
    Meteor.call("createApplication", application, createApplicationCallback);

    // Clear the form
    scroll(0,0);
    event.target.reset();
	},

  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click #toggle-second-parent":function(event, tpl){
    event.preventDefault();
    // if the second parent div hidden, display it
    if(tpl.$("#second-parent-container").hasClass('hidden')){
      // show the second parent div
      tpl.$("#second-parent-container").removeClass('hidden');

      // set the session for second parent
      Session.set("secondParent", true);

      // change the text in the button to be collapse
      tpl.$("#toggle-second-parent").text('Collapse');
    }

    // if the second parent div is already displayed
    else{
      // hide the second parent div
      tpl.$("#second-parent-container").addClass('hidden');

      // set the session for second parent to be false
      Session.set("secondParent", false);

      // change the text in the button to be add another parent
      tpl.$("#toggle-second-parent").text('Add another Parent');
    }
  },
});

/**
 * This function simply handles the result of the 
 * @param  {[type]} res [description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
function createApplicationCallback(err, res){
  if(err){
    Errors.insert({type:'application', message:'Something went wrong', seen:false});
    // Do some real error checking and let the use know what happned
    console.log(err);
   // alert(err);
  }

  if(res.status === 201){

    Router.go("applications");
  }
  return;
}

