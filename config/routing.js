// make sure that users are signed in for all pages

Router.onBeforeAction(function(pause) {

  if (!Meteor.user()) {
    Router.go('signin');
  }

  this.next();
  
}, {except: ['signin']});

Router.plugin('ensureSignedIn', {
    except: ['signin']
});

Router.configure({
  loadingTemplate: 'loading',
  layoutTemplate: 'defaultLayout',
  notFoundTemplate: 'notFound'
});

