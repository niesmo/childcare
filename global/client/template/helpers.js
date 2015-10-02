/**
 * ToLowerCase function.
 * @param  {String} str Any string passed
 * @return {String}     Lower case of the passed in string
 */
Handlebars.registerHelper('toLower', function (str) {
    return str.toLowerCase();
});

/**
* this function will determin if for a given index the element should be active or not
* @param  {Integer}  index the integer passed in to the function (index of an array in this context)
* @return {String}       Active if index is 0, "" otherwise
*/
Handlebars.registerHelper('isActive', function(index){
  return (index===0)?"active":"";
});
