// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 70},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%Y-%m-%d");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var valueline2 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.open); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(".vis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("richard iii house of cards.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
      d.open = +d.open;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) {
    return Math.max(d.close, d.open); })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the valueline2 path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "red")
      .attr("d", valueline2);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  svg.append("text")
      .attr("transform",
            "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Date");

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Interest (Google)"); 

  svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 8))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Richard III vs. House of Cards (2013)");

  svg.append("text")
    .attr("transform", "translate(" + (width-150) + "," + y(25) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "red")
    .text("House of Cards");

  svg.append("text")
    .attr("transform", "translate(" + (width-150) + "," + y(8) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "steelblue")
    .text("Richard III");

});
