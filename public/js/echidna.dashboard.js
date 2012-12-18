function DashboardCtrl( $scope, echidnaService ) {


  //
  // PRIVATE FUNCTIONS
  $scope._initCharts = function() {
    $scope.chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart_events_collectors',
            type: 'spline',
            marginRight: 160,
            marginBottom: 48
        },
        title: {
            text: 'Events v Collectors',
            x: -20 //center
        },
        xAxis: {
            title: {
              text: 'Month'
            },
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Events'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
           }],
                       min: 0
        },
        tooltip: {
            formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                    this.x +': '+ this.y +' events';
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: 10,
            borderWidth: 0
        },
        series: [{
            name: 'snort@prometheus',
            data: [70, 6, 95, 145, 182, 21, 25, 265, 233, 183, 19, 96]
        }, {
            name: 'sagan@prometheus',
            data: [2, 8, 57, 113, 170, 20, 248, 241, 21, 141, 86, 25]
        }, {
            name: 'snort@thor',
            data: [9, 60, 35, 84, 15, 170, 16, 19, 143, 90, 3, 10]
        }, {
            name: 'sagan@thor',
            data: [39, 4, 57, 85, 19, 152, 10, 166, 14, 103, 6, 86]
        }]
    });
  };


  //
  // INIT
  echidna.peity();
  $scope._initCharts();
  echidnaService.setPage('dashboard');
};


// TODO: componentify this bad boy
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


