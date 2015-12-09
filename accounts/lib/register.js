Router.route(Meteor.settings.public.appRootDir + '/register',{
  template: 'register',
  name: 'register',
  layoutTemplate: 'layout'
});