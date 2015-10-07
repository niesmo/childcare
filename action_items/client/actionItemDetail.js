Template.actionItemDetail.helpers({
	getCreatedByUser: function(actionItemID){
    if(!actionItemID) return undefined;
    var actionItem = ActionItems.findOne({_id: actionItemID});
	var createdByUser= Meteor.users.findOne(actionItem.createdBy);
	return createdByUser.emails[0].address;
  },
  getCompletedByUser: function(actionItemID){
    if(!actionItemID) return undefined;
    var actionItem = ActionItems.findOne({_id: actionItemID});
	var completedByUser= Meteor.users.findOne(actionItem.completedBy);
	return completedByUser.emails[0].address;
  }
  });