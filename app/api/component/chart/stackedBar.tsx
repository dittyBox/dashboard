"use client"
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface Props {
  window?: () => Window;
  stackedBarProps: stackedBarProps;
}
//https://observablehq.com/@baxtea/stacked-bar
//https://observablehq.com/@jjsiman/binary-timeline
//https://observablehq.com/d/c335f84596ce9f03
//https://observablehq.com/@observablehq/plot-grouped-bar-chart

export default function StackedBar(props: Props) {
  const config = props.stackedBarProps.config;
  const elementID = props.stackedBarProps.elementID;
  const dataSet = props.stackedBarProps.data;
  const margin = props.stackedBarProps.config.margin;

  const [svgWidth, setSvgWidth] = useState(config.width);
  const [svgHeight, setSvgHeight] = useState(config.height);
  const [datas,setDatas] = useState(dataSet);
  const [columns,setColumns] = useState(config.columns);

  const svgRef = useRef(null);

  useEffect(()=>{
    setDatas(dataSet);
    setColumns(config.columns);

    const svg = d3.select(svgRef.current);
    svg
    .attr("viewBox", [0, 0, svgWidth, svgHeight]);
    
    svg.selectAll("g").remove();
    columns.map((e)=>{
      e.data = datas.filter((f)=>f.id == e.id);
      return e;
    })
    
    const x = d3.scaleBand()
    .domain(dataSet.map((d:any) => d.day))
    .range([margin.left, svgWidth - margin.right])
    .padding(0.5)

    const y = d3.scaleLinear()
    .domain([0, 300])
    //.domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    .rangeRound([svgHeight - margin.bottom, margin.top])

    const xAxis = (g: any) => g
    .attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    // .call(g => g.selectAll(".domain").remove()) //Gets rid of border line

    const yAxis = (g: any) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickValues(d3.range(0, 301, 30)))

    const bars = svg.append("g")
      .attr("class", "bars");
      const s = bars.selectAll("g").data(columns)
      .join("g")
        .attr("class", "series")
        .attr("fill", d => d.color)
        .selectAll("rect")
        .data((d:any) => d)
      // .join("rect") //recall (0,0) is top left corner, thus:
      //   .attr("x", d => x(d.data.day))
      //   .attr("y", d => y(d[1])) //y-coordinate determined by top of bar
      //   .attr("height", d => y(d[0]) - y(d[1])) //height is bottom - top
      //   .attr("width", x.bandwidth())
      // .append("title") //Useful for tooltips/accessibility.
      //   .text(d  => `${d.data.day} ${d.key}: ${d.data[d.key]} hours`);


      const xAx = svg.append("g").call(xAxis);
      const yAx = svg.append("g").call(yAxis);

    // X축

    // X축 TEXT

    // x축 Title
    // const xTitle = svg.append("g")
    // .append("text")
    // .attr("transform", "rotate(-90)")
    // .attr("y", -5)
    // .attr("x", -svgHeight/2)
    // .attr("dy", "1em")
    // .style("text-anchor", "middle")
    // .text("Minutes");

    // Y축

    // Y축 TEXT

    // Y축 Title

    // Bar Data

  }, [props, dataSet, config])

  return (
    <>
      <svg id={elementID} ref={svgRef}>
      </svg>
    </>
  );
}