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

  var LoadingScreen = BaseScreen.extend({

    // @constructor
    __init__: function(app) {
      this.supr(app);
    },

    draw: function($container) {
      this.$el = $('<h1 class="big-title pulse">Quizcous <span>Serving from a local server close to you</span></h1>');

      this.supr($container);
    }

  });

  return LoadingScreen;
});

