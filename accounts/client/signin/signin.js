Template.signin.events({  
  'submit form.signin': function(e, tpl){
    // preventing the form to get submitted
    e.preventDefault();

    var email = tpl.$("#login-email").val();
    var password = tpl.$("#login-password").val();

    // Do some validation
    // TODO: VALIDATE()

    Meteor.loginWithPassword(email, password, loginResponseHandler);

    return;
  }
});

/**
 * This function will handle the response of the login
 * @param  {Object} error Optional argument for when there was an error
 * @return {}
 */
function loginResponseHandler(response){
  if(response){
    switch(response.error){
      case 403:
        userNotFound(response.reason);
        break;
      default:
    }
  }
  else{
    Router.go('actionItems');
  }
}

function userNotFound(reason){
  $("#message").text("").removeClass("hidden").text(reason);
}