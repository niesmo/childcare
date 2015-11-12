/**
 * ToLowerCase function.
 * @param  {String} str Any string passed
 * @return {String}     Lower case of the passed in string
 */
Template.registerHelper('toLower', function (str) {
    return (str || "").toLowerCase();
});

/**
 * StudentAffiliation function.
 * @param {String} str Any string passed
 * @return {String}   The affiliation of the student, or the empty string if no affiliation
 */
Template.registerHelper('studentAffiliation', function (str) {
  var affiliation = (str || "").toLowerCase();
  switch(affiliation) {
    case "regular":
          return "new family";
          break;
    case "member":
          return "staff";
          break;
    case "existing":
          return "current family";
          break;
    default:
          return "";
  }
});

/**
* this function will determine if for a given index the element should be active or not
* @param  {Integer}  index the integer passed in to the function (index of an array in this context)
* @return {String}       Active if index is 0, "" otherwise
*/
Template.registerHelper('isActive', function(index){
  return (index===0)?"active":"";
});

Template.registerHelper('formatDate', function(date, format){
  if(date==undefined)
  {
    //if returning undefined, this is not completed so has no date
    return "";
  }
  return moment(date).format(format);
});

/**
 * This function sorts the days in the order of the week days
 * @param  {Array} days The days that the applicants has requested
 * @return {Array}      The sorted days in the same format
 */
Template.registerHelper('sortedDays', function(days){
  if(!days) return;
  
  // Utility functions
  function daysComparator(d1, d2){
    var week = {
      monday:0,
      tuesday:1,
      wednesday:2,
      thursday:3,
      friday:4,
      saturday:5,
      sunday:6
    };

    d1 = d1.day.toLowerCase();
    d2 = d2.day.toLowerCase();

    return week[d1] - week[d2];
  }

  return days.sort(daysComparator);
});

/**
 * This function will return the appropriate class based on the flexibility of the day
 * @return {String} The appropriate string to be set as the css class
 */
Template.registerHelper('flexibleColorClass', function(){
  return this.flexible?"list-group-item-success": "list-group-item-warning";
});

/**
 * This function will retun the age of the student in number of months
 * @param  {Date}          the date of birh in the date format
 * @return {String}        The age in number of months
 */ 
Template.registerHelper('getAge', function(dob){
  var ageInMonths = moment().diff(dob, 'months') || "";
  // if we could not parse it for some reason
  if(ageInMonths == ""){
    // check the baby is less than one month old
    var ageInDays = moment().diff(dob, 'days');
    if(ageInDays < 30){
      return "< 1 Month";
    }
    return "";
  }

  // if the baby is not born yet
  if(ageInMonths != "" && ageInMonths < 0){
    return "Not Conceived";
  }

  // check if the baby is one month old
  if(ageInMonths == 1){
    return "1 Month";
  }
  
  return ageInMonths + " Months";
});

/**
 * This function simply returns the initials of a student
 * @param  {[type]}     no argument is passed, however it used the `this` context to find the name and lastName
 * @return {[type]}     The abbreviated version of the name: "Nima Esmaili" -> "N.E"
 */
Template.registerHelper('initials', function(){
  return (this.firstName[0] + "." + (this.middleName?this.middleName + ".":"") + this.lastName[0]).toUpperCase();
});

/**
 * This function will return the label (name or email) of the user who created the action item
 * @param  {String}     @this {ActionItem} This in this function is referencing an action item
 * @return {String}     The email or name of the user who created the action item
 */
Template.registerHelper('getCreatedByUser', function(){
    if(!this._id) return;

    var actionItem = ActionItems.findOne({_id: this._id});
    if(actionItem.isSystemMessage){
      return "System";
    }

    var createdByUser= Meteor.users.findOne(actionItem.createdBy);
    var label = "";

    try{
      label = createdByUser.profile.firstName+" "+createdByUser.profile.lastName;
    }
    catch(err){
      label = createdByUser.emails[0].address;
    }
    return label;
});

/**
 * This function will return the label (name or email) of the user who completed the action item
 * @param  {String}     @this {ActionItem} This in this function is referencing an action item
 * @return {String}     The email or name of the user who completed the action item
 */
Template.registerHelper('getCompletedByUser', function(){
    if(!this._id) return;

    var actionItem = ActionItems.findOne({_id: this._id});
    if(actionItem.isSystemMessage&&actionItem.isCompleted){
      return "System";
    }
    
    var completedByUser= Meteor.users.findOne(actionItem.completedBy);
    var label = "";
    if (!(actionItem.isCompleted))
    {
      return label;
    }
    try{
      label = completedByUser.profile.firstName+" "+completedByUser.profile.lastName;
    }
    catch(err){
      label = completedByUser.emails[0].address;
    }
    return label;
});

Template.registerHelper('error', function(){
  return Session.get('errorMessage');
});

/**
 * This function will add a system message to the action items list
 * @param  {String}     @task Contains a description and task type (Infant or toddler)
 * @return {String}     The result of the addition to the action item collection
 */
 createSystemActionItem = function (task){
    check(task, {
    description: String,
    type: String
  });
  return Meteor.call("addSystemTask", task, function(e, r){
      console.log(e, r);
    });
}