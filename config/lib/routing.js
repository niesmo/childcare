// make sure that users are signed in for all pages

Router.onBeforeAction(function(pause) {

  this.next();
  if (!Meteor.user()) {
    this.render('signin');
  }

  
}, {except: ['signin', 'applicationForm']});

Router.plugin('ensureSignedIn', {
    except: ['signin', 'applicationForm']
});

Router.configure({
  layoutTemplate: 'defaultLayout',
  notFoundTemplate: 'notFound'
});

