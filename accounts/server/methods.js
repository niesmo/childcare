Meteor.methods({
  registerUser: function (email, password) {
    return Accounts.createUser({
      email: email,
      password: password
    });
  },

  // function to change the password
  newPassword: function (currentPassword, newPassword) {
    return Meteor.user().setPassword(Meteor.userId(), newPassword);
    //return Meteor.user().changePassword(currentPassword, newPassword);
    //return Meteor.users[0].changePassword(currentPassword, newPassword);
    //return Accounts.changePassword(currentPassword, newPassword);
  },

  // function to delete a user
  deleteUser: function (user, confirmUser) {
    // TODO: add code to delete user
  }
});