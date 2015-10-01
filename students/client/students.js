/** Subscribe to all the publications when the template is created */
Template.students.onCreated(function(){
  // this.subscribe('enrolledStudents');
  this.subscribe('enrolledStudentsWithParent');
  this.subscribe('classrooms');
});

Template.students.onRendered(function(){
  
  Tracker.autorun(function () {
    // setting the active classes for the tab and the tab content
    this.$('.enrolled-students ul li:first').addClass('active');
    // console.log();
  });

});

Template.students.helpers({
  selectedStudent: function(){
    var id = Session.get('selectedStudentId');
    if(!id) return undefined;

    var student = Students.findOne({_id: id});
    return student;
  },

  /**
   * This helper sends data to the template about all the infants
   * @return {Meteor.cursor} The cursor to the db
   */
  infants: function () {
    return Students.find({group: "INFANT"});
  },


  /**
   * This helper sends data to the template about all the toddlers
   * @return {Meteor.cursor} The cursor to the db
   */
  toddlers: function () {
    return Students.find({group: "TODDLER"});
  },

  /**
   * gets all the classrooms
   * @return {Meteor.cursor} the cursor to the db
   */
  classrooms: function(){
    return Classrooms.find();
  },

  /**
   * This function will get all the students that are in the class with the ID passed
   * @param  {String} classId the ID of the classroom in the DB
   * @return {Meteor.cursor}         The cursor to the DB
   */
  studentInClass: function(classId){
    return Students.find({classId: classId});
  },

  /**
   * ToLowerCase function.
   * @param  {String} str Any string passed
   * @return {String}     Lower case of the passed in string
   */
  toLower: function(str){
    return str.toLowerCase();
  },

  /**
   * this function will determin if for a given index the element should be active or not
   * @param  {Integer}  index the integer passed in to the function (index of an array in this context)
   * @return {String}       Active if index is 0, "" otherwise
   */
  isActive: function(index){
    function isZero(n){return (n===0)?true:false};
    return (isZero(index))?"active":"";
  }
});