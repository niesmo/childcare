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
  if(secondParentObj.email==""){
    Errors.insert({message:'Please enter second parent email', seen:false,type:'validation'});
    valid=false;
  }
  return valid;
};