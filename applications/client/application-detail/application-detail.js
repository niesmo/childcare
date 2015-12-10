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
});

Template.applicationDetail.events({
  /**
   * [Calls addToWaitlist passing id of current student and adds order]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click button.accept": function(event) {
    event.preventDefault();

    Meteor.call("applicationAccepted", this._id, applicationAcceptedCallback);
  },

  /**
   * [remove student and parent(s) with current id]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click button.decline": function(event) {
    event.preventDefault();
    Session.set('studentToDelete', this._id);
      Modal.show('deleteConfirm');
//    alert("remove under construction");
  }
});


function applicationAcceptedCallback(err, res){
  if(err){
    console.log(err);
    alert("Something went wrong :(");
  }
  console.log(res);
  return;
};