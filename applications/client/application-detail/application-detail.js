Template.applicationDetail.onCreated(function(){
  Meteor.subscribe("parents");
  Meteor.subscribe("studentParents");
  Meteor.subscribe("waitlistedStudents");
});

Template.applicationDetail.helpers({
  /**
   * [Returns parent(s) with given id as their studentId]
   * @param  {[SimpleSchema.RegEx.Id]} id [id of current student]
   * @return {[Parent]}    [ returns all parents with studentId=id]
   */
  parent: function(id){
    var matchedParents = [];
    var parentCount=0;
    var student_parents = StudentParents.find({studentId:id});
    var parents = Parents.find();
    parents.forEach(function(doc){
      student_parents.forEach(function(doc2){
        if(doc._id==doc2.parentId) {
          matchedParents[parentCount] = doc;
          parentCount++;
        }
      });
    });
    return matchedParents;
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