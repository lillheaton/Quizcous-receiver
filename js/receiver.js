define([
  'underscore',
  'events',
  'classy',

  'util/log',

  'user'
], function(
  _,
  Events,
  Classy,

  Log,

  User
) {

  var cast = window.cast;

  var Receiver = Classy.extend({

    // Constants
    NAMESPACE: 'urn:x-cast:com.emilochhektor.quizcous',
    MESSAGE_TYPE: cast.receiver.CastMessageBus.JSON,

    // Members
    castReceiverManager: null,
    messageBus: null,
    users: [],


    // @constructor
    __init__: function() {
      this.init();
    },


    init: function() {
      // https://developers.google.com/cast/docs/reference/receiver/cast.receiver.CastReceiverManager
      this.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

      // https://developers.google.com/cast/docs/reference/receiver/cast.receiver.CastMessageBus
      // this.messageBus = this.castReceiverManager.getMessageBus(this.NAMESPACE, this.MESSAGE_TYPE);

      this.initEvents();

      return this;
    },


    // Initialize all session events for Cast session
    initEvents: function() {
      var crManager = this.castReceiverManager;

      crManager.onSenderConnected = this.onSenderConnected.bind(this);
      crManager.onSenderDisconnected = this.onSenderDisconnected.bind(this);
      crManager.onReady = this.onReady.bind(this);
      crManager.onShutdown = this.onShutdown.bind(this);
      crManager.onStandbyChanged = this.onStandbyChanged.bind(this);
      crManager.onSystemVolumeChanged = this.onSystemVolumeChanged.bind(this);
      crManager.onVisibilityChanged = this.onVisibilityChanged.bind(this);

      // var mBus = this.messageBus;

      // mBus.onMessage = this.onMessageBusMessage.bind(this);
    },



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

      appConfig.statusText = "Quizcous Receiver is starting";

      /**
       * Initializes the system manager. The application should call this method when
       * it is ready to start receiving messages, typically after registering
       * to listen for the events it is interested on.
       */
      Log.debug('Starting Cast Receiver Manager with setings', JSON.stringify(appConfig));
      this.castReceiverManager.start(appConfig);

      return this;
    },



    // @Public
    send: function(user, message) {
      this.messageBus.send(user.id, message);
    },
    broadcast: function(message) {
      this.messageBus.broadcast(message);
    },


    getUserById: function(id) {
      return _.find(this.users, function(user) {
        return user.id === id;
      }) || null;
    },



    ////////////////////////////
    // Session event handlers //
    ////////////////////////////
    onSenderConnected: function(event) {
      Log.debug("User connected", event.senderId, event.userAgent);

      var user = new User(event.senderId, event.userAgent);

      this.trigger('user.connected', user);
    },
    onSenderDisconnected: function(event) {
      Log.debug("User disconnected", event.senderId, event.userAgent);

      var reason = event.reason;
      var user = this.getUserById(event.senderId);

      if (user) {
        this.trigger('user.disconnected', user);
        this.users.splice(this.users.indexOf(user), 1);
      }

      // Check if last user requested shutdown
      if (this.castReceiverManager.getSenders().length === 0 &&
        reason === cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {

        window.close();

      }
    },
    onReady: function(event) {
      this.trigger('ready', event);

      Log.debug("CastReceiverManager is ready", JSON.stringify(event.data));
      this.castReceiverManager.setApplicationState("Quizcous receiver is ready...");
    },
    onShutdown: function(event) {
      Log.debug('CastReceiverManager shutdown');

      this.trigger('shutdown', event);
    },
    onStandbyChanged: function(event) {
      this.trigger('standbychanged', event);
    },
    onSystemVolumeChanged: function(event) {
      // typeof event.data
      // https://developers.google.com/cast/docs/reference/receiver/cast.receiver.media.Volume
      this.trigger('systemvolumechanged', event);
    },
    onVisibilityChanged: function(event) {
      this.trigger('visibilitychanged', event);
    },




    onMessageBusMessage: function(event) {
      // typeof event
      // https://developers.google.com/cast/docs/reference/receiver/cast.receiver.CastMessageBus.Event

      var user = this.getUserById(event.senderId);

      this.trigger('user.message', {
        user: user,
        message: event.data
      });
    }


  });

  // add event interface to Receiver
  _.extend(Receiver.prototype, Events);

  return Receiver;
});