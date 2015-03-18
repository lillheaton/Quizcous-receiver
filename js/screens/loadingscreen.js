define([
  'underscore',
  'jquery',
  'events',
  'classy',

  'util/log',

  'screens/basescreen'
], function(
  _,
  $,
  Events,
  Classy,

  Log,

  BaseScreen
) {

  var LoadingScreen = BaseScreen.extend({

    // @constructor
    __init__: function(app) {
      this.supr(app);

      this.initEvents();
    },

    initEvents: function() {
      var receiver = this.app.receiver;

      receiver.on('user.connected', this.userConnected);
    },

    draw: function($container) {
      this.$el = $('<h1 class="big-title pulse">Quizcous <span>Serving from a local server close to you</span></h1>');

      this.supr($container);
    },



    // Event handlers
    userConnected: function() {
      $('#app').addClass('lobby');
    },
    userDisconnected: function() {
      if (!this.app.receiver.users.length) $('#app').removeClass('lobby');
    }

  });

  return LoadingScreen;
});