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

  setInterval(function() {
    $giantText.css('color', getColor);
  }, 3000);




  /**
   * D3 Stuff
   */
  /**********************************************************************************
   * Example1
   *********************************************************************************/
  (function() {

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
      .style("width", function(d, i) {
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
      .remove();

  }

  // Artificial Dynamic Data
  $dataToggleExample1.on("click", function(e) {
    e.preventDefault();
    if (toggleStateExample1) {
      clearInterval(intervalExample1);
      toggleStateExample1 = false;
      $(this).removeClass('on');
    } else {
      intervalExample1 = setInterval(function() {
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

  (function() {
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
        return (d.expense * 8) + "px";}
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

  $('#example2 .filters .category').on("click", function(e) {
    select($(this).attr('data-filter'));
  });

  })();







  /**********************************************************************************
   * Example3
   *********************************************************************************/

  (function() {
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

    $('#example3 .sorters button').on("click", function(e) {
      sort($(this).attr('data-comparator'));
    });

  })();








  /**********************************************************************************
   * Example4
   *********************************************************************************/

  (function() {

    var data = [
      {width: 10, color: 23},{width: 15, color: 33},
      {width: 30, color: 40},{width: 50, color: 60},
      {width: 80, color: 22},{width: 65, color: 10},
      {width: 55, color: 5},{width: 30, color: 30},
      {width: 20, color: 60},{width: 10, color: 90},
      {width: 8, color: 10}
    ];
    var intervalExample4;
    var $dataToggleExample4 = $('#example4 .data-toggle');
    var toggleStateExample4 = false;

    var colorScale = d3.scale.linear()
      .domain([0,100])
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
        .style("width", function(d) {
          return (d.width * 8) + "px";
        })
        .style("background-color", function(d) {
          return colorScale(d.color);
        })
        .select("span")
        .text(function(d) {
          return d.width;
        });

    }

    function randomValue() {
      return Math.round(Math.random() * 100);
    }

    // Artificial Dynamic Data
    $dataToggleExample4.on("click", function(e) {
      e.preventDefault();
      if (toggleStateExample4) {
        clearInterval(intervalExample4);
        toggleStateExample4 = false;
        $(this).removeClass('on');
      } else {
        intervalExample4 = setInterval(function() {
          data.shift();
          data.push({ width: randomValue(), color: randomValue()});
          render(data);
        }, 1200);
        toggleStateExample4 = true;
        $(this).addClass('on');
      }
    });

    render(data);

  })();







});