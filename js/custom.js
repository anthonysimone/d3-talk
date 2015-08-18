/**
 * Some random custom things
 */


$(document).ready(function() {

  var colors = ['#B76895', '#FB4700', '#A45ECB', '#231FE8', '#3A9874', '#92EC37', '#FFED2C', '#FFCA2C'];
  var currentColor;
  var $giantText = $('.giant');

  function testColor(color1, color2) {
    return (color1 === color2) ? true : false;
  }

  function getColor() {
    var color = colors[Math.floor(Math.random() * colors.length)];
    return (testColor(currentColor, color)) ? getColor() : currentColor = color;
  }

  setInterval(function () {
    $giantText.css('color', getColor);
  }, 3000);


  /**
   * D3 Stuff
   */
  /**********************************************************************************
   * Example1
   *********************************************************************************/
  (function () {

    var data = [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8];
    var intervalExample1;
    var $dataToggleExample1 = $('#example1 .data-toggle');
    var toggleStateExample1 = false;

    function render(data) {
      // Enter
      d3.select("#example1 .chart").selectAll("div.h-bar")
        .data(data)
        .enter()
        .append("div")
        .attr("class", "h-bar")
        .append("span");

      // Update
      d3.select("#example1 .chart").selectAll("div.h-bar")
        .data(data)
        .style("width", function (d, i) {
          return (d * 5) + "px";
        })
        .select("span")
        .text(function (d, i) {
          return d;
        });

      // Exit
      d3.select("#example1 .chart").selectAll("div.h-bar")
        .data(data)
        .exit()
      //.remove();

    }

    // Artificial Dynamic Data
    $dataToggleExample1.on("click", function (e) {
      e.preventDefault();
      if (toggleStateExample1) {
        clearInterval(intervalExample1);
        toggleStateExample1 = false;
        $(this).removeClass('on');
      } else {
        intervalExample1 = setInterval(function () {
          data.shift();
          data.push(Math.round(Math.random() * 100));
          render(data);
        }, 1200);
        toggleStateExample1 = true;
        $(this).addClass('on');
      }
    });

    render(data);
  })();


  /**********************************************************************************
   * Example2
   *********************************************************************************/

  (function () {
    var data = [
      {expense: 10, category: "Retail"},
      {expense: 15, category: "Gas"},
      {expense: 30, category: "Retail"},
      {expense: 50, category: "Dining"},
      {expense: 80, category: "Gas"},
      {expense: 65, category: "Retail"},
      {expense: 55, category: "Gas"},
      {expense: 30, category: "Dining"},
      {expense: 20, category: "Retail"},
      {expense: 10, category: "Dining"},
      {expense: 8, category: "Gas"}
    ];

    function render(data, category) {
      d3.select("#example2 .chart").selectAll("div.h-bar")
        .data(data)
        .enter()
        .append("div")
        .attr("class", "h-bar")
        .append("span");

      d3.select("#example2 .chart").selectAll("div.h-bar")
        .data(data)
        .exit().remove();

      d3.select("#example2 .chart").selectAll("div.h-bar")
        .data(data)
        .attr("class", "h-bar")
        .style("width", function (d) {
          return (d.expense * 8) + "px";
        }
      )
        .select("span")
        .text(function (d) {
          return d.category;
        });

      d3.select("#example2 .chart").selectAll("div.h-bar")
        .filter(function (d, i) {
          return d.category == category;
        })
        .classed("selected", true);
    }

    render(data);

    function select(category) {
      render(data, category);
    }

    $('#example2 .filters .category').on("click", function (e) {
      select($(this).attr('data-filter'));
    });

  })();


  /**********************************************************************************
   * Example3
   *********************************************************************************/

  (function () {
    var data = [
      {expense: 10, category: "Retail"},
      {expense: 15, category: "Gas"},
      {expense: 30, category: "Retail"},
      {expense: 50, category: "Dining"},
      {expense: 80, category: "Gas"},
      {expense: 65, category: "Retail"},
      {expense: 55, category: "Gas"},
      {expense: 30, category: "Dining"},
      {expense: 20, category: "Retail"},
      {expense: 10, category: "Dining"},
      {expense: 8, category: "Gas"}
    ];

    function render(data, comparator) {
      d3.select("#example3 .chart").selectAll("div.h-bar")
        .data(data)
        .enter().append("div")
        .attr("class", "h-bar")
        .append("span");

      d3.select("#example3 .chart").selectAll("div.h-bar")
        .data(data)
        .exit().remove();

      d3.select("#example3 .chart").selectAll("div.h-bar")
        .data(data)
        .attr("class", "h-bar")
        .style("width", function (d) {
          return (d.expense * 5) + "px";
        })
        .select("span")
        .text(function (d) {
          return d.category;
        });

      if (comparator)
        d3.select("#example3 .chart")
          .selectAll("div.h-bar")
          .sort(comparator);
    }

    var compareByExpense = function (a, b) {
      return a.expense < b.expense ? -1 : 1;
    };
    var compareByCategory = function (a, b) {
      return a.category < b.category ? -1 : 1;
    };

    render(data);

    function sort(comparator) {
      switch (comparator) {
        case 'compareByExpense':
          render(data, compareByExpense);
          break;
        case 'compareByCategory':
          render(data, compareByCategory);
          break;
        default:
          render(data);
          break;
      }
    }

    $('#example3 .sorters button').on("click", function (e) {
      sort($(this).attr('data-comparator'));
    });

  })();


  /**********************************************************************************
   * Example4
   *********************************************************************************/

  (function () {

    var data = [
      {width: 10, color: 23}, {width: 15, color: 33},
      {width: 30, color: 40}, {width: 50, color: 60},
      {width: 80, color: 22}, {width: 65, color: 10},
      {width: 55, color: 5}, {width: 30, color: 30},
      {width: 20, color: 60}, {width: 10, color: 90},
      {width: 8, color: 10}
    ];
    var intervalExample4;
    var $dataToggleExample4 = $('#example4 .data-toggle');
    var toggleStateExample4 = false;

    var colorScale = d3.scale.linear()
      .domain([0, 100])
      .range(["#add8e6", "blue"]);

    function render(data) {

      d3.select("#example4 .chart").selectAll("div.h-bar")
        .data(data)
        .enter().append("div")
        .attr("class", "h-bar")
        .append("span")

      d3.select("#example4 .chart").selectAll("div.h-bar")
        .data(data)
        .exit().remove();

      d3.select("#example4 .chart").selectAll("div.h-bar")
        .data(data)
        .attr("class", "h-bar")
        .style("width", function (d) {
          return (d.width * 8) + "px";
        })
        .style("background-color", function (d) {
          return colorScale(d.color);
        })
        .select("span")
        .text(function (d) {
          return d.width;
        });

    }

    function randomValue() {
      return Math.round(Math.random() * 100);
    }

    // Artificial Dynamic Data
    $dataToggleExample4.on("click", function (e) {
      e.preventDefault();
      if (toggleStateExample4) {
        clearInterval(intervalExample4);
        toggleStateExample4 = false;
        $(this).removeClass('on');
      } else {
        intervalExample4 = setInterval(function () {
          data.shift();
          data.push({width: randomValue(), color: randomValue()});
          render(data);
        }, 1200);
        toggleStateExample4 = true;
        $(this).addClass('on');
      }
    });

    render(data);

  })();


  /**********************************************************************************
   * Example5
   *********************************************************************************/

  (function () {

    var height = 500,
      width = 500,
      margin = 25,
      offset = 50,
      axisWidth = width - 2 * margin,
      svg;

    function createSvg() {
      svg = d3.select("#example5 .chart").append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);
    }

    function renderAxis(scale, i, orient) {
      var axis = d3.svg.axis()
        .scale(scale)
        .orient(orient)
        .ticks(5);

      svg.append("g")
        .attr("transform", function () {
          if (["top", "bottom"].indexOf(orient) >= 0)
            return "translate(" + margin + "," + i * offset + ")";
          else
            return "translate(" + i * offset + ", " + margin + ")";
        })
        .call(axis);
    }

    function renderAll(orient) {
      if (svg) svg.remove();

      createSvg();

      renderAxis(d3.scale.linear()
        .domain([0, 1000])
        .range([0, axisWidth]), 1, orient);
      renderAxis(d3.scale.pow()
        .exponent(2)
        .domain([0, 1000])
        .range([0, axisWidth]), 2, orient);
      renderAxis(d3.time.scale()
        .domain([new Date(2014, 0, 1), new Date()])
        .range([0, axisWidth]), 3, orient);
    }

    $('#example5 .control-group button').on("click", function (e) {
      e.preventDefault();
      renderAll($(this).attr('data-orient'));
    });

  })();


  /**********************************************************************************
   * Example6
   *********************************************************************************/

  (function () {

    var height = 500,
      width = 500,
      margin = 25,
      xAxis, yAxis, xAxisLength, yAxisLength;

    var svg = d3.select("#example6 .chart").append("svg")
      .attr("class", "axis")
      .attr("width", width)
      .attr("height", height);

    function renderXAxis() {
      xAxisLength = width - 2 * margin;

      var scale = d3.scale.linear()
        .domain([0, 100])
        .range([0, xAxisLength]);

      xAxis = d3.svg.axis()
        .scale(scale)
        .tickSubdivide(1)
        .orient("bottom");

      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", function () {
          return "translate(" + margin + "," + (height - margin) + ")";
        })
        .call(xAxis);
    }

    function renderYAxis() {
      yAxisLength = height - 2 * margin;

      var scale = d3.scale.linear()
        .domain([100, 0])
        .range([0, yAxisLength]);

      yAxis = d3.svg.axis()
        .scale(scale)
        .tickSubdivide(1)
        .orient("left");

      svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", function () {
          return "translate(" + margin + "," + margin + ")";
        })
        .call(yAxis);
    }

    function rescale() {
      var max = Math.round(Math.random() * 100);

      xAxis.scale().domain([0, max]);
      svg.select("g.x-axis")
        .transition()
        .duration(1000)
        .call(xAxis);

      yAxis.scale().domain([max, 0]);
      svg.select("g.y-axis")
        .transition()
        .duration(1000)
        .call(yAxis);

      renderXGridlines();
      renderYGridlines();
    }

    function renderXGridlines() {
      var lines = d3.selectAll("g.x-axis g.tick")
        .select("line.grid-line")
        .remove();

      lines = d3.selectAll("g.x-axis g.tick")
        .append("line")
        .classed("grid-line", true)

      lines.attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", -yAxisLength);
    }

    function renderYGridlines() {
      var lines = d3.selectAll("g.y-axis g.tick")
        .select("line.grid-line").remove();

      lines = d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)

      lines.attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", xAxisLength)
        .attr("y2", 0);
    }

    renderYAxis();
    renderXAxis();
    renderXGridlines();
    renderYGridlines();

    $('#example6 .control-group button').on("click", function (e) {
      e.preventDefault();
      rescale();
    });

  })();





  /**********************************************************************************
   * Example7
   *********************************************************************************/

  switch(window.location.protocol) {
    case 'http:':
    case 'https:':
      (function () {
        var width = 960,
          height = 500;

        var path = d3.geo.path();

        var svg = d3.select("#example7 .chart").append("svg")
          .attr("width", width)
          .attr("height", height);

        var g = svg.append('g')
          .call(
          d3.behavior.zoom()
            .scaleExtent([1, 10])
            .on("zoom", zoom)
        );


        d3.json("../data/us.json", function (error, topology) {
          g.selectAll("path")
            .data(topojson.feature(topology, topology.objects.states).features)
            .enter().append("path")
            .attr("d", path);
        });

        function zoom() {
          g.attr("transform", "translate("
            + d3.event.translate
            + ")scale(" + d3.event.scale + ")");
        }
      })();
      break;
    case 'file:':
      //local file
      break;
    default:
      break;
  }



  /**********************************************************************************
   * Example8
   *********************************************************************************/

  (function () {

    var id= 0,
      data = [],
      duration = 500,
      chartHeight = 200,
      chartWidth = 680;

    for(var i = 0; i < 20; i++) push(data);

    function render(data) {
      var selection = d3.select("#example8 .chart")
        .selectAll("div.v-bar")
        .data(data, function(d){return d.id;}); // <-A

      // enter
      selection.enter()
        .append("div")
        .attr("class", "v-bar")
        .style("position", "absolute")
        .style("top", chartHeight + "px")
        .style("left", function(d, i){
          return barLeft(i+1) + "px"; // <-B
        })
        .style("height", "0px") // <-C
        .append("span");

      // update
      selection
        .transition().duration(duration) // <-D
        .style("top", function (d) {
          return chartHeight - barHeight(d) + "px";
        })
        .style("left", function(d, i){
          return barLeft(i) + "px";
        })
        .style("height", function (d) {
          return barHeight(d) + "px";
        })
        .select("span")
        .text(function (d) {return d.value;})
        .style("font-size", "16px");

      // exit
      selection.exit()
        .transition().duration(duration) // <-E
        .style("left", function(d, i){
          return barLeft(-1) + "px"; //<-F
        })
        .remove(); // <-G
    }

    function push(data) {
      data.push({
        id: ++id,
        value: Math.round(Math.random() * chartHeight)
      });
    }

    function barLeft(i) {
      return i * (40 + 4);
    }

    function barHeight(d) {
      return d.value;
    }

    setInterval(function () {
      data.shift();
      push(data);
      render(data);
    }, 2000);

    render(data);

    d3.select("#example8 .chart")
      .append("div")
      .attr("class", "baseline")
      .style("position", "absolute")
      .style("top", chartHeight + "px")
      .style("left", "0px")
      .style("width", chartWidth + "px");


  })();

});