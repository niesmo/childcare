Template.studentThumbnail.events({
  'click div.thumbnail-student-initials': function (e, tpl) {
    // find the id of the selected student
    var id = e.target.id.substr(11);  

    // set the session value to that student
    Session.set('selectedStudentId', id);
  }
});