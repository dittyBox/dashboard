"use client"
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface Props {
  window?: () => Window;
  scoreGaugeProps: scoreGaugeProps;
}

export default function ScoreGauge(props: Props){

  const svgRef = useRef(null);

  const config = props.scoreGaugeProps.config;
  const elementID = props.scoreGaugeProps.elementID;
  const value = props.scoreGaugeProps.dataSet;
  const TEXTGAP = props.scoreGaugeProps.config.TEXTGAP;

  const [datas, setData] = useState(props.scoreGaugeProps.dataSet);
  const [svgWidth, setSvgWidth] = useState(config.width);
  const [svgHeight, setSvgHeight] = useState(config.height);
  
  useEffect(()=>{
    const svg = d3.select(svgRef.current);
    svg
    .attr("viewBox", [0, 0, svgWidth, svgHeight])
    .style("overflow", "visible");

    svg.selectAll("g").remove();

    setSvgWidth(config.width);
    setSvgHeight(config.height);
    setData(props.scoreGaugeProps.dataSet);

    const outerRadius = Math.min(svgWidth, svgHeight) / 2;
    const innerRadius = outerRadius * .5;
    const colorSet = d3.scaleOrdinal(d3.schemeCategory10);

    const vis = svg.append("g")
      .attr("transform", "translate(" + svgWidth / 2 + "," + (svgHeight / 2 - 40) + ")")
      .data([datas])

    const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

    const pie = d3.pie().value((d)=>d.value)

    const arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class","slice");

    arcs.append("path")
      .attr("d",arc)
      .attr("fill",(d,i)=>colorSet(i));

      const angle = (d) => {
        let a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
        return a > 90 ? a - 180 : a;
      }
    arcs.append("text")
      .attr("dy",".35em")
      .attr("text-anchor","middle")
      .attr("transform", (d)=>`translate(${arc.centroid(d)})rotate(${angle(d)})`)
      .attr("fill", (d)=>d.data.color)
      .text((d)=>d.data.value)

    arcs.append("g")
      .append("rect")
      .attr("transform", "translate(" + -(svgWidth / 2) + "," + (outerRadius + 10) + ")")
      .attr("width", outerRadius * 2)
      .attr("height", (svgHeight - outerRadius - 40))
      .attr("fill", "rgb(0,0,0,0.1)")
      .attr('stroke', 'rgb(0,0,0,0.5)')
      .attr('stroke-width', '.3')

      const textWt = (d: any, i: number) => {
        let xGep = 20;
        let yGep = 30;
        let q = i % 2;
        xGep = q == 0 ? xGep : xGep + (svgWidth / 2);
        yGep = i <= 1 ? yGep : i <= 3 ? yGep + 30 : yGep + 60;

        let x = -(svgWidth / 2) + xGep;
        let y = (outerRadius + yGep);
        const rturnArr = [x,y];

        arcs.append("circle")
          .attr("cx", x- 10)
          .attr("cy", y - 6)
          .attr("r", 7)
          .style("fill", colorSet(i));

        return rturnArr;
      }

      const textTitleWt = (d: any, i: number) => {
        let x = -(svgWidth / 2);
        let y = (outerRadius + 10);
        const rturnArr = [x,y];

        return rturnArr;
      }

    arcs.append("g")
      .append("text")
      .attr("text-anchor","start")
      .attr("transform", (d, i)=>`translate(${textWt(d, i)})`)
      .text((d)=>d.data.name)
      .attr("fill", "rgb(255,255,255)")


  },[props])

  return (
    <>
    <svg id={elementID} ref={svgRef}>
    </svg>
    </>
  )
}