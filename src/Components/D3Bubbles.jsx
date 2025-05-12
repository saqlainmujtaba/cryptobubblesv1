import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "../Styles/d3bubbles.css";
// import faker from 'faker';

const generateBubbles = (count = 50) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    name: `COIN${i}`,
    value: Math.floor(Math.random() * 100),
    r: Math.random() * 40 + 20,
  }));

const D3Bubbles = () => {
  const svgRef = useRef();
  const [bubbles] = useState(generateBubbles(100)); // initial static dataset

  useEffect(() => {
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous elements

    const simulation = d3
      .forceSimulation(bubbles)
      .force(
        "x",
        d3
          .forceX()
          .strength(0.1)
          .x(() => Math.random() * width)
      )
      .force(
        "y",
        d3
          .forceY()
          .strength(0.1)
          .y(() => Math.random() * height)
      )
      .force(
        "collision",
        d3.forceCollide().radius((d) => d.r + 4)
      )
      .on("tick", ticked);
    const node = svg
      .selectAll("g")
      .data(bubbles)
      .join("g")
      .attr("class", "bubble");
    const defs = svg.append("defs");

    bubbles.forEach((d) => {
      const gradient = defs
        .append("radialGradient")
        .attr("id", `grad-${d.id}`)
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%");

      gradient
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "transparent");

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d.value >= 0 ? "limegreen" : "red");
    });
    node
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d) => `url(#grad-${d.id})`)
      .attr("stroke", "none"); // Optional: remove stroke for a cleaner radial look

    // node
    //   .append("circle")
    //   .attr("r", (d) => d.r)
    //   .attr("fill", "transparent") // Transparent background
    //   .attr("stroke", (d) => (d.value >= 0 ? "limegreen" : "red"))
    //   .attr("stroke-width", 2);

    node
      .append("text")
      .text((d) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("pointer-events", "none")
      .style("fill", "#fff")
      .style("font-size", "10px");
    const drag = d3
      .drag()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag);

    // function ticked() {
    //   node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    // }
    function ticked() {
      node.attr("transform", (d) => {
        // Clamp to keep bubbles inside bounds
        d.x = Math.max(d.r, Math.min(width - d.r, d.x));
        d.y = Math.max(d.r, Math.min(height - d.r, d.y));
        return `translate(${d.x},${d.y})`;
      });
    }

    return () => simulation.stop();
  }, [bubbles]);

  return (
    <div className="bubble-container">
      <div className="bubbles">
        <svg ref={svgRef} width="100%" height="100%" />
      </div>
    </div>
  );
};

export default D3Bubbles;
