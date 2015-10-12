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

Template.registerHelper('getRandomColor', function () {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
})

/**
* this function will determin if for a given index the element should be active or not
* @param  {Integer}  index the integer passed in to the function (index of an array in this context)
* @return {String}       Active if index is 0, "" otherwise
*/
Template.registerHelper('isActive', function(index){
  return (index===0)?"active":"";
});

Template.registerHelper('formatDate', function(date, format){
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

Template.registerHelper('getAge', function(dob){
  return moment().diff(dob, 'years') || "";
});
