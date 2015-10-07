// Utility functions
function daysComparator(d1, d2){
  var week = {
    monday:0,
    tuesday:1,
    wednesday:2,
    thursday:3,
    friday:4,
    saturday:5,
    sunday:6
  };

  d1 = d1.day.toLowerCase();
  d2 = d2.day.toLowerCase();

  return week[d1] - week[d2];
}

Template.applicationDetail.onCreated(function(){
  Meteor.subscribe("applicationStudentsFullInformation");
});

Template.applicationDetail.helpers({
  /**
   * Returns parent(s) with given id as their studentId
   * @return {[Parent]}    [ returns all parents with studentId=id]
   */
  parents: function(){
    var studentParents = StudentParents.find({studentId: this._id});
    var parentIds = studentParents.map(function(v){return v.parentId;});
    var parents = Parents.find({_id: {$in: parentIds}});
    return parents;
  },

  /**
   * This function sorts the days in the order of the week days
   * @param  {Array} days The days that the applicants has requested
   * @return {Array}      The sorted days in the same format
   */
  sortedDays: function(days){
    return days.sort(daysComparator);
  },

  /**
   * This function will return the appropriate class based on the flexibility of the day
   * @return {String} The appropriate string to be set as the css class
   */
  flexibleColorClass: function(){
    return this.flexible?"list-group-item-success": "list-group-item-warning";
  }
});

Template.applicationDetail.events({
  /**
   * [Calls addToWaitlist passing id of current student and adds order]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click button.accept": function(event) {
    event.preventDefault();
    var order;
    //get type attribute of current student
    var currentStudent = Students.findOne({_id: this._id});
    var group = currentStudent.group;
    var type = currentStudent.type;


    //if member, make order me one higher than highest member order and increment the rest
    if (type == "MEMBER") {
      var topMember = Students.findOne({type: "MEMBER", group: group}, {sort: {order: -1}});
      order = topMember.order + 1;
      if (topMember.order == null) {
        order = 1;
      }
    }
    //if existing, make order be one higher than highest existing order and increment the rest
    if (type == "EXISTING") {
      var topExisting = Students.findOne({$and: [{$or: [{type: "EXISTING"}, {type: "MEMBER"}]}, {group: group}]}, {sort: {order: -1}});
      order = topExisting.order + 1;

      if (topExisting.order == null) {
        order = 1;
      }
    }
    //add to bottom of waitlist
    if (type == "REGULAR") {
      var topRegular = Students.findOne({group: group}, {sort: {order: -1}});
      order = topRegular.order + 1;
      if (topRegular.order == null) {
        order = 1;
      }
    }


    alert(order);
    var id = this._id;
    //get students who should come after (have higher order than) new student on waitlist
    var studentsToInc = Students.find({group: group, status: "WAITLIST", order: {$gte: order}});
    //iterate through each student who's order should be incremented
    studentsToInc.forEach(function (incStudent) {
      Meteor.call('incrementOrder', incStudent._id, function (error) {
        if (error) {
          alert(error.log());
        }

      });
    });
    alert("add");
    Meteor.call('addToWaitlist', id, order);
  },

  /**
   * [remove student and parent(s) with current id]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click button.decline": function(event) {
    event.preventDefault();
    alert("remove under construction");
  }
});