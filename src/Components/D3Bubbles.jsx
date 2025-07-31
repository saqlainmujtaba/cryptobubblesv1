import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "../Styles/d3bubbles.css";

const D3Bubbles = () => {
  const svgRef = useRef();
  const [allCoins, setAllCoins] = useState([]);

  // Fetch coins on mount
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
        );
        const data = await response.json();
        setAllCoins(data);
      } catch (err) {
        console.error("Failed to fetch coin data", err);
      }
    };

    fetchCoins();
  }, []);

  useEffect(() => {
    if (!allCoins.length) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create bubble data
    const bubbles = allCoins.map((coin) => ({
      id: coin.id,
      name: coin.symbol.toUpperCase(),
      value: coin.market_cap,
      change: coin.price_change_percentage_24h_in_currency,
      image: coin.image,
      r: 20 + (Math.abs(coin.price_change_percentage_24h_in_currency || 0) * 22),
      x: Math.random() * width,
      y: Math.random() * height,
    }));

    // Create simulation with random spread
    const simulation = d3
      .forceSimulation(bubbles)
      .force("x", d3.forceX((d) => d.x).strength(0.05))
      .force("y", d3.forceY((d) => d.y).strength(0.05))
      .force(
        "collision",
        d3.forceCollide().radius((d) => d.r + 1.5)
      )
      .on("tick", ticked);

    // Append defs for radial gradients
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
        .attr("stop-color", d.change >= 0 ? "#4CAF50" : "#f44336");
      defs
        .append("clipPath")
        .attr("id", `clip-${d.id}`)
        .append("circle")
        .attr("r", d.r * 0.7)
        .attr("cx", 0)
        .attr("cy", 0);
    });

    // Create node groups
    const node = svg
      .selectAll("g")
      .data(bubbles)
      .join("g")
      .attr("class", "bubble");

    // Tooltip
    node
      .append("title")
      .text(
        (d) =>
          `${
            d.name
          }\nMarket Cap: $${d.value.toLocaleString()}\nChange: ${d.change?.toFixed(
            2
          )}%`
      );

    // Bubble background
    node
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d) => `url(#grad-${d.id})`)
      .attr("stroke", "none");
// Create a group for the content to position it vertically
  const contentGroup = node.append("g")
    .attr("transform", (d) => `translate(0, ${-d.r * 0.5})`); // Move content up by half the radius

  // Coin image inside bubble - now positioned at the top
  contentGroup
    .append("image")
    .attr("xlink:href", (d) => d.image)
    .attr("width", (d) => d.r * 1.0) // Slightly smaller image
    .attr("height", (d) => d.r * 1.0)
    .attr("x", (d) => -d.r * 0.5) // Centered horizontally
    .attr("y", (d) => -d.r * 0.6) // Positioned at the top
    .attr("clip-path", (d) => `url(#clip-${d.id})`)
    .style("pointer-events", "none");

  // Symbol text - positioned below image
  contentGroup
    .append("text")
    .text((d) => d.name)
    .attr("text-anchor", "middle")
    .attr("dy", (d) => d.r * 0.4) // Position below image
    .style("pointer-events", "none")
    .style("fill", "#fff")
    .style("font-size", (d) => `${Math.max(8, d.r / 3)}px`);

  // Change % text - positioned below symbol
  contentGroup
    .append("text")
    .text((d) => `${d.change?.toFixed(1)}%`)
    .attr("text-anchor", "middle")
    .attr("dy", (d) => d.r * 0.7) // Position below symbol
    .style("pointer-events", "none")
    .style("fill", "#fff")
    .style("font-size", (d) => `${Math.max(8, d.r / 3.5)}px`);
    
    // // Coin image inside bubble
    // // node
    // //   .append("image")
    // //   .attr("xlink:href", (d) => d.image)
    // //   .attr("width", (d) => d.r * 1)
    // //   .attr("height", (d) => d.r * 1)
    // //   .attr("x", (d) => -d.r * 0.5)
    // //   .attr("y", (d) => -d.r * 0.85)
    // //   .attr("clip-path", (d) => `url(#clip-${d.id})`)
    // //   .style("pointer-events", "none");

      
    // // Symbol text
    // node
    //   .append("text")
    //   .text((d) => d.name)
    //   .attr("text-anchor", "middle")
    //   .attr("dy", "-0.2em")
    //   .style("pointer-events", "none")
    //   .style("fill", "#fff")
    //   .style("font-size", (d) => `${Math.max(8, d.r / 3)}px`);

    // // Change % text
    // node
    //   .append("text")
    //   .text((d) => `${d.change?.toFixed(1)}%`)
    //   .attr("text-anchor", "middle")
    //   .attr("dy", "1.1em")
    //   .style("pointer-events", "none")
    //   .style("fill", "#fff")
    //   .style("font-size", (d) => `${Math.max(8, d.r / 3.5)}px`);

    // Drag behavior
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

    // Tick function
    function ticked() {
      node.attr("transform", (d) => {
        d.x = Math.max(d.r, Math.min(width - d.r, d.x));
        d.y = Math.max(d.r, Math.min(height - d.r, d.y));
        return `translate(${d.x},${d.y})`;
      });
    }

    return () => simulation.stop();
  }, [allCoins]);

  return (
    <div className="bubble-container">
      <div className="bubbles">
        <svg ref={svgRef} width="100%" height="100%" />
      </div>
    </div>
  );
};

export default D3Bubbles;
