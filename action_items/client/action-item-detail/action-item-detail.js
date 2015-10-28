Template.actionItemDetail.helpers({
  /**
   * [getCreatedByUser description]
   * @param  {[type]} actionItemID [description]
   * @return {[type]}              [description]
   */
  getCreatedByUser: function(){
    if(!this._id) return;

    var actionItem = ActionItems.findOne({_id: this._id});
    if(actionItem.isSystemMessage){
      return "SYSTEM";
    }
    var createdByUser= Meteor.users.findOne(actionItem.createdBy);
    var label = "";
    try{
      label = createdByUser.profile.firstName+" "+completedByUser.profile.lastName;
    }
    catch(err){
      label = createdByUser.emails[0].address;
    }
    return label;
  },

  getCompletedByUser: function(){
    if(!this._id) return ;

    var actionItem = ActionItems.findOne({_id: this._id});
    if(actionItem.isSystemMessage){
      return "SYSTEM";
    }
    var completedByUser= Meteor.users.findOne(actionItem.completedBy);
    if(completedByUser){
      var label = "";
      try{
        label = completedByUser.profile.firstName+" "+completedByUser.profile.lastName;
      }
      catch(err){
        label = completedByUser.emails[0].address;
      }
      return label;
    }
  }
});