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
      this.receiver.on('user.connected', function(user) { Log.log('User connected'); this.receiver.send(user, "Hello Sender"); }, this);
      this.receiver.on('user.disconnected', function() { Log.debug('User disconnected'); });
      this.receiver.on('user.message', function(data) { Log.log('User message', JSON.stringify(data.message)); });
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