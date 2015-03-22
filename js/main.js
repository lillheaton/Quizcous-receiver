
// Sets up configuration for requirejs
require.config({
  paths: {
    'events': '../submodules/events/src/events',
    'classy': '../submodules/classy.js/src/classy',

    'jquery': '../bower_components/jquery/dist/jquery',
    'underscore': '../bower_components/underscore/underscore',

    'react': '../bower_components/react/react-with-addons',
    'JSXTransformer': '../bower_components/react/JSXTransformer',
    'jsx': '../bower_components/requirejs-react-jsx/jsx',
    'text': '../bower_components/requirejs-text/text'
  },

  shim: {
    'react': {
      exports: 'React'
    },
    'JSXTransformer': 'JSXTransformer'
  },

  'jsx': {
    fileExtenstion: '.jsx',
    transformOptions: {
      harmony: true
    }
  }
});


/**
 * Servers
 * http://quizcous.azurewebsites.net/
 * http://84.55.85.15:8080
 */


// Entry point into app via requirejs
require(['util/log', 'app'], function(Log, App) {
  Log.setLogLevel(Log.levels.LOG);

  window.Log = Log;

  window.app = new App();

});