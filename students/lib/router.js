Router.route(Meteor.settings.public.appRootDir + '/students', {
  name: 'students',
  template: 'students',
  layoutTemplate: 'layout'
});