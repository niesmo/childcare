Template.studentDetail.helpers({
  parents:function(){
    var studentParents = StudentParents.find({studentId: this._id});
    var parentIds = studentParents.map(function(v){return v.parentId;});
    var parents = Parents.find({_id: {$in: parentIds}});
    return parents;
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

  }
});