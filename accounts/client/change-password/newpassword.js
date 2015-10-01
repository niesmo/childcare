Template.newpassword.events({
    'submit form.newpassword': function(e, tpl){
        // preventing from the form to actually submit (refreshing)
        e.preventDefault();
        // getting the user's input
        var currentPassword = tpl.$('#current-password').val();
        var newPassword = tpl.$('#new-password').val();
        var newPasswordConfirm = tpl.$('#new-password-confirm').val();

        if(currentPassword !== "test"){
            // TODO: add actual error handling here
            // do not just alert the error
            alert("Incorrect password");
            return;
        }
        // checking to see if the passwords are the same

        if(newPassword !== newPasswordConfirm){
            // TODO: add actual error handling here
            // do not just alert the error
            alert("Passwords do not match");
            return;
        }

        // call the method to change the password
        Meteor.call("newPassword", currentPassword, newPassword, accountsErrorHandler);
        alert("Password Changed");
        Router.go('profile');
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