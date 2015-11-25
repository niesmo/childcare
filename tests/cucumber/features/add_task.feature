Feature: Adding an Action Item task
  
   As a user, so that I can add an action item, I want to click a button and see my new action item
   
   @focus
   Scenario: Clicking the 'Add Task' button will create and show an action item
    Given I am logged in
    When I fill in the description with "Test Item"
    And I click the button "Add Task"
    Then I should see a widget named "Test Item"
    
    