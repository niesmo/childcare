Template.editStudentModal.onCreated(function(){
    Meteor.subscribe("waitlistedStudents");

});

Template.editStudentModal.helpers({
   student:function(){
       var id = Session.get('studentToEdit');
       return Students.findOne({_id:id});
   }

});