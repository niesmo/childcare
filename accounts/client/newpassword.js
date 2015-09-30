Template.newpassword.events({
    'submit form.newpassword': function(e, tpl){
        // preventing from the form to actually submit (refreshing)
        e.preventDefault();

        // getting the user's input
        var currentPassword = tpl.$('#current-password').val();
        var newPassword = tpl.$('#new-password').val();
        var newPasswordConfirm = tpl.$('#new-password-confirm').val();

        // checking to see if the passwords are the same
        if(newPassword !== newPasswordConfirm){
            // TODO: add actual error handling here
            // do not just alert the error
            alert("Passwords do not match");
            return;
        }

        // call the method to create the user
        Meteor.call("newPassword", currentPassword, newPassword, accountsErrorHandler)
    }
});