define([
  'jquery',
  'underscore',
  'classy',

  'util/colors'
], function(
  $,
  _,
  Classy,

  Colors
) {

  var Log = Classy.extend({

    __init__: function() {
      this.init();

      this.log('log created');
    },

    init: function() {
      this.initDOM();
      this.setupWindowEvents();
    },

    initDOM: function() {
      var $log = this.$log = $('<div class="log"><div class="toggle"></div></div>');
      this.$container = $('<ul>');

      $log.find('.toggle').click(function() { $log.toggleClass('collapsed'); });

      $log.append(this.$container);
      $('body').append($log);
    },

    setupWindowEvents: function() {
      window.addEventListener('error', _.bind(this._onWindowError, this), false);
    },


    setupAppEvents: function(app) {
    },



    // Util functions
    _argsToArr: function(args) {
      return Array.prototype.slice.call(args, 0);
    },
    _argsToStr: function(args) {
      return this._argsToArr(args).join(' ');
    },
    _createOutputElement: function() {
      return $('<li><span class="type"></span>: <span class="message"></span></li>');
    },


    // Output logs to our DOM-element
    _output: function(type, output, css) {
      var $elem = this._createOutputElement();

      $elem.find('.type').text(type);
      $elem.find('.message').text(output);

      $elem.addClass('type-'+type);

      if (css) {
        $elem.css(css);
      }

      this.$container.append($elem);
      this.$log[0].scrollTop = this.$log[0].scrollHeight;
    },



    // Public logging functions
    error: function() {
      this._output('error', this._argsToStr(arguments));
    },
    log: function() {
      this._output('log', this._argsToStr(arguments));
    },
    debug: function() {
      this._output('debug', this._argsToStr(arguments));
    },




    // Window event listeners
    _onWindowError: function() {
      this.error.apply(this, arguments);
    }

  });

  return new Log();
});