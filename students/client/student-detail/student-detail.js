Template.studentDetail.helpers({
  parents:function(){
    var studentParents = StudentParents.find({studentId: this._id});
    var parentIds = studentParents.map(function(v){return v.parentId;});
    var parents = Parents.find({_id: {$in: parentIds}});
    return parents;
  },
  studentChosen:function(){
    if(Session.get('selectedStudentId') != null){
      return true
    }
    else{
      return false;
    }
  },
  isInfant:function(){
    var student = Students.findOne({_id:this._id});
    if(student.group=='INFANT'){
      return true;
    }
    return false;

  }
});

Template.studentDetail.events({
  "click .remove": function(event){
    event.preventDefault();
    Meteor.call('removeStudent', this._id);
  },
  /**
   *
   * @param event
   */
  "click .edit": function(event){
    event.preventDefault();
    Session.set('studentToEdit', Session.get('selectedStudentId'));
    //sets editMode to waitlist to differentiate between waitlist and enrolled student edit
    Session.set('editMode', 'enrolled');
    Modal.show('editStudentModal');

  },
  "click #move":function(event){
    event.preventDefault();
    Session.set('studentToAdvance', this._id);
    Modal.show('toToddler');
  },

});