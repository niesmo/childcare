(function() {
  'use strict';
  
  module.exports = function() {
    this.Given(/^I am logged in$/, function(callback){
      browser.url(process.env.ROOT_URL);
      browser.waitForExist('body *');
      browser.waitForVisible('body *');
      browser.waitForExist('#login-sign-in-link');
      browser.click('#login-sign-in-link');
      browser.setValue('#login-email', 'bob@example.com');
      browser.setValue('#login-password', 'testtest');
      browser.click('#login-buttons-password');
      pending();
    });
      
    this.When(/^I fill in the name with "([^"]*)"$/, function (arg1,callback) {
       browser.waitForVisible('#name');
      browser.setValue('#name', 'Test Item');
      pending();
    });
    
    this.When(/^I click the button "([^"]*)"$/, function (arg1,callback) {
      browser.click('#add-Task');
      pending();
    });
    
    this.Then(/^I should see a widget named "([^"]*)"$/, function(arg1,callback){
      browser.waitForExist('.widget-name');
      var taskDescription = browser.getText('.task-description');
      expect(taskDescription).toEqual("Test Item");
      pending();
    });
  };
})();