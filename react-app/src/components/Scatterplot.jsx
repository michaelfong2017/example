import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

const Scatterplot = (props) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (props.data && d3Container.current) {
      const svg = d3.select(d3Container.current);
      // set the dimensions and margins of the graph
      var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 800,
        height = 400;

      // append the svg object to the body of the page
      svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //Read the data
      var data = props.data
        .filter((d) => {
          return d.name_ch != null && d.name_en != null;
        })
        .map((d) => {
          return {
            coord1D: d.coord1D,
            coord2D: d.coord2D,
          };
        });
      console.log(data);

      // svg background select nothing when clicked
      svg
        .select("rect")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("opacity", 0)
        .on("click", (d, i) => {
          props.onChangeLegislator(null);
        });

      // Add X axis
      var x = d3.scaleLinear().domain([-1, 1]).range([0, width]);
      svg
        .select("g")
        .select("g .x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear().domain([-0.5, 0.5]).range([height, 0]);
      svg.select("g").select("g .y-axis").call(d3.axisLeft(y));

      // Add chart body
      var chartBody = svg
        .select("g")
        .select("g .chart-body")
        .attr("width", width)
        .attr("height", height);

      var update = chartBody.selectAll("circle").data(data);

      update
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          console.log(d);
          return x(d.coord1D == null ? 0 : d.coord1D);
        })
        .attr("cy", function (d) {
          return y(d.coord2D == null ? 0 : d.coord2D);
        })
        .attr("r", 2)
        .style("fill", "#fc7f03")
        .style("opacity", 1)
        .on("click", (d, i) => {
          props.onChangeLegislator(i);
        });

      update.exit().remove();
    }
  }, [props.data, d3Container.current]);

  return (
    <svg className="d3-component" ref={d3Container}>
      <rect class="svg-background"></rect>
      <g>
        <g class="x-axis"></g>
        <g class="y-axis"></g>
        <g class="chart-body"></g>
      </g>
    </svg>
  );
};

export default Scatterplot;
