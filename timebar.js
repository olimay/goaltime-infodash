/***
 * Copyright 2015 Oliver P. Mayor
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
***/
var timebar = {
  init : function(group, barHeight, width, margin) {
    var DEFAULT_MARGIN = 10;

    this.group = group;
    this.barHeight = barHeight;
    this.width = width;

    this.margin = {};
    this.margin.right = (typeof(margin.right) == Number) ?
      margin.right : DEFAULT_MARGIN;
    this.margin.left = (typeof(margin.left) == Number) ?
      margin.left : DEFAULT_MARGIN;
    this.margin.bottom = (typeof(margin.bottom) == Number) ?
      margin.bottom : DEFAULT_MARGIN;
    this.margin.top = (typeof(margin.top) == Number) ?
      margin.top : DEFAULT_MARGIN;
  },

  update : function(data, timescale) {
    var barSpacing = 1;
    var barHeight = this.barHeight;

    console.log("width", this.width, this.margin.left, this.margin.right);
    console.log("height", this.barHeight, data.length, this.margin.top, this.margin.bottom);
    console.log("group:" + this.group,"data", data);
    var width = this.width - this.margin.left - this.margin.right,
        height = this.barHeight * data.length - this.margin.top - this.margin.bottom;

    var x = d3.scale.linear()
      .domain([0, timescale])
      .range([0,width]);

    var chart = d3.select(".chart")
      .attr("width", width + this.margin.left + this.margin.right)
      .attr("height", height + this.margin.top + this.margin.bottom);
   
    var bar = chart.selectAll("g." + this.group)
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d, i) {
        console.log("i", i, barHeight);
        return "translate(0," + i * barHeight + ")";
      });

    bar.append("rect")
      .attr("class", this.group)
      .attr("width", function(d) { console.log(d.value); return x(d.value) } )
      .attr("height", barHeight - 1);
  }
}

function type(d) {
  d.value = +d.value;
  return d;
}
