
if(Meteor.isClient) {

    Meteor.subscribe("waitlistedStudents");


    Template.Waitlist.helpers({
        infants: function () {

            return Students.find({status:"WAITLIST"},{sort: {createdAt: 1}});
        }
    });

    Template.Waitlist.events({
        "submit form": function(event) {


            event.preventDefault();
            var lname = event.target.lname.value;
            var fname = event.target.fname.value;
            var DOB = event.target.DOB.value;

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
            alert("GROUP: " + group);
            alert("days: " + days);
            alert("type: " + type);
          //  var teacher = event.target.dropdown.value;

      //      var start = event.target.start.value;

            Meteor.call('insertStudent', lname, fname, DOB, days, details, "WAITLIST", type, group);

            event.target.lname.value = "";
            event.target.fname.value = "";
            event.target.DOB.value = "";
            event.target.start.value = "";
            event.target.days.value = "";
            event.target.details.value = "";
          //  event.target.lname.value = "";
           // event.target.lname.value = "";
        }

    });
    Template.infantsList.events({
        "click .remove": function(){

            Meteor.call('removeStudent', this._id);
        }

    })

}




