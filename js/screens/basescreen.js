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
    __init__: function(app) {
      this.$el = $('<div>');
      this.app = app;
      this.name = 'unnamed';

      this.active = false;
    },

    show: function() {
      this.active = true;
      this.$el.show();
    },
    hide: function() {
      this.active = false;
      this.$el.hide();
    },

    update: function(time) { },
    draw: function(container) {
      this.containerElem = container;
    },

    baseRender: function(reactView, data) {
      this.reactElement = React.render(reactView, data);
    }

  });


  // add event interface to BaseScreen
  _.extend(BaseScreen.prototype, Events);
  return BaseScreen;
});