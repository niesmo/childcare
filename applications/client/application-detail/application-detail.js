Template.applicationDetail.onCreated(function(){
  Meteor.subscribe("parents");
});

Template.applicationDetail.helpers({
  /**
   * [parent description]
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  parent: function(id){
    return Parents.find({studentId: id});
  }
});

Template.applicationDetail.events({
  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click button.accept": function(event){
    event.preventDefault();
    Meteor.call('addToWaitlist', this._id);
  },

  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "click button.decline": function(event) {
    event.preventDefault();
    alert("remove under construction");
  }
});