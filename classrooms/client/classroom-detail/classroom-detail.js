Template.classroomDetail.helpers({
  /**
   * All the students in this class
   * @return {Meteor.cursor} cursor to the db
   */
  students: function(){
    return Students.find({classId: this._id});
  },

  daysOfWeek:function(){
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  },

  hasClass: function(student){
    var today = this.toString().toUpperCase();
    for(var i=0;i<student.daysEnrolled.length;i++){
      if(today === student.daysEnrolled[i].day){
        return "success";
      }
    }
  }
});