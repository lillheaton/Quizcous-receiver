define([
  'underscore',
  'events',
  'classy',

  'util/log',

  'screens/basescreen'
], function(
  _,
  Events,
  Classy,

  Log,

  BaseScreen
) {

  var LobbyScreen = BaseScreen.extend({

    // @constructor
    __init__: function(app) {
      this.supr(app);
    },

    draw: function($container) {
      this.$el = $('<h1>Quizcous <span>Serving from a local server close to you</span></h1>');

      this.supr($container);
    }

  });

  return LobbyScreen;
});