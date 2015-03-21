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
      <div class="lobby-container">
        <section class="upper">
          <h1 class="big-title pulse">Quizcous <span>Serving from a local server close to you</span></h1>
        </section>

        <section class="lower"></section>
      </div>
  */}.toString().split('\n').slice(1, -1).join('\n')));
 
  var userTemplate = _.template((function() {/*
    <% _.each(users, function(user) { %>
      <div class="user <% if (user.lobbyReady) { %>ready<% } %>" data-id="<%= user.id %>">
        <div class="color" style="background: <%= user.data.color %>;">
          <div class="checkmark"></div>
        </div>
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

      receiver.on('user.added', this.onUserAdded, this);
      receiver.on('user.removed', this.userRemoved, this);
    },

    draw: function($container) {
      this.$el = $(containerTemplate({}));

      _.each(this.app.receiver.users, function(user) { this.drawUser(user); }, this);

      this.supr($container);
    },

    drawUser: function(user) {
      if (!user.data.name || !user.data.color) return;

      var $user = this.$el.find('[data-id="' + user.id + '"]');

      if ($user.length === 0) {
        $user = $(userTemplate({ users: [user] }));
        this.$el.find('section.lower').append($user);
      }

      $user.find('.color').css('background', user.data.color);
      $user.find('.name').text(user.data.name);
      $user.toggleClass('ready', !!user.data.lobbyReady);

      if (this.$el.find('.user').length > 0) $('#app').addClass('lobby');
    },


    addUserToLobby: function(user) {
      user.on('user.change', this.onUserChange, this);
      user.on('lobby.ready', this.onUserReady, this);

      this.drawUser(user);
    },

    readyCheck: function() {
      var allReady = _.all(this.app.receiver.users, function(user) { return !!user.data.lobbyReady; });

      if (allReady) { Log.log('All users ready'); }
    },




    // Event handlers
    onUserAdded: function(user) {
      this.addUserToLobby(user);
    },

    userRemoved: function(user) {
      this.$el.find('[data-id="' + user.id + '"]').remove();

      if (this.$el.find('.user').length === 0) $('#app').removeClass('lobby');
    },

    onUserChange: function(user) {
      this.drawUser(user);

      this.readyCheck();
    }

  });

  return LobbyScreen;
});