Meteor.methods({
  registerUser: function (email, password) {
    return Accounts.createUser({
      email: email,
      password: password
    });
  }
});