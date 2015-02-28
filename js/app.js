define([
  'underscore',
  'events',
  'classy',

  'util/log'
], function(
  _,
  Events,
  Classy,

  Log
) {

  var App = Classy.extend({

    // @constructor
    __init__: function() {
      this.init();
    },


    init: function() {

      this.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

      this.setupSessionHandling();

      Log.debug('screen: ', window.innerWidth, window.innerHeight);
    },

    // Initialize all session events for Cast session
    setupSessionHandling: function() {
      var crManager = this.castReceiverManager;

      crManager.onSenderConnected = _.bind(this.onSenderConnected, this);
      crManager.onSenderDisconnected = _.bind(this.onSenderDisconnected, this);
    },


    // Start session and listen for connections
    start: function() {

      var appConfig = new cast.receiver.CastReceiverManager.Config();

      /**
       * Text that represents the application status.
       **/
      appConfig.statusText = 'Ready to play';

      /**
       * Maximum time in seconds before closing an idle
       * sender connection. Setting this value enables a heartbeat message to keep
       * the connection alive. Used to detect unresponsive senders faster than
       * typical TCP timeouts. The minimum value is 5 seconds, there is no upper
       * bound enforced but practically it's minutes before platform TCP timeouts
       * come into play. Default value is 10 seconds.
       * @type {number|undefined}
       **/
      // 100 minutes for testing, use default 10sec in prod by not setting this value
      appConfig.maxInactivity = 6000;

      /**
       * Initializes the system manager. The application should call this method when
       * it is ready to start receiving messages, typically after registering
       * to listen for the events it is interested on.
       */
      this.castReceiverManager.start(appConfig);
    },







    ////////////////////////////
    // Session event handlers //
    ////////////////////////////
    onSenderConnected: function(event) {
      this.trigger('sender.connected', event);
    },
    onSenderDisconnected: function(event) {
      this.trigger('sender.disconnected', event);
    }

  });


  // add event interface to App
  _.extend(App, Events);
  return App;
});