"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Definindo as dimensões do gráfico
const WIDTH = 500;
const HEIGHT = 300;

const BarChart: React.FC = () => {
  const d3Container = useRef<SVGSVGElement | null>(null); // Referência tipada para o SVG

  useEffect(() => {
    // Dados do gráfico
    const data: number[] = [25, 30, 45, 60, 20, 65, 75];

    // Se o SVG existir, renderizar com D3
    if (d3Container.current) {
      // Selecionar o contêiner SVG
      const svg = d3
        .select(d3Container.current)
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .style("background-color", "#f9f9f9");

      // Escalas
      const xScale = d3
        .scaleBand<number>()
        .domain(data.map((_, i) => i)) // Índices como domínio
        .range([0, WIDTH])
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data) || 0]) // Garante que não seja null/undefined
        .range([HEIGHT, 0]);

      // Limpar elementos antigos antes de desenhar novos
      svg.selectAll("*").remove();

      // Criar barras
      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (_, i) => xScale(i) || 0)
        .attr("y", (d) => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => HEIGHT - yScale(d))
        .attr("fill", "steelblue")
        .on("mouseover", function () {
          d3.select(this).attr("fill", "orange");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "steelblue");
        });
    }
  }, []);

  return (
    <div>
      <h2>Gráfico de Barras com React + D3.js (TypeScript)</h2>
      <svg ref={d3Container} />
    </div>
  );
};

export default BarChart;
