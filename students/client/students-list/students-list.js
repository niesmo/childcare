Template.studentsList.helpers({
  log: function () {
    console.log(this);
  },
  
  /** this function returns the context that was passed to this template */
  students:function(){
    return this;
  }
});