define([
  'underscore',
  'events',
  'classy',

  'util/log',

  'receiver'
], function(
  _,
  Events,
  Classy,

  Log
) {

  var BaseScreen = Classy.extend({

    // @constructor
    __init__: function() {
      this.active = false;
    },

    show: function() { this.active = true;  },
    hide: function() { this.active = false; },

    update: function(time) { },
    draw: function() { }

  });


  // add event interface to BaseScreen
  _.extend(BaseScreen.prototype, Events);
  return BaseScreen;
});