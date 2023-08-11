"use client"
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface Props {
  window?: () => Window;
  circleGaugeProps: circleGaugeProps;
}

export default function Gauge1(props: Props) {
  const config = props.circleGaugeProps.config;
  const elementID = props.circleGaugeProps.elementID;
  const value = props.circleGaugeProps.data;

  const [data, setData] = useState(props.circleGaugeProps.data);
  const svgRef = useRef(null);

  const [svgWidth, setSvgWidth] = useState(config.width);
  const [svgHeight, setSvgHeight] = useState(config.height);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    setSvgWidth(config.width);
    setSvgHeight(config.height);
    setData(props.circleGaugeProps.data);

    svg.selectAll("g").remove();

    const baseColor = (vl: circleColorConf[], defaultVl: number) => {
      let returnColor: string = '#fff';
      vl.forEach(el=>{
        if(defaultVl <= el.max && defaultVl >= el.min){
          returnColor = el.color;
        }
      })
      return returnColor;
    };

    const TEXTGAP: number = config.desc == '' ? 0 : 16;

    const pieGenerator = d3.pie().sort(null)
    var radius = Math.min(svgWidth, svgHeight) / 2;
    const format = d3.format(".0%");
    var textPixels = (config.textSize * (radius - TEXTGAP) / 2);

    const arc = d3.arc()
      .innerRadius(radius * 0.7 - TEXTGAP)
      .outerRadius(radius - TEXTGAP);

      svg.append("g")
      .attr("transform", "translate(" + svgWidth / 2 + "," + (svgHeight - TEXTGAP) + ")")
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.5em")
      .attr("font-size", textPixels-10 + "px")
      .style("fill", config.textColor)
      .text(config.desc)
  
    const group = svg
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", "translate(" + svgWidth / 2 + "," + (svgHeight / 2 - TEXTGAP) + ")")

    group
      .append("path")
      .attr("id", `backgroundpath`)

    group
      .append("path")
      .attr("id", `foregroundpath`)

    const background = group.selectAll(`#backgroundpath`)
      .data(pieGenerator([100]))
      // .attr("class", (d, i) =>"backColor") 
      .style("fill", config.circleColor)
      .attr("d", arc);

    const foreground = group.selectAll(`#foregroundpath`)
      .data(pieGenerator([0, 100]))
      .style("fill", baseColor(config.valueColor,data))
      .attr("d", arc)


    const textDOM = group.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .attr("font-size", textPixels + "px")
      .style("fill", baseColor(config.valueColor,data))

    function arcTween(pie: any) {
      return function (d: any) {
        const interpolate = d3.interpolate(pie[0].startAngle, pie[0].endAngle);
        const interpolateText = d3.interpolate(0, pie[0].value);
        return function (t: any) {
          d.endAngle = interpolate(t);
          textDOM.text(format(interpolateText(t) / 100));
          return arc(d);
        }
      }
    }
    

    foreground.transition().duration(1500).attrTween("d", arcTween(pieGenerator([value, 100 - value]))).delay(400);

  }, [props]);

  return (
    <>
      <svg id={elementID} ref={svgRef}>
      </svg>
    </>
  );
}