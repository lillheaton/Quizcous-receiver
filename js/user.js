define([
  'underscore',
  'events',
  'classy',

  'util/log',
  'util/colors'
], function(
  _,
  Events,
  Classy,

  Log,
  Colors
) {


  var Receiver = Classy.extend({

    id: null,
    userAgent: null,

    name: 'noname',
    color: Colors.random(),

    // @constructor
    __init__: function(id, userAgent) {
      this.id = id;
      this.userAgent = userAgent;
    }


  });

  // add event interface to Receiver
  _.extend(Receiver, Events);

  return Receiver;
});