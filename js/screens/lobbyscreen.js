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

  var containerTemplate = _.template((function() {/*
      <section class="upper">
        <h1 class="big-title pulse">Quizcous <span>Serving from a local server close to you</span></h1>
      </section>
      <section class="lower">
      </section>
  */}.toString().split('\n').slice(1, -1).join('\n')));
 
  var userTemplate = _.template((function() {/*
    <% _.each(users, function(user) { %>
      <div class="user">
        <div class="color" style="background: <%= user.data.color %>;"></div>
        <div class="name"><%= user.data.name %></div>
      </div>
    <% }); %>
  */}.toString().split('\n').slice(1, -1).join('\n')));


  var LobbyScreen = BaseScreen.extend({

    // @constructor
    __init__: function(app) {
      this.supr(app);

      this.initEvents();
    },

    initEvents: function() {
      var receiver = this.app.receiver;

      receiver.on('user.connected', this.userConnected, this);
      receiver.on('user.disconnected', this.userDisconnected, this);
    },

    draw: function($container) {
      if (!this.$el) this.$el = $('<div>').addClass('lobby-container');

      this.$el.html(containerTemplate({}));
      this.$el.find('section.lower').html(userTemplate({
        users: this.app.receiver.users
      }));


      if ($container) {
        this.supr($container);
      }
    },



    // Event handlers
    userConnected: function() {
      $('#app').addClass('lobby');
      this.draw();
    },
    userDisconnected: function() {
      if (!this.app.receiver.users.length) $('#app').removeClass('lobby');
    }

  });

  return LobbyScreen;
});