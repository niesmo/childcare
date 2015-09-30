Template.applicationDetail.helpers({
  parent: function(id){
    return Parents.find({studentId: id});
  }
});
Template.applicationDetail.events({
  "submit form": function(event) {
    event.preventDefault();
    var action = event.target.value;
    if(action=='add'){
      //accept submit
      Meteor.call('addToWaitlist', this._id);
    }
    if(action=='remove'){
      //remove submit
      alert("remove under construction");
    }
  }
});