Template.applicationForm.events({
  /**
   * Submits form and inserts student and parent information. Will appear on waitlist.
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  "submit form": function(event){
    event.preventDefault();


    var lname = event.target.lname.value;
    var fname = event.target.fname.value;
    var plname = event.target.plname.value;
    var pfname = event.target.pfname.value;
    var DOB = event.target.DOB.value;
    var address = event.target.street.value;
    address += " " + event.target.city.value;
    address += " " + event.target.state.value;

    var phone = event.target['phone-number'].value;
    var email = event.target.email.value;
    var days="";
    if(event.target.m.checked){
      days=days+"M ";
    }
    if(event.target.t.checked){
      days=days+"T ";
    }
    if(event.target.w.checked){
      days=days+"W ";
    }
    if(event.target.th.checked){
      days=days+"TH ";
    }
    if(event.target.f.checked){
      days=days+"F ";
    }

    var type = $(event.target).find('input:radio[name=type]:checked').val();
    var details = event.target.details.value;
    var group = $(event.target).find('input:radio[name=group]:checked').val();


    //Inserts student, returns student id
    Meteor.call('insertStudent', lname, fname, DOB, days, details, "APPLICATION", type, group, function(error, result){
      if(error){
        // TODO: Do some real error checking
        console.log(error.reason);
        return;
      }
      
      // Use student id to insert into parent, returns parent id
      Meteor.call('insertParent', plname, pfname, email, phone, address, result, function(error, result){
        if(error){
          //error checking
        }
      });
    });

    //clear all html values
    event.target.lname.value = "";
    event.target.fname.value = "";
    event.target.plname.value = "";
    event.target.pfname.value = "";
    event.target.DOB.value = "";
    event.target.details.value = "";
    event.target.email.value = "";
    event.target['phone-number'].value = "";
    event.target.city.value = "";
    event.target.street.value="";
    event.target.state.value = "";
  }
});