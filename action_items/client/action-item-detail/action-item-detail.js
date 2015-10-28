Template.actionItemDetail.helpers({
  /**
   * [getCreatedByUser description]
   * @param  {[type]} actionItemID [description]
   * @return {[type]}              [description]
   */
  getCreatedByUser: function(){
    if(!this._id) return;

    var actionItem = ActionItems.findOne({_id: this._id});
    var createdByUser= Meteor.users.findOne(actionItem.createdBy);
    var name=createdByUser.profile.firstName+" "+completedByUser.profile.lastName;
      return name;
  },

  getCompletedByUser: function(){
    if(!this._id) return ;

    var actionItem = ActionItems.findOne({_id: this._id});
    var completedByUser= Meteor.users.findOne(actionItem.completedBy);
    if(completedByUser){
      var name=completedByUser.profile.firstName+" "+completedByUser.profile.lastName;
      return name;
    }
  }
});