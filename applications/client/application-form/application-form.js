Template.applicationForm.events({
  "submit form": function(event){
    event.preventDefault();

    var lname = event.target.lname.value;
    var fname = event.target.fname.value;
    var plname = event.target.plname.value;
    var pfname = event.target.pfname.value;
    var DOB = event.target.DOB.value;
    var address = event.target.address.value;
    var phone = event.target.phoneNumber.value;
    var email = event.target.email.value;

    var days="";
    if(event.target.M.checked){
      days=days+"M ";
    }
    if(event.target.T.checked){
      days=days+"T ";
    }
    if(event.target.W.checked){
      days=days+"W ";
    }
    if(event.target.TH.checked){
      days=days+"TH ";
    }
    if(event.target.F.checked){
      days=days+"F ";
    }

    var type = $(event.target).find('input:radio[name=type]:checked').val();
    var details = event.target.details.value;
    var group = $(event.target).find('input:radio[name=group]:checked').val();
    Meteor.call('insertStudent', lname, fname, DOB, days, details, "APPLICATION", type, group, function(error, result){
      if(error){
        console.log(error.reason);
        return;
      }
      
      // do something with result
      Meteor.call('insertParent', plname, pfname, email, phone, address, result);
    });

    event.target.lname.value = "";
    event.target.fname.value = "";
    event.target.plname.value = "";
    event.target.pfname.value = "";
    event.target.DOB.value = "";

    event.target.details.value = "";
    event.target.email.value = "";
    event.target.phoneNumber.value = "";
    event.target.address.value = "";
  },
})