"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CircleWithNodes: React.FC = () => {
  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 1000;
    const height = 800;
    const centerX = width / 2;
    const centerY = height / 2;

    const innerRadius = 100; // Raio do círculo interno
    const middleRadius = 200; // Raio do círculo médio
    const outerRadius = 300; // Raio do círculo mais externo

    const innerNumNodes = 6;
    const middleNumNodes = 8;
    const outerNumNodes = 24;

    const svg = d3
      .select(d3Container.current)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#f9f9f9");

    svg.selectAll("*").remove();

    const generateCirclePoints = (radius: number, numPoints: number) =>
      d3.range(numPoints).map((i) => {
        const angle = (2 * Math.PI * i) / numPoints;
        return {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
        };
      });

    const allNodes = [
      ...generateCirclePoints(innerRadius, innerNumNodes).map((d) => ({
        ...d,
        type: "inner",
      })),
      ...generateCirclePoints(middleRadius, middleNumNodes).map((d) => ({
        ...d,
        type: "middle",
      })),
      ...generateCirclePoints(outerRadius, outerNumNodes).map((d) => ({
        ...d,
        type: "outer",
      })),
    ];

    const numConnections = 50;
    const connections = d3.range(numConnections).map(() => {
      const source = allNodes[Math.floor(Math.random() * innerNumNodes)];
      const target = allNodes[Math.floor(Math.random() * allNodes.length)];
      return { source, target };
    });

    const connectionLines = svg
      .selectAll(".connection")
      .data(connections)
      .enter()
      .append("line")
      .attr("class", "connection")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)
      .attr("stroke", "gray")
      .attr("stroke-width", 2)
      .attr("opacity", 1);

    const nodeCircles = svg
      .selectAll(".node")
      .data(allNodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 8)
      .attr("fill", (d) => {
        if (d.type === "inner") return "red";
        if (d.type === "middle") return "green";
        return "blue";
      })
      .on("mouseenter", function (event, d) {
        if (d.type === "inner") {
          // Destacar as linhas conectadas
          connectionLines.attr("opacity", (c) =>
            c.source === d || c.target === d ? 1 : 0.1
          );

          // Destacar o nó interno e deixar os outros opacos
          nodeCircles.attr("opacity", (n) =>
            n === d ||
            connections.some(
              (c) =>
                (c.source === d || c.target === d) &&
                (c.source === n || c.target === n)
            )
              ? 1
              : 0.1
          );
        }
      })
      .on("mouseleave", () => {
        // Resetar todas as opacidades
        connectionLines.attr("opacity", 1);
        nodeCircles.attr("opacity", 1);
      });
  }, []);

  return (
    <div>
      <h2>Círculos com Conexões Aleatórias e Hover</h2>
      <svg ref={d3Container} />
    </div>
  );
};

export default CircleWithNodes;
