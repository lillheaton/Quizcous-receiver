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

  var Quiz = Classy.extend({

    // @constructor
    __init__: function(receiver) {
      this.receiver = receiver;

    },

    bindReceiverEvents: function() {
      
    }

  });

  // add event interface to Quiz
  _.extend(Quiz.prototype, Events);

  return Quiz;
});