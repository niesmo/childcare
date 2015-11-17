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

function applicationSentCompleted(err, result){
  if(err){
    console.log(err);
    return;
  }

  alert("Success");
}