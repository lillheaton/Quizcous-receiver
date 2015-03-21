define(['underscore'], function(_) {

    // Color theme
    // http://www.materialpalette.com/orange/teal

  return {
    colorPrimary: '#ff9800',
    colorPrimaryDark: '#f57c00',
    colorPrimaryLight: '#ffe0b2',
    colorAccent: '#009688',
    textPrimary: '#212121',
    textSecondary: '#727272',
    divider: '#b6b6b6',

    material: {
        red: '#f44336',
        pink: '#e91e63',
        purple: '#9c27b0',
        deepPurple: '#673ab7',
        indigo: '#3f51b5',
        blue: '#2196f3',
        lightBlue: '#03a9f4',
        orange: '#ff9800',
        deepOrange: '#ff5722',
        yellow: '#ffeb3b'
    },


    clrs: {
        navy : '#001f3f',
        blue : '#0074d9',
        aqua : '#7fdbff',
        teal : '#39cccc',
        olive : '#3d9970',
        green : '#2ecc40',
        lime : '#01ff70',
        yellow : '#ffdc00',
        orange : '#ff851b',
        red : '#ff4136',
        maroon : '#85144b',
        fuchsia : '#f012be',
        purple : '#b10dc9',
        black : '#111111',
        gray : '#aaaaaa',
        silver : '#dddddd',
        white : '#ffffff'
    },

    random: function(type) {
      var all = _.filter(type ? this[type] : this, function(item) { return typeof item === 'string'; });

      return all[_.random(0, all.length - 1)];
    }
  };
});