Feature: Adding an Action Item task
  
   As a user, so that I can add an action item, I want to click a button and see my new action item
   
   @ignore
   Scenario: Clicking the 'Add Task' button will create and show an action item
    Given I am logged in
    When I fill in the description with "Test Item"
    And I click the button "Add Task"
    Then I should see an action item named "Test Item"
    
  @ignore
  Scenario: Hitting the 'Delete Task' button after having an action item will remove the action item
    Given I am logged in
    When I fill in the description with "Test Item"
    And I click the button "Add Task"
    And I click the button "Delete Task"
    Then I should see no action items
    
    
