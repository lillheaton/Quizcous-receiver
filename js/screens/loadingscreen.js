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

  var template = _.template((function() {/*

    <div class="lobby">
      <section class="upper">
        <h1 class="big-title">Quizcous <span>Serving from a local server close to you</span></h1>
      </section>
      <section class="lower">
        
      </section>
    </div>

  */}.toString().split('\n').slice(1, -1).join('\n')));

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
      this.$el = $(template({}));
      // this.$el = $('<h1 class="big-title pulse">Quizcous <span>Serving from a local server close to you</span></h1>');

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