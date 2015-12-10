Template.studentDetail.helpers({
  /**
   * [parents description]
   * @return {[type]} [description]
   */
  parents:function(){
    var studentParents = StudentParents.find({studentId: this._id});
    var parentIds = studentParents.map(function(v){return v.parentId;});
    var parents = Parents.find({_id: {$in: parentIds}});
    return parents;
  },

  /**
   * [studentChosen description]
   * @return {[type]} [description]
   */
  studentChosen:function(){
    if(Session.get('selectedStudentId') != null){
      return true
    }
    else{
      return false;
    }
  },

  /**
   * [isInfant description]
   * @return {Boolean} [description]
   */
  isInfant:function(){
    var student = Students.findOne({_id:this._id});
    if(student.group=='INFANT'){
      return true;
    }
    return false;

  }
});

Template.studentDetail.events({
  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click .remove": function(event){
    event.preventDefault();
    Meteor.call('removeStudent', this._id);
  },

  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click .edit": function(event){
    event.preventDefault();
    Session.set('studentToEdit', Session.get('selectedStudentId'));
    //sets editMode to waitlist to differentiate between waitlist and enrolled student edit
    Session.set('editMode', 'enrolled');
    Modal.show('editStudentModal');

  },

  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click #move":function(event){
    event.preventDefault();
    Session.set('studentToAdvance', this._id);
    Modal.show('toToddlerModal');
  },

});