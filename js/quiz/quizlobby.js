define([
  'underscore',
  'events',
  'classy',

  'util/log',

  'user',
  'quiz/quiz'
], function(
  _,
  Events,
  Classy,

  Log,

  User,
  Quiz
) {

  var QuizLobby = Classy.extend({

    app: {},
    quiz: {},
    questionIndex: 0,
    answers: [],

    // @constructor
    __init__: function(app) {
      this.app = app;
      this.quiz = new Quiz();

      this.initEvents();
      this.quiz.setupQuestions();
    },

    initEvents: function() {
      this.app.receiver.on('user.message', this.onUserMessage, this);
      this.quiz.on('quiz.fetchedQuestions', this.onFetchedQuestions, this);
    },

    getNextQuestion: function(){
      this.questionIndex++;
      if(this.quiz.questions.length > this.questionIndex - 1){
        return this.quiz.questions[this.questionIndex - 1];  
      }
      return null;
    },

    draw: function(){
      var question = this.getNextQuestion();      
      this.app.$el.find('.big-title').text(question.text);
    },

    allAnsered: function(){
      var allAnsered = true;
      _.each(this.app.receiver.users, function(user){
        if(_.where(this.answers, {'id': user.id}).length < 1) {
          allAnsered = false;
        }
      });

      return allAnsered;
    },






    onUserMessage: function(message){
      answers.push(message);
      Log.log('Message from user');

      if(this.allAnsered()){
        Log.log('All users has answered');
      }
    },

    onFetchedQuestions: function(questions){
      this.draw();
    }
  });

  // add event interface to QuizLobby
  _.extend(QuizLobby.prototype, Events);

  return QuizLobby;
});