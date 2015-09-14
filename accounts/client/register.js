Template.register.events({
  'submit form.register': function(e, tpl){
    // preventing from the form to actually submit (refreshing)
    e.preventDefault();

    // getting the user's input
    var email = tpl.$('#email').val();
    var password = tpl.$('#password').val();
    var passwordConfirm = tpl.$('#password-confirm').val();

    // checking to see if the passwords are the same
    if(password !== passwordConfirm){
      // TODO: add actual error handling here
      // dont just alert the error
      alert("Passwords dont matach");
      return;
    }
    Accounts.createUser({
      email: email,
      password: password
    }, accountsErrorHandler);
  }
});

/**
 * This function will be called when a new user is created
 * if there is any error it will be passed an error, otherwise nothing is passed
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 */
function accountsErrorHandler(error){
  if(error){
    console.log(error);
  }
  else{
    Router.go('home');
  }
}