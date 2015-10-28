Template.register.events({
  'submit form.register': function(e, tpl){
    // preventing from the form to actually submit (refreshing)
    e.preventDefault();

    // getting the user's input
    var firstName = tpl.$('#firstName').val();
    var lastName = tpl.$('#lastName').val();
    var email = tpl.$('#email').val();
    var password = tpl.$('#password').val();
    var passwordConfirm = tpl.$('#password-confirm').val();

    // checking to see if the passwords are the same
    if(password !== passwordConfirm){
      // TODO: add actual error handling here
      // do not just alert the error
      alert("Passwords do not match");
      return;
    }

    // call the method to create the user
    Meteor.call("registerUser", firstName, lastName , email, password, accountsErrorHandler);
  }
});


/**
 * This function will be called when a new user is created
 * if there is any error it will be passed an error, otherwise nothing is passed
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 */
function accountsErrorHandler(error, result){
  if(error){
    console.log(error);
  }
  else{
    Router.go('home');
  }
}

