Template.errors.helpers({
  errors:function(){
   return Errors.find({seen:false,type:'validation'});
  }
});

