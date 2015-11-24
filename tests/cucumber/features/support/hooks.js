(function () {

  'use strict';

  module.exports = function () {

    this.Before(function () {
      this.server.call('reset');
      this.server.call('addUser', {email: "sam@example.com"});
    });

  };

})();