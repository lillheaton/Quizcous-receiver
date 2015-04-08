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

  var QuizLobby = Classy.extend({

    // @constructor
    __init__: function(quiz) {
      this.quiz = quiz;

      this.initEvents();
      this.quiz.setupQuestions();
    },

    initEvents: function() {
      this.quiz.on('user.created', this.onUserConnected, this);
    },


    onUserConnected: function(user) {
      
    }

  });

  // add event interface to QuizLobby
  _.extend(QuizLobby.prototype, Events);

  return QuizLobby;
});