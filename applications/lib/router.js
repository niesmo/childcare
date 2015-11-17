/**
 * The router for application page
 */
Router.route('/applications',{
  layoutTemplate: 'layout'
});


/**
 * The router for the application form where the parents fill out the application
 */
Router.route('applicationForm',{
  path: '/new-application/:token',
  onBeforeAction: function(){
    var token = this.params.token;
    console.log(token);

    // subscribe to the collection so we can get the data
    this.subscribe('applications', token);
    this.next();

    // try to get the application
    application = Applications.findOne({token: this.params.token});

    if(!application){
      this.render("applicationNotFound");
    }

    // if we found the application
    else{
      // get the expiration date
      var expDate = new Date(application.expirationDate);

      if( expDate < new Date()){
        this.render("applicationExpired");    
      }
    }


  },
  waitOn: function() {
    var token = this.params.token;
    return [Meteor.subscribe('applications', token)];
  }

  // // getting the hash from the url
  // var token = this.params.token;
  // console.log(token);

  // // setting the layout
  // this.layout("defaultLayout")

  // // rendering the tempalte
  // this.render('applicationForm');

  // this.next();
});