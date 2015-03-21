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
        name: null,
        color: null
      };

      this.initEvents();
    },

    initEvents: function() {
      this.on('user.change', this.onUserChange, this);
    },


    onUserChange: function(user, data) {
      if (data.color !== undefined) this.data.color = data.color;
      if (data.name !== undefined) this.data.name = data.name;
      if (data.lobbyReady !== undefined) this.data.lobbyReady = data.lobbyReady;
    },


    onMessage: function(message) {
      if (message.type) {
        this.trigger(message.type, this, message.data);
      }
    }

  });

  // add event interface to User
  _.extend(User.prototype, Events);

  return User;
});