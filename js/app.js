define([
  'underscore',
  'events',
  'classy',

  'util/log',

  'receiver',

  'screens/loadingscreen'
], function(
  _,
  Events,
  Classy,

  Log,

  Receiver,

  LoadingScreen
) {

  var App = Classy.extend({

    activeScreen: null,
    screens: {},

    // @constructor
    __init__: function() {
      this.init();

      this.setScreen(this.screens.loading);

      this.receiver.start();
    },

    init: function() {

      this.$el = $('#app');

      this.initScreens();
      this.initReceiver();
    },

    initScreens: function() {
      this.screens.loading = new LoadingScreen(this);
    },

    initReceiver: function() {
      this.receiver = new Receiver();
      this.receiver.on('user.connected', function(user) {
        Log.log('User connected');

        this.receiver.send(user.id, "Hello Sender");
      }, this);
      this.receiver.on('user.disconnected', function() { Log.debug('User disconnected'); });
    },


    setScreen: function(screen) {
      if (this.activeScreen) {
        this.activeScreen.hide();
      }

      this.activeScreen = screen;
      this.activeScreen.draw(this.$el);
      this.activeScreen.show();
    }

  });


  // add event interface to App
  _.extend(App.prototype, Events);
  return App;
});