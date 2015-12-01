(function() {
  'use strict';
  
  module.exports = function() {
    this.Given(/^I am logged in$/, function(callback){
      browser.url(process.env.ROOT_URL);
      browser.waitForExist('body *');
      browser.waitForVisible('body *');
      browser.setValue('#login-email', 'sam@example.com');
      browser.setValue('#login-password', 'testtest');
      browser.click('#login-button');
      pending();
    });
      
    this.When(/^I fill in the description with "([^"]*)"$/, function (arg1,callback) {
       browser.waitForVisible('#description');
      browser.setValue('#description', 'Test Item');
      pending();
    });
    
    this.When(/^I click the button "Add Task"$/, function (arg1,callback) {
      browser.click('#add-Task');
      pending();
    });
    //this only works as expected if there is one action item
    this.When(/^I click the button "Delete Task"$/, function (arg1,callback) {
      browser.click('#delete-Task');
      pending();
    });
    
    this.Then(/^I should see an action item named "([^"]*)"$/, function(arg1,callback){
      browser.waitForExist('.task-description');
      var taskDescription = browser.getText('.task-description');
      expect(taskDescription).toEqual("Test Item");
      pending();
    });
    
    this.Then(/^I should see no action items$/, function(arg1,callback){
      var action-itemTableBody = browser.getText('.action-itemTableBody');
      expect(action-itemTableBody).toEqual("");
      pending();
    });
  };
})();