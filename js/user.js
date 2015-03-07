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

    // Easily parsed data to be sent
    data: {
      name: 'noname',
      color: Colors.random()
    },

    
    // @constructor
    __init__: function User(id, userAgent) {
      this.id = id;
      this.userAgent = userAgent;
    }

  });

  // add event interface to User
  _.extend(User.prototype, Events);

  return User;
});