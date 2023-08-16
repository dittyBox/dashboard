"use client"
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface Props {
  window?: () => Window;
  halfGaugeProps: halfGaugeProps;
}

export default function HalfGauge(props: Props) {

  const svgRef = useRef(null);

  const config = props.halfGaugeProps.config;
  const elementID = props.halfGaugeProps.elementID;
  const value = props.halfGaugeProps.data;

  const [datas, setData] = useState(value);

  useEffect(() => {

    setData(props.halfGaugeProps.data);

    const arcThickness = props.halfGaugeProps.config.arcThickness;
    const arcSize = props.halfGaugeProps.config.arcSize;
    const size = props.halfGaugeProps.config.size;
    const halfGaugeScore = props.halfGaugeProps.gaugeScore;
    const transitionDuration = props.halfGaugeProps.config.transitionDuration;
    const titleSize = props.halfGaugeProps.config.titleSize;

    const svgOrg = d3.select(svgRef.current)
      .classed("category-gauge", true)
      .attr("viewBox", [-size / 2, -size / 2 - 40, size, size]);

    svgOrg.selectAll("g").remove();


    const svg = svgOrg.append("g");

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
      .innerRadius(0)
      .outerRadius(arcSize / 2 - arcThickness * 0.85);

    let highlightedArcData = arcs.filter((d) => d.data.selected)[0];
    highlightedArcData = highlightedArcData || arcs[0];

    svgOrg.append("g")
      .attr("transform", "translate(0,40)")
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.5em")
      .attr("font-size", `${titleSize}px`)
      .style("fill", config.textColor)
      .text(`${highlightedArcData.data.label}`);

    // Returns a tween for a transition’s "d" attribute, transitioning any selected
    // arcs from their current angle to the specified new angle.
    function arcTween(d, bIsLastArc) {
      // The function passed to attrTween is invoked for each selected element when
      // the transition starts, and for each element returns the interpolator to use
      // over the course of transition. This function is thus responsible for
      // determining the starting angle of the transition (which is pulled from the
      // element’s bound datum, d.endAngle), and the ending angle.

      // To interpolate between the two angles, we use the default d3.interpolate.
      // (Internally, this maps to d3.interpolateNumber, since both of the
      // arguments to d3.interpolate are numbers.) The returned function takes a
      // single argument t and returns a number between the starting angle and the
      // ending angle.
      var interpolateStart = d3.interpolate(-Math.PI / 2, d.startAngle);
      var interpolateEnd = d3.interpolate(
        bIsLastArc ? d.endAngle : -Math.PI / 2,
        d.endAngle
      );

      // The return value of the attrTween is also a function: the function that
      // we want to run for each tick of the transition. Because we used
      // attrTween("d"), the return value of this last function will be set to the
      // "d" attribute at every tick. (It’s also possible to use transition.tween
      // to run arbitrary code for every tick, say if you want to set multiple
      // attributes from a single function.) The argument t ranges from 0, at the
      // start of the transition, to 1, at the end.
      return function (t: any) {
        // Calculate the current arc angle based on the transition time, t. Since
        // the t for the transition and the t for the interpolate both range from
        // 0 to 1, we can pass t directly to the interpolator.
        //
        // Note that the interpolated angle is written into the element’s bound
        // data object! This is important: it means that if the transition were
        // interrupted, the data bound to the element would still be consistent
        // with its appearance. Whenever we start a new arc transition, the
        // correct starting angle can be inferred from the data.
        d.startAngle = interpolateStart(t);
        d.endAngle = interpolateEnd(t);

        // Lastly, compute the arc path given the updated data! In effect, this
        // transition uses data-space interpolation: the data is interpolated
        // (that is, the end angle) rather than the path string itself.
        // Interpolating the angles in polar coordinates, rather than the raw path
        // string, produces valid intermediate arcs during the transition.
        return arc(d);
      };
    }

    function needleArcTween(d: any) {
      var interpolateStart = d3.interpolate(-Math.PI / 2, d.startAngle);
      var interpolateEnd = d3.interpolate(
        -Math.PI / 2 + (d.endAngle - d.startAngle),
        d.endAngle
      );

      return function (t) {
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
      .attr("fill", (d) => d.data.fill)
      .attr("id", (d, i) => `path-${i}`)
      .attr("d", arc);

    // Add arc labels
    const gaugeArcsLabels = svg
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("dy", arcThickness / 2 + labelSize / 3)
      .attr("font-size", labelSize)
      .append("textPath")
      .attr("startOffset", "21%")
      .style("text-anchor", "middle")
      .attr("href", (d, i) => `#path-${i}`)
      .attr("textLength", (d) => d.data.label.length * labelSize * 0.85)
      .attr("fill","#fff")
      .text((d) => d.data.label);

    const needleCenterAngle =
      highlightedArcData.startAngle +
      (highlightedArcData.endAngle - highlightedArcData.startAngle) / 2;

    const needleArcData = [
      {
        startAngle: needleCenterAngle - (3 * Math.PI) / 180,
        endAngle: needleCenterAngle + (3 * Math.PI) / 180
      }
    ];

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



  }, [props])

  return (
    <>
      <svg id={elementID} ref={svgRef}>
      </svg>
    </>
  )
}