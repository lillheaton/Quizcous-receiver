define(['underscore'], function(_) {

  return {
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
    white : '#ffffff',

    random: function() {
      var all = _.filter(this, function(item) { return typeof item === 'string'; });

      return all[_.random(0, all.length)];
    }
  };
});