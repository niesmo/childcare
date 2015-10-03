Template.task.events({
  'click img.student-avatar': function (e, tpl) {
    // find the id of the selected student
    var id = e.target.id.substr(6);

    // set the session value to that student
    Session.set('selectedActionItem', id);
  }
});