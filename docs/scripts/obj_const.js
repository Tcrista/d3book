// Create svg and initial bars

  var dur2 = 0;
   
  d3.selectAll("input.oc")
    .on("click", function() {
					dur2 = +d3.select(this).node().value;
			  });

  var svg2 = d3.select("#chart2")
    .append("svg")
      .attr("width", w)
      .attr("height", h);

  svg2.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", w)
      .attr("height", h)
      .attr("fill", "lightblue");

  var bardata2 = [300, 100, 150, 220, 70, 270]
      .map((value, key) => ({key, value}));

  var xScale2 = d3.scaleBand()
      .domain(d3.range(bardata2.length))
      .range([0, innerWidth])
      .paddingInner(.1);

  var yScale2 = d3.scaleLinear()
      .domain([0, d3.max(bardata2, d => d.value)])  // CHANGE
      .range([innerHeight, 0]);

  var xAxis2 = d3.axisBottom()
      .scale(xScale2);

  var yAxis2 = d3.axisLeft()
      .scale(yScale2);

  var bars = svg2.append("g")
      .attr("id", "plot")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
    .selectAll("rect")
      .data(bardata2, d => d.key);

  bars.enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => xScale2(i))
      .attr("y", d => yScale2(d.value))
      .attr("width", xScale2.bandwidth())
      .attr("height", d => innerHeight - yScale2(d.value))
      .attr("fill","blue");

  svg2.append("g")
      .attr("class", "xAxis2")
      .attr("transform", `translate (${margin.left}, ${h - margin.bottom})`)
      .call(xAxis2);

  svg2.append("g")
      .attr("class", "yAxis2")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
      .call(yAxis2);

// General Update Pattern

  function update(data, exitpos2) {

    xScale2.domain(d3.range(data.length));

    yScale2.domain([0, d3.max(data, d => d.value)]);

    var bars = svg2.select("#plot")
         .selectAll("rect")
        .data(data, d => d.key);

    bars.enter().append("rect")
        .attr("x", w)
        .attr("y", d => yScale2(d.value))
        .attr("width", xScale2.bandwidth())
        .attr("height", d => innerHeight - yScale2(d.value))
        .attr("fill", "blue")
      .merge(bars)
        .transition()
        .duration(dur2)
        .ease(d3.easeLinear)
        .attr("x", (d, i) => xScale2(i))
        .attr("y", d => yScale2(d.value))
        .attr("width", xScale2.bandwidth())
        .attr("height", d => innerHeight - yScale2(d.value))

    bars.exit()
      .transition()
        .duration(dur2)
        .attr("x", exitpos2)
        .remove();

    svg2.select(".xAxis2")
      .transition()
        .duration(dur2)
        .ease(d3.easeLinear)
        .call(xAxis2);

    svg2.select(".yAxis2")
      .transition()
        .duration(dur2)
        .ease(d3.easeLinear)
        .call(yAxis2);

  }

      d3.selectAll("p.oc")
        .on("click", function () {

      var paraID2 = d3.select(this).attr("id");

      if (paraID2 == "add2") {
          var newvalue = Math.floor(Math.random()*400);
          var newkey = bardata2[bardata2.length-1].key + 1;
          bardata2.push({key: newkey, value: newvalue } );
      } else if (paraID2 == "remove_left2") {
          bardata2.shift();
          var exitpos2 = -xScale2.bandwidth();
      } else {
          bardata2.pop();
          var exitpos2 = w;
      };

      update(bardata2, exitpos2);

    });

