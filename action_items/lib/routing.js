Router.route(Meteor.settings.public.appRootDir + "/",{
  name:'actionItems',
  template: 'home',
  layoutTemplate: 'layout'
});
