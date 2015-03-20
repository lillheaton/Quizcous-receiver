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
      <div class="user" data-id="<%= user.id %>">
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

      receiver.on('user.added', this.userAdded, this);
      receiver.on('user.removed', this.userRemoved, this);
    },

    draw: function($container) {
      this.$el = $(containerTemplate({}));

      _.each(this.app.receiver.users, function(user) { this.drawUser(user); }, this);

      this.supr($container);
    },

    drawUser: function(user) {
      this.$el.find('section.lower').append(userTemplate({
        users: [user]
      }));
    },


    // Event handlers
    userAdded: function(user) {
      $('#app').addClass('lobby');
      this.drawUser(user);
    },
    userRemoved: function(user) {
      this.$el.find('[data-id="' + user.id + '"]').remove();

      if (this.$el.find('.user').length === 0) $('#app').removeClass('lobby');
    }

  });

  return LobbyScreen;
});