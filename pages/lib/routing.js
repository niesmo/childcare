Router.route(Meteor.settings.public.appRootDir + "/",{
  name:'home',
  template: 'home',
  layoutTemplate: 'layout'
});
