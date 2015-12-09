Router.route(Meteor.settings.public.appRootDir + '/waitlist', {
  name: 'waitlist',
  template: 'waitlist',
  layoutTemplate: 'layout'
});