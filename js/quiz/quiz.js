define([
  'underscore',
  'jquery',
  'events',
  'classy',

  'util/log',

  'user'
], function(
  _,
  $,
  Events,
  Classy,

  Log,

  User
) {

  var Quiz = Classy.extend({

    url: 'http://quizcous-api.azurewebsites.net/api/question/',
    totalQuestionsCount: 0,
    usedIds: [],
    questions: [],

    // @constructor
    __init__: function(receiver) {
      this.receiver = receiver;
    },

    setupQuestions: function(){
      var that = this;
      this.questions = [];

      // Get how many questions there is in db
      this._request("count").done(function(countData){
        that.totalQuestionsCount = countData.count;

        // Request 20 questions and save which id:s
        _.each(that._getUniqueIds(20), function(id) {
          that.usedIds.push(id);

          that._request("/get/" + id).done(function(quizData){
            questions.push(quizData);
          });
        });
      });
    },

    _getUniqueIds: function(amount) {
      var uniqIds = 0;
      var ids = [];

      while(uniqIds < amount){
        var id = Math.floor((Math.random() * this.totalQuestionsCount) + 1);
        if(!this._idUsed(id)){
          ids.push(id);
          uniqIds++;
        }
      }

      return ids;
    },

    _idUsed:function(id) {
      return _.some(this.usedIds, function(i){
        return i == id;
      });
    },

    _request: function(path){
      return $.ajax({
              url: this.url + path,
              type: 'GET',
              data: {
                format: 'application/json'
              },
              dataType: 'json'        
            });
    }

  });

  // add event interface to Quiz
  _.extend(Quiz.prototype, Events);

  return Quiz;
});