Template.navbar.helpers({
  userEmail: function () {
    if(Meteor.user())
      return Meteor.user().emails[0].address;      
  }
});

Template.navbar.events({
  'click a.logout': function (e) {
    e.preventDefault();
    Meteor.logout();
    Router.go('signin');
  }
});