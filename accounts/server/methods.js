Meteor.methods({
  registerUser: function (firstName,lastName,email, password) {
    return Accounts.createUser({
      profile: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    });
  },

  // function to change the password
  newPassword: function (currentPassword, newPassword) {
    return Accounts.changePassword(currentPassword, newPassword);
  },

  // function to delete a user
  deleteUser: function (email) {
    var userId = Accounts.findUserByEmail(email);
    return Accounts.setPassword(userId, "KeUkMXELjQ3D")
  }
});