Template.applicationForm.events({
  /**
   * Submits form and inserts student and parent information. Will appear on waitlist.
   * @param  {[eventMap]} event [description]
   * @return {[type]}       [description]
   */
  "submit form": function(event){
    event.preventDefault();

    //retrieve data from form
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
      var days=[];
      var i = 0;
    if(event.target.m.checked){
        days[i]={"day":"MONDAY"};
        i++;
    }
    if(event.target.t.checked){
        days[i]={"day":"TUESDAY"};
        i++;
    }
    if(event.target.w.checked){
        days[i]={"day":"WEDNESDAY"};
        i++;
    }
    if(event.target.th.checked){
        days[i]={"day":"THURSDAY"};
        i++;
    }
    if(event.target.f.checked){
        days[i]={"day":"FRIDAY"};
        i++;
    }

    var requestedStart = event.target.sdate.value;
    var type = $(event.target).find('input:radio[name=type]:checked').val();
    var details = event.target.details.value;
    var group = $(event.target).find('input:radio[name=group]:checked').val();
    var studentObj = ({lname:lname,fname:fname,DOB:DOB,group:group, status:"APPLICATION"});
    var parentObj=({plname:plname,pfname:pfname,address:address,email:email,phone:phone});
    var detailsObj=({days:days, type:type, details:details,requestedStart:requestedStart,paid:false});

    //Inserts student, returns student id
      Meteor.call('insertStudent', studentObj, detailsObj, function(error, sId){
      if(error){
        // TODO: Do some real error checking
        alert(error.reason);
        return;
      }
      
        // Insert into parent collection, returns parent id
        Meteor.call('insertParent',parentObj,function(error, pId){
            if(error){
            //error checking
                return;
            }
            Meteor.call('insertStudentParent', sId, pId, function(error, id){
                if(error){
                    //TODO: Error checking
                    return;
                }
            });

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