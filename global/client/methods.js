/**
 *
 * @param application
 * @returns {boolean}
 */
applicationValidate = function(application){
  var valid = true;
  if(application.days.length<2){
    Errors.insert({message:'Please check at least two days', seen:false, type:'validation'});
    valid = false;
  }
  if(application.type==null && application.student.typeLength){
    Errors.insert({message:'Please select affiliation', seen:false,type:'validation'});
    valid =  false;
  }
  if(application.group==null){
    Errors.insert({message:'Please select group', seen:false,type:'validation'});
    valid = false;
  }
  if(application.parent.firstName==""){
    Errors.insert({message:'Please enter Parent First Name', seen:false,type:'validation'});
    valid = false;
  }
  if(application.parent.lastName==""){
    Errors.insert({message:'Please select Parent Last Name', seen:false,type:'validation'});
    valid = false;
  }
  if(application.student.firstName==""){
    Errors.insert({message:'Please enter student first name', seen:false,type:'validation'});
    valid = false;
  }
  if(application.student.lastName==""){
    Errors.insert({message:'Please enter student last name', seen:false,type:'validation'});
    valid = false;
  }
  if(application.parent.street==""){
    Errors.insert({message:'Please enter street', seen:false,type:'validation'});
    valid = false;
  }
  if(application.parent.city==""){
    Errors.insert({message:'Please enter city', seen:false,type:'validation'});
    valid = false;
  }
  if(application.parent.state==""){
    Errors.insert({message:'Please enter state', seen:false,type:'validation'});
    valid = false;
  }
  if(application.parent.zip==""){
    Errors.insert({message:'Please enter ZIP', seen:false,type:'validation'});
    valid = false;
  }
  if(application.parent.phone==""){
    Errors.insert({message:'Please enter phone number', seen:false,type:'validation'});
    valid = false;
  }
  //check if valid phone number
  if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(application.parent.phone)){
    Errors.insert({message:'Please enter valid phone number in the form of: xxx-xxx-xxxx or xxxxxxxxxx', seen:false,type:'validation'});
    valid = false;
  }
  if(application.parent.email==""){
    Errors.insert({message:'Please enter email', seen:false,type:'validation'});
    valid = false;
  }
  //check if valid email
  if(!/^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(application.parent.email)){
    Errors.insert({message:'Please enter valid email', seen:false,type:'validation'});
    valid = false;
  }
  if(application.student.dob=="" && application.student.conceived!="NC"){
    Errors.insert({message:'Please enter Date Of Birth or select Not Conceived', seen:false,type:'validation'});
    valid = false;
  }
  if(application.student.dueDate=="" && application.student.conceived=="NC"){
    Errors.insert({message:'Please enter estimated due date if not yet conceived checked', seen:false,type:'validation'});
    valid = false;
  }
  if(application.startDate==""){
    Errors.insert({message:'Please enter Start Date', seen:false,type:'validation'});
    valid = false;
  }
  if(application.secondParent.active){
    if(!secondParentValidate(application.secondParent)){
      valid = false;
    }
  }
  return valid;
};




/**
 * [secondParentValidate description]
 * @param  {[type]} secondParentObj [description]
 * @return {[type]}                 [description]
 */
secondParentValidate = function(secondParentObj){
  var valid=true;
  if(secondParentObj.firstName==""){
    Errors.insert({message:'Please enter second parent first name', seen:false,type:'validation'});
    valid=false;
  }
  if(secondParentObj.lastName==""){
    Errors.insert({message:'Please enter second parent last name', seen:false,type:'validation'});
    valid=false;
  }
  if(secondParentObj.address.street==""){
    Errors.insert({message:'Please enter second parent street', seen:false,type:'validation'});
    valid=false;
  }
  if(secondParentObj.address.city==""){
    Errors.insert({message:'Please enter second parent city', seen:false,type:'validation'});
    valid=false;
  }
  if(secondParentObj.address.state==""){
    Errors.insert({message:'Please enter second parent state', seen:false,type:'validation'});
    valid=false;
  }
  if(secondParentObj.address.zip==""){
    Errors.insert({message:'Please enter second parent ZIP', seen:false,type:'validation'});
    valid=false;
  }
  if(secondParentObj.phone==""){
    Errors.insert({message:'Please enter second parent phone number', seen:false,type:'validation'});
    valid=false;
  }
  //check if valid phone number
  if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(secondParentObj.phone)){
    Errors.insert({message:'Please enter valid phone number in the form of: xxx-xxx-xxxx or xxxxxxxxxx', seen:false,type:'validation'});
    valid = false;
  }
  if(secondParentObj.email==""){
    Errors.insert({message:'Please enter second parent email', seen:false,type:'validation'});
    valid=false;
  }
  //check if valid email
  if(!/^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(secondParentObj.email)){
    Errors.insert({message:'Please enter valid email', seen:false,type:'validation'});
    valid = false;
  }
  return valid;
};

/**
 *
 * @param application
 * @returns {boolean}
 */
editValidate = function(application, status){
  var valid = true;
  if(status != 'PARTIALLY_ENROLLED') {
    if (application.days.length < 2) {
      Errors.insert({message: 'Please check at least two days', seen: false, type: 'validation'});
      valid = false;
    }
  }
  else{
    if (application.days.length < 1) {
      Errors.insert({message: 'Please check at least one days', seen: false, type: 'validation'});
      valid = false;
    }
  }
  if(application.type==null && application.student.typeLength){
    Errors.insert({message:'Please select affiliation', seen:false,type:'validation'});
    valid =  false;
  }
  if(application.group==null){
    Errors.insert({message:'Please select group', seen:false,type:'validation'});
    valid = false;
  }
  if(application.parent.firstName==""){
    Errors.insert({message:'Please enter Parent First Name', seen:false,type:'validation'});
    valid = false;
  }
  if(application.parent.lastName==""){
    Errors.insert({message:'Please select Parent Last Name', seen:false,type:'validation'});
    valid = false;
  }
  if(application.student.firstName==""){
    Errors.insert({message:'Please enter student first name', seen:false,type:'validation'});
    valid = false;
  }
  if(application.student.lastName==""){
    Errors.insert({message:'Please enter student last name', seen:false,type:'validation'});
    valid = false;
  }
  if(application.parent.address==""){
    Errors.insert({message:'Please enter address for first Parent', seen:false,type:'validation'});
    valid = false;
  }
  if(application.parent.phone==""){
    Errors.insert({message:'Please enter phone number', seen:false,type:'validation'});
    valid = false;
  }
  //check if valid phone number
  if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(application.parent.phone)){
    Errors.insert({message:'Please enter valid phone number in the form of: xxx-xxx-xxxx or xxxxxxxxxx', seen:false,type:'validation'});
    valid = false;
  }
  if(application.parent.email==""){
    Errors.insert({message:'Please enter email', seen:false,type:'validation'});
    valid = false;
  }
  //check if valid email
  if(!/^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(application.parent.email)){
    Errors.insert({message:'Please enter valid email', seen:false,type:'validation'});
    valid = false;
  }
  if(application.student.dob=="" && application.student.conceived!="NC"){
    Errors.insert({message:'Please enter Date Of Birth or select Not Conceived', seen:false,type:'validation'});
    valid = false;
  }
  if(Session.get('editMode')=='waitlist') {
    if (application.startDate == "") {
      Errors.insert({message: 'Please enter Start Date', seen: false, type: 'validation'});
      valid = false;
    }
  }
  if(application.secondParent.active){
    if(application.secondParent.firstName==""){
      Errors.insert({message:'Please enter second parent first name', seen:false,type:'validation'});
      valid=false;
    }
    if(application.secondParent.lastName==""){
      Errors.insert({message:'Please enter second parent last name', seen:false,type:'validation'});
      valid=false;
    }
    if(application.secondParent.address==""){
      Errors.insert({message:'Please enter second parent street', seen:false,type:'validation'});
      valid=false;
    }
    if(application.secondParent.phone==""){
      Errors.insert({message:'Please enter second parent phone number', seen:false,type:'validation'});
      valid=false;
    }
    //check if valid phone number
    if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(application.secondParent.phone)){
      Errors.insert({message:'Please enter valid phone number in the form of: xxx-xxx-xxxx or xxxxxxxxxx', seen:false,type:'validation'});
      valid = false;
    }
    if(application.secondParent.email==""){
      Errors.insert({message:'Please enter second parent email', seen:false,type:'validation'});
      valid=false;
    }
    //check if valid email
    if(!/^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(application.secondParent.email)){
      Errors.insert({message:'Please enter valid email', seen:false,type:'validation'});
      valid = false;
    }
  }
  return valid;
};
