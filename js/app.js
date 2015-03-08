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

  Log,

  Receiver
) {

  var App = Classy.extend({

    // @constructor
    __init__: function() {
      this.receiver = new Receiver();

      this.init();

      this.receiver.start();
    },

    init: function() {
      this.receiver.on('sender.connected', function() { Log.debug('sender connected'); });
      this.receiver.on('sender.disconnected', function() { Log.debug('sender disconnected'); });
    }

  });


  // add event interface to App
  _.extend(App.prototype, Events);
  return App;
});