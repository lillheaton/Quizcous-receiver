
// Sets up configuration for requirejs
require.config({
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery',
    'underscore': '../bower_components/underscore/underscore',
    'events': '../submodules/events/src/events',
    'classy': '../submodules/classy.js/src/classy'
  }
});


/**
 * Servers
 * http://quizcous.azurewebsites.net/
 * http://84.55.85.15:8080
 */


// Entry point into app via requirejs
require(['util/log', 'app'], function(Log, App) {
  window.Log = Log;
  new App()/*.start()*/;

  Log.log('LOL*');

});