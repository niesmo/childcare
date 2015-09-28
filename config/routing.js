Router.configure({
  layoutTemplate: 'defaultLayout',
  notFoundTemplate: 'notFound'
});


// make sure that users are signed in for all pages
Router.onBeforeAction(function(pause) {

  if (!Meteor.user()) {
    Router.go('signin');
  }

  this.next();

}, {except: ['singin']});

Router.plugin('ensureSignedIn', {
    except: ['signin']
});