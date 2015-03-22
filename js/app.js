define([
  'underscore',
  'events',
  'classy',

  'util/log',

  'receiver',

  'screens/loadingscreen',
  'screens/lobbyscreen'
], function(
  _,
  Events,
  Classy,

  Log,

  Receiver,

  LoadingScreen,
  LobbyScreen
) {

  var App = Classy.extend({

    activeScreen: null,
    screens: {},

    // @constructor
    __init__: function() {
      this.init();

      this.setScreen(this.screens.lobby);

      // this.receiver.start();
    },

    init: function() {

      this.$el = $('#app');

      this.initReceiver();
      this.initScreens();
    },

    initScreens: function() {
      this.screens.lobby = new LobbyScreen(this);
      this.screens.loading = new LoadingScreen(this);
    },

    initReceiver: function() {
      this.receiver = new Receiver();
      this.receiver.on('ready', function() { this.receiver.setState('Quizcous lobby'); }, this);
      // this.receiver.on('user.connected', function(user) { Log.log('User connected'); this.receiver.send(user, { message: "Hello Sender" }); }, this);
      this.receiver.on('user.disconnected', function() { Log.debug('User disconnected'); });
      this.receiver.on('user.message', function(data) { Log.debug('User message', JSON.stringify(data.message)); });
    },


    setScreen: function(screen) {
      if (this.activeScreen) {
        this.activeScreen.hide();
      }

      this.activeScreen = screen;
      this.activeScreen.draw(this.$el.get(0));
      this.activeScreen.show();
    },


    getState: function() {
      return {
        screen: this.activeScreen.name
      };
    }

  });


  // add event interface to App
  _.extend(App.prototype, Events);
  return App;
});