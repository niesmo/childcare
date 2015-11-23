Template.navbar.helpers({
  userEmail: function () {
    if(Meteor.user())
      return Meteor.user().emails[0].address;      
  },

  userName: function() {
    if(Meteor.user())
      return Meteor.user().profile.firstName + " " + Meteor.user().profile.lastName;
  }
});

Template.navbar.events({
  'click a.logout': function (e) {
    e.preventDefault();
    Meteor.logout();
    Router.go('signin');
  },

  'click #newPasswordButton': function(e) {
    Router.go('newpassword')
  },

  'click #addUserButton': function(e) {
    Router.go('register')
  },

  'click #deleteUserButton': function(e) {
    Router.go('deleteuser')
  }
});