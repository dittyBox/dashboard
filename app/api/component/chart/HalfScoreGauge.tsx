"use client"
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface Props {
  window?: () => Window;
  halfScorefGaugeProps: halfScorefGaugeProps;
}

export default function HalfScoreGauge(props: Props){

  const svgRef = useRef(null);

  const config = props.halfScorefGaugeProps.config;
  const elementID = props.halfScorefGaugeProps.elementID;
  const value = props.halfScorefGaugeProps.data;

  const [datas, setData] = useState(value);
  
  useEffect(()=>{

    setData(props.halfScorefGaugeProps.data);

    const arcThickness = props.halfScorefGaugeProps.config.arcThickness;
    const arcSize = props.halfScorefGaugeProps.config.arcSize;
    const size = props.halfScorefGaugeProps.config.size;
    const halfGaugeScore = props.halfScorefGaugeProps.gaugeScore;
    const transitionDuration = props.halfScorefGaugeProps.config.transitionDuration;
    const prefix = props.halfScorefGaugeProps.config.prefix;
    const titleSize = props.halfScorefGaugeProps.config.titleSize;
    const scoreColorSet = props.halfScorefGaugeProps.config.scoreColorSet;

    const svgOrg = d3.select(svgRef.current)
      .classed("category-gauge", true)
      .attr("viewBox", [-size / 2, -size / 2 - 40, size, size]);
      
    svgOrg.selectAll("g").remove();

    const svg = svgOrg.append("g");

    const colorScale = d3.scaleLinear()
    .domain([0, Math.ceil((halfGaugeScore.length-1)/2), halfGaugeScore.length-1])
    .range(scoreColorSet);

    const labelSize = arcThickness / 3;
    const t = d3.transition().duration(350);
    const arc = d3
      .arc()
      .innerRadius(arcSize / 2 - arcThickness)
      .outerRadius(arcSize / 2)
      .cornerRadius(0);

    const pie = d3
      .pie()
      .value((d: any) => d.value)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2)
      .sort((a: any, b: any) => d3.ascending(a.sortIndex, b.sortIndex));

    const initData = pie(JSON.parse(JSON.stringify(halfGaugeScore)));
    const arcs = pie(JSON.parse(JSON.stringify(halfGaugeScore)));

    const arcNeedle = d3
      .arc()
      .innerRadius(arcSize / 2 - arcThickness * 0.85)
      .outerRadius(10);

    svgOrg.append("g")
      .attr("transform", "translate(0,40)")
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.5em")
      .attr("font-size", `${titleSize}px`)
      .style("fill", config.textColor)
      .text(`${datas}${prefix}`);

    function needleArcTween(d: any) {
      var interpolateStart = d3.interpolate(-Math.PI / 2, d.startAngle);
      var interpolateEnd = d3.interpolate(
        -Math.PI / 2 + (d.endAngle - d.startAngle),
        d.endAngle
      );

      return function (t: any) {
        d.startAngle = interpolateStart(t);
        d.endAngle = interpolateEnd(t);

        return arcNeedle(d);
      };
    }

    // svg
    // .append("defs")
    // .html(
    //   `<filter id="dot-shadow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox"><feDropShadow dx="3" dy="3" stdDeviation="8" flood-color="${initData[0].data.fill}" flood-opacity="0.25" /></filter>`
    // );

    const gaugeArcs = svg
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", (d) => colorScale(d.data.sortIndex))
      .attr("id", (d, i) => `path-${i}`)
      .attr("d", arc);

    const interpolate = d3.interpolate(arcs[0].startAngle, arcs[arcs.length-1].endAngle);
    const needleCenterAngle = interpolate(datas/100);

    const needleArcData = [
      {
        startAngle: needleCenterAngle - (3 * Math.PI) / 180,
        endAngle: needleCenterAngle + (3 * Math.PI) / 180
      }
    ];
    //console.log((3 * Math.PI) / 180);
    const needleArc = svg
      .selectAll("path.needle")
      .data(needleArcData)
      .join("path")
      .classed("needle", true)
      .attr("fill", "#fff")
      .attr("d", arcNeedle);

    needleArc
      .transition()
      .duration(transitionDuration)
      .attrTween("d", (d, i) => needleArcTween(d));

    // Add a dot to mark the needle anchor
    const needleDot = svg
      .selectAll("circle")
      .data([
        Object.assign(initData[0], {
          startAngle: initData[0].endAngle,
          endAngle: initData[1].startAngle,
          stroke: "#fff"
        })
      ])
      .join("circle")
      .attr("fill", "#3f51b5")
      .attr("r", 10)
      .attr("stroke", (d) => d.stroke)
      .attr("stroke-width", 10);



  },[props])

  return (
    <>
    <svg id={elementID} ref={svgRef}>
    </svg>
    </>
  )
}