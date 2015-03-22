define([
  'underscore',
  'jquery',
  'react',

  'events',
  'classy',

  'util/log',

  'screens/basescreen',

  'jsx!reactviews/lobbyview'
], function(
  _,
  $,
  React,

  Events,
  Classy,

  Log,

  BaseScreen,

  LobbyView
) {

  var LobbyScreen = BaseScreen.extend({

    // @constructor
    __init__: function(app) {
      this.supr(app);

      this.initEvents();
    },

    initEvents: function() {
      var receiver = this.app.receiver;

      receiver.on('user.added', this.onUserAdded, this);
      receiver.on('user.removed', this.userRemoved, this);
    },

    draw: function(containerElem) {
      this.supr(containerElem);
      this.baseRender(LobbyView, { users: this.app.receiver.users });
    },

    updateState: function() {
      this.reactComponent.setState({users: this.app.receiver.users });
    },


    setupUserEventHandlers: function(user) {
      user.on('user.change', this.onUserChange, this);
      user.on('lobby.ready', this.onUserReady, this);
    },



    readyCheck: function() {
      var allReady = _.all(this.app.receiver.users, function(user) { return !!user.data.lobbyReady; });
      if (allReady) Log.log('All users ready');
    },




    // Event handlers
    onUserAdded: function(user) {
      this.setupUserEventHandlers(user);
      this.updateState();
    },

    userRemoved: function(user) {
      this.updateState();
    },

    onUserChange: function(user) {
      this.updateState();
      this.readyCheck();
    }

  });

  return LobbyScreen;
});


