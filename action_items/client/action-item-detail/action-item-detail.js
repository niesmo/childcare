Template.actionItemDetail.helpers({
  /**
   * [getCreatedByUser description]
   * @param  {[type]} actionItemID [description]
   * @return {[type]}              [description]
   */
  getCreatedByUser: function(actionItemID){
    if(!actionItemID) return undefined;
    var actionItem = ActionItems.findOne({_id: actionItemID});
    var createdByUser= Meteor.users.findOne(actionItem.createdBy);
    if(createdByUser)
      return createdByUser.emails[0].address;
  },
  /**
   * 
   * @param  {[type]} actionItemID [description]
   * @return {[type]}              [description]
   */
  getCompletedByUser: function(actionItemID){
    if(!actionItemID) return undefined;
    var actionItem = ActionItems.findOne({_id: actionItemID});
    var completedByUser= Meteor.users.findOne(actionItem.completedBy);
    if(completedByUser)
      return completedByUser.emails[0].address;
  }
});