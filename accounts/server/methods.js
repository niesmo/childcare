Meteor.methods({
  registerUser: function (email, password) {
    return Accounts.createUser({
      email: email,
      password: password
    });
  },

  newPassword: function (currentPassword, newPassword) {
    return Accounts.changePassword({
      oldPassword: currentPassword,
      newPassword: newPassword
    });
  }
});