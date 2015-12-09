Template.applications.onCreated(function(){
  Meteor.subscribe("applicationStudents");
});

Template.applications.helpers({
  /**
   * Returns all students with status equal to Application
   * @returns {*}
   */
  applicants: function () {
    return Students.find({status: "APPLICATION"},{sort: {createdAt: 1}});
  }
});

Template.applications.events({
  'submit #send-new-application': function (event, tpl) {
    // prevent the form from submitting
    event.preventDefault();

    // get the information
    var params = {
      email: tpl.$("#application-email").val(),
      applicationType: tpl.$("#application-type").val()
    };

    // call the service
    Meteor.call("createNewApplication", params, applicationSentCompleted)

  }
});

function applicationSentCompleted(err, applicationToken){
  if(err){
    // TODO: do actual error handling
    alert("Error, something went wrong");
    console.log(err);
    return;
  }

  // show the link that they can access the link in the UI
  $("#application-link").text("The application can be accessed here ");
  var applicationLink = $("<a />")
    .attr("href", Router.routes['applicationForm'].path({token:applicationToken}))
    .text("link");

  $("#application-link").append(applicationLink);
  $("#application-link").removeClass("hidden");

  console.log(applicationToken);
}
