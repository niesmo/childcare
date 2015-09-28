Meteor.publish("actionItems", function () {
  return ActionItems.find();
});