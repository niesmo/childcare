Template.applicationDetail.onCreated(function(){
  Meteor.subscribe("parents");
});

Template.applicationDetail.helpers({
  /**
   * [Returns parent(s) with given id as their studentId]
   * @param  {[SimpleSchema.RegEx.Id]} id [id of current student]
   * @return {[Parent]}    [ returns all parents with studentId=id]
   */
  parent: function(id){

    return Parents.find({studentId:id});
  }
});

Template.applicationDetail.events({
  /**
   * [Calls addToWaitlist passing id of current student]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click button.accept": function(event){
    event.preventDefault();
    Meteor.call('addToWaitlist', this._id);
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