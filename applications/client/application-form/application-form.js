//removes errors if returning to application page
Template.applicationForm.rendered = function(){
  Errors.remove({type:'validation'});
};

//detect button click with onClick function rather than event because button was created dynamically with jquery
$(document).on('click', '#collapse', function() {

  $("#secondParentFirstAndLast").remove();
  $("#secondParentContact").remove();
  $("#collapse").replaceWith("<button type=\"button\" class=\"btn btn-primary add\" id=\"addParent\">Add another Parent</button>");
  Session.set("secondParent", false);

});

$(document).on('click', '#addParent', function(){

    $("#endParent").after(secondParent); //secondParent is global variable containing html string for second parent
    $("#addParent").replaceWith("<button type=\"button\" class=\"btn btn-primary\" id=\"collapse\">Collapse</button>");
    Session.set("secondParent", true);

});
Template.applicationForm.events({
  /**
   * Submits form and inserts student and parent information. Will appear on waitlist.
   * @param  {[eventMap]} event [description]
   * @return {[type]}       [description]
   */
  "submit form": function(event){
    event.preventDefault();
    Errors.remove({type:'validation'});
    //retrieve data from form
    var formValidated=true;
    var days=[];
    $("input:checkbox[name=days]:checked").each(function(){
      days.push($(this).val());
    });
    if(days.length<2){
      Errors.insert({message:'Please check at least two days', seen:false, type:'validation'});
      formValidated=false;
    }
    if($(event.target).find('input:radio[name=type]:checked').val()==null){
      Errors.insert({message:'Please select affiliation', seen:false,type:'validation'});
      formValidated=false;

    }
    if($(event.target).find('input:radio[name=group]:checked').val()==null){
      Errors.insert({message:'Please select group', seen:false,type:'validation'});
      formValidated=false;
    }
    if(event.target.pfname.value==""){
      Errors.insert({message:'Please enter Parent First Name', seen:false,type:'validation'});
      formValidated=false;
    }
    if(event.target.plname.value==""){
      Errors.insert({message:'Please select Parent Last Name', seen:false,type:'validation'});
      formValidated=false;
    }
    if(event.target.fname.value==""){
      Errors.insert({message:'Please enter student first name', seen:false,type:'validation'});
      formValidated=false;
    }
    if(event.target.lname.value==""){
      Errors.insert({message:'Please enter student last name', seen:false,type:'validation'});
      formValidated=false;
    }
    if(event.target.street.value==""){
      Errors.insert({message:'Please enter street', seen:false,type:'validation'});
      formValidated=false;
    }
    if(event.target.city.value==""){
      Errors.insert({message:'Please enter city', seen:false,type:'validation'});
      formValidated=false;
    }
    if(event.target.state.value==""){
      Errors.insert({message:'Please enter state', seen:false,type:'validation'});
      formValidated=false;
    }
    if(event.target.zip.value==""){
      Errors.insert({message:'Please enter ZIP', seen:false,type:'validation'});
      formValidated=false;
    }
    if(event.target['phone-number'].value==""){
      Errors.insert({message:'Please enter phone number', seen:false,type:'validation'});
      formValidated=false;
    }
    if(event.target.email.value==""){
      Errors.insert({message:'Please enter email', seen:false,type:'validation'});
      formValidated=false;
    }
    if(event.target.dob.value==""){
      Errors.insert({message:'Please enter Date Of Birth', seen:false,type:'validation'});
      formValidated=false;
    }
    if(event.target.sdate.value==""){
      Errors.insert({message:'Please enter Start Date', seen:false,type:'validation'});
      formValidated=false;
    }
    if(!formValidated){
      scroll(0,0);
      return;
    }

    var secondParent = Session.get('secondParent'); //returns true if second parent input is activated
    var parent2={};

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
      flexible: $(event.target).find('input:checkbox[name=flexible]:checked').val(),
      details: event.target.details.value,
    };

    if(secondParent){
      var parent2 = {firstName: event.target.secondPfname.value,
        lastName: event.target.secondPlname.value,
        email: event.target.secondEmail.value,
        phone: event.target['second-phone-number'].value,
        address: application.parent.address,
        active: true};
    }


    // console.log(application);

    // var studentObj = ({lname:lname,fname:fname,DOB:DOB,group:group, status:"APPLICATION"});
    // var parentObj=({plname:plname,pfname:pfname,address:address,email:email,phone:phone});
    // var detailsObj=({days:days, type:type, details:details,requestedStart:requestedStart,paid:false});
    Errors.remove({});
    Meteor.call("createApplication", application, parent2, createApplicationCallback);

    // Clear the form
    scroll(0,0);
    event.target.reset();
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
    alert(err);
  }

  if(res.status === 201){

    Router.go("applications");
  }
  return;
}