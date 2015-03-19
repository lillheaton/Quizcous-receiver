define([
  'underscore',
  'events',
  'classy',

  'util/log',
  'util/colors'
], function(
  _,
  Events,
  Classy,

  Log,
  Colors
) {


  var User = Classy.extend({

    id: null,
    userAgent: null,


    
    // @constructor
    __init__: function User(id, userAgent) {
      this.id = id;
      this.userAgent = userAgent;

      this.data = {
        name: 'ABC',
        color: Colors.random()
      };
    }

  });

  // add event interface to User
  _.extend(User.prototype, Events);

  return User;
});