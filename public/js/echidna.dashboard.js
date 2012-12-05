$(document).ready(function() {
  echidna.peity();
});

echidna = {
  peity: function() {
    $.fn.peity.defaults.line = {
      strokeWidth: 1,
      delimeter: ",",
      height: 24,
      max: null,
      min: 0,
      width: 50
    };

    $.fn.peity.defaults.bar = {
      delimeter: ",",
      height: 24,
      max: null,
      min: 0,
      width: 50
    };

    $(".peity_line_good span").peity("line", {
      colour: "#b1ffa9",
      strokeColour: "#459d1c"
    });

    $(".peity_line_bad span").peity("line", {
      colour: "#ffc4c7",
      strokeColour: "#ba1E20"
    });

    $(".peity_line_neutral span").peity("line", {
      colour: "#cccccc",
      strokeColour: "#757575"
    });

    $(".peity_bar_good span").peity("bar", {
      colour: "#459d1c"
    });

    $(".peity_bar_bad span").peity("bar", {
      colour: "#ba1e20"
    });

    $(".peity_bar_neutral span").peity("bar", {
      colour: "#757575"
    });
  },
}
