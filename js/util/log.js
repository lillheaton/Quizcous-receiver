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

      logLevels: {
        ALL: 0,
        DEBUG: 1,
        LOG: 2,
        ERROR: 3
      },

    __init__: function() {
      this.init();

      this.logLevel = this.logLevels.ALL;

      this.debug('log created');
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


    setLogLevel: function(logLevel) {
      this.logLevel = logLevel;
      this.filterLogLevelOutput();
    },

    filterLogLevelOutput: function() {
      var logLevel = this.logLevel;
      this.$container.find('li').each(function(index, elem) {
        var $elem = $(elem);
        if ($elem.attr('data-log-level') >= logLevel) {
          $elem.show();
        } else {
          $elem.hide();
        }
      });
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
    _output: function(logLevel, type, output, css) {

      var $elem = this._createOutputElement();

      $elem.attr('data-log-level', logLevel);

      $elem.find('.type').text(type);
      $elem.find('.message').text(output);

      $elem.addClass('type-'+type);

      if (css) {
        $elem.css(css);
      }

      this.$container.append($elem);
      this.$log[0].scrollTop = this.$log[0].scrollHeight;

      if (logLevel < this.logLevel) {
        $elem.hide();
      }
    },



    // Public logging functions
    error: function() {
      this._output(this.logLevels.ERROR, 'error', this._argsToStr(arguments));
    },
    log: function() {
      this._output(this.logLevels.LOG, 'log', this._argsToStr(arguments));
    },
    debug: function() {
      this._output(this.logLevels.DEBUG, 'debug', this._argsToStr(arguments));
    },




    // Window event listeners
    _onWindowError: function(errorEvent) {
      this.error(errorEvent.message, '; filename:', errorEvent.filename, '; lineno:', errorEvent.lineno);
    }

  });

  return new Log();
});