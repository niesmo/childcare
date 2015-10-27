Template.deleteuser.events({
    'submit form.deleteuser': function(e, tpl){
        // preventing from the form to actually submit (refreshing)
        e.preventDefault();
        // getting the user's input
        var email = tpl.$('#email').val();
        var emailConfirm = tpl.$('#email-confirm').val();

        // checking to see if the email addresses are the same
        if(email !== emailConfirm){
            // TODO: add actual error handling here
            // do not just alert the error
            alert("Email addresses do not match");
            return;
        }

        // call the method to change the password
        Meteor.call("deleteUser", email, accountsErrorHandler);
        alert("User " + email + " deleted");
        Router.go('home');
    }
});

/**
 * This function will be called when a password is changed
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