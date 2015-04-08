define([
  'underscore',
  'jquery',
  'events',
  'classy',

  'util/log',

  'quiz/quiz',
  'quiz/quizlobby',

  'screens/basescreen'
], function(
  _,
  $,
  Events,
  Classy,

  Log,

  Quiz,
  QuizLobby,

  BaseScreen
) {

  var containerTemplate = _.template((function() {/*
      <div class="lobby-container">
        <section class="upper">
          <h1 class="big-title">Quizcous <span>Let the game begin!</span></h1>
        </section>

        <section class="lower"></section>
      </div>
  */}.toString().split('\n').slice(1, -1).join('\n')));
 
  var GameScreen = BaseScreen.extend({

    quiz: null,
    quizLobby: null,

    // @constructor
    __init__: function(app) {
      this.supr(app);
      this.init();
    },

    init: function() {
      this.initEvents();
      this.quiz = new Quiz(this.app.receiver);
      this.quizLobby = new QuizLobby(this.quiz);
    },

    initEvents: function() {
      var receiver = this.app.receiver;

      receiver.on('user.added', this.onUserAdded, this);
      receiver.on('user.removed', this.userRemoved, this);
    },

    draw: function($container) {
      this.$el = $(containerTemplate({}));
      this.supr($container);
    },




    // Event handlers
    onUserAdded: function(user) {
    },

    userRemoved: function(user) {
    },

    onUserChange: function(user) {
    }

  });

  return GameScreen;
});