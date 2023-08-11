"use client"
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import * as _ from "lodash";

interface Props {
  window?: () => Window;
  fluidGaugeProps: fluidGaugeProps;
}

export default function FluidGauge(props: Props) {
  const elementID = props.fluidGaugeProps.elementID;
  const config = props.fluidGaugeProps.config;
  const value = props.fluidGaugeProps.data;

  const svgRef = useRef(null);

  const [datas, setData] = useState(value);
  const [svgWidth, setSvgWidth] = useState(config.width);
  const [svgHeight, setSvgHeight] = useState(config.height);

  useEffect(()=>{
    setSvgWidth(config.width);
    setSvgHeight(config.height);
    setData(props.fluidGaugeProps.data);
    
    const svg = d3.select(svgRef.current);


    const thi = _.cloneDeep(props);
    svg.node().svg = thi;

    var radius = Math.min(parseInt(svg.style("width")), parseInt(svg.style("height"))) / 2;
    var locationX = parseInt(svg.style("width")) / 2 - radius;
    var locationY = parseInt(svg.style("height")) / 2 - radius;
    var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, datas)) / config.maxValue;

    var waveHeightScale;
    if (config.waveHeightScaling) {
      waveHeightScale = d3.scaleLinear()
        .range([0, config.waveHeight, 0])
        .domain([0, 50, 100]);
    } else {
      waveHeightScale = d3.scaleLinear()
        .range([config.waveHeight, config.waveHeight])
        .domain([0, 100]);
    }

    thi.waveHeightScale = waveHeightScale;

    var textPixels = (config.textSize * radius / 2);
    var textFinalValue = parseFloat(datas.toFixed(2));
    var textStartValue = config.valueCountUp ? config.minValue : textFinalValue;
    thi.percentText = config.displayPercent ? "%" : "";

    var circleThickness = config.circleThickness * radius;
    var circleFillGap = config.circleFillGap * radius;
    var fillCircleMargin = circleThickness + circleFillGap;
    var fillCircleRadius = radius - fillCircleMargin;
    var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);

    thi.fillCircleRadius = fillCircleRadius;
    thi.fillCircleMargin = fillCircleMargin;


    var waveLength = fillCircleRadius * 2 / config.waveCount;
    var waveClipCount = 1 + config.waveCount;
    var waveClipWidth = waveLength * waveClipCount;
    var textRounder = function (value: number) { return Math.round(value); };

    thi.waveClipWidth = waveClipWidth;

    if (textFinalValue != textRounder(textFinalValue)) {
      textRounder = function (value: number) { return parseFloat(value.toFixed(1)); };
    }

    // data for building the clip wave area
    var data = [];
    for (var i = 0; i <= 40 * waveClipCount; i++) {
      data.push({ x: i / (40 * waveClipCount), y: (i / 40) });
    }

    // scales for drawing the outer circle
    var gaugeCircleX = d3.scaleLinear().range([0, 2 * Math.PI]).domain([0, 1]);
    var gaugeCircleY = d3.scaleLinear().range([0, radius]).domain([0, radius]);


    //scales for controlling the size fo the clipping path.
    var waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
    var waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);


    // scales for controlling the position of the clipping path
    var waveRiseScale = d3.scaleLinear()
      .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
      .domain([0, 1]);
    var waveAnimateScale = d3.scaleLinear()
      .range([0, waveClipWidth - fillCircleRadius * 2])
      .domain([0, 1]);
    thi.waveAnimateScale = waveAnimateScale;
    // scale for controlling the position of the text within the svg
    var textRiseScaleY = d3.scaleLinear()
      .range([fillCircleMargin + fillCircleRadius * 2, (fillCircleMargin + textPixels * 0.7)])
      .domain([0, 1]);
    // center the svg within the parent svg
    var gaugeGroup = svg.append("g")
      .attr("transform", "translate(" + locationX + "," + locationY + ")");

    //debug
    //gaugeGroup.append("circle").attr("cx",0).attr("cy",0).attr("r",radius).attr("class","debug");

    // draw the outer circle
    var gaugeCircleArc = d3.arc()
      .startAngle(gaugeCircleX(0))
      .endAngle(gaugeCircleX(1))
      .outerRadius(gaugeCircleY(radius))
      .innerRadius(gaugeCircleY(radius - circleThickness));
    gaugeGroup.append("path")
      .attr("d", gaugeCircleArc)
      .style("fill", config.circleColor)
      .attr("transform", "translate(" + radius + "," + radius + ")");

    // text where the wave does not overlap
    thi.text1 = gaugeGroup.append("text")
      .text(textRounder(textStartValue) + thi.percentText)
      .attr("class", "liquidFillGaugeText")
      .attr("text-anchor", "middle")
      .attr("font-size", textPixels + "px")
      .style("fill", config.textColor)
      .attr("transform", "translate(" + radius + "," + textRiseScaleY(config.textVertPosition) + ")");

    // the clipping wave area
    var clipArea = d3.area()
      .x(function (d) { return waveScaleX(d.x); })
      .y0(function (d) { return waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI)); })
      .y1(function (d) { return (fillCircleRadius * 2 + waveHeight) });
    thi.clipArea = clipArea;

    var waveGroup = gaugeGroup.append("defs")
      .append("clipPath")
      .attr("id", "clipWave" + elementID);
    thi.waveGroup = waveGroup;

    var wave = waveGroup.append("path")
      .datum(data)
      .attr("d", clipArea)
      .attr("T", 0);
    thi.wave = wave;

    // the inner circle with the clipping wave attached
    var fillCircleGroup = gaugeGroup.append("g")
      .attr("clip-path", "url(#clipWave" + elementID+ ")");
    fillCircleGroup.append("circle")
      .attr("cx", radius)
      .attr("cy", radius)
      .attr("r", fillCircleRadius)
      .style("fill", config.waveColor);

    // text where the wave does overlap.
    thi.text2 = fillCircleGroup.append("text")
      .text(textRounder(textStartValue) + thi.percentText)
      .attr("class", "liquidFillGaugeText")
      .attr("text-anchor", "middle")
      .attr("font-size", textPixels + "px")
      .style("fill", config.waveTextColor)
      .attr("transform", "translate(" + radius + "," + textRiseScaleY(config.textVertPosition) + ")");

    // make the value count up
    if (config.valueCountUp) {
      var pt = thi.percentText;
      var textTween = function () {
        var a = textStartValue;
        var i = d3.interpolate(a, textFinalValue);
        return function (t) {
          a = textRounder(i(t)) + pt;
          thi.text1.text(a)
          thi.text2.text(a)
        }
      }
      thi.text1.transition()
        .duration(config.waveRiseTime)
        .tween("text", textTween);
      thi.text2.transition()
        .duration(config.waveRiseTime)
        .tween("text", textTween);
    }

    // make the wave rise. wave and wavegroup are separate so vertical movement can be controlled
    var waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
    thi.waveGroupXPosition = waveGroupXPosition;

    if (config.waveRise) {
      waveGroup.attr("transform", "translate(" + waveGroupXPosition + "," + waveRiseScale(0) + ")")
        .transition()
        .duration(config.waveRiseTime)
        .attr("transform", "translate(" + waveGroupXPosition + "," + waveRiseScale(fillPercent) + ")")
        .on("start", function () {
          // thi transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. 
          // The wave will not position correctly without thi, but it's not clear why thi is actually necessary.
          wave.attr("transform", "translate(1,0)");
        });

    } else {
      waveGroup.attr("transform", "translate(" + waveGroupXPosition + "," + waveRiseScale(fillPercent) + ")");
    }


    thi.animateWave = function () {
      var that = thi;
      wave.attr("transform", "translate(" + waveAnimateScale(wave.attr("T")) + ",0)");
      //wave.attr("transform","translate("+waveAnimateScale(0)+",0)");
      wave.transition()
        .duration(config.waveAnimateTime * (1 - wave.attr('T')))
        .ease(d3.easeLinear)
        .attr("transform", "translate(" + waveAnimateScale(1) + ",0)")
        //.attr("T",1)
        .on("end", function () {
          wave.attr("T", 0);
          that.animateWave();
        });

    }
    if (config.waveAnimate) { thi.animateWave(); }
















  },[props])

  return(
    <>
    <svg id={elementID} ref={svgRef}>
    </svg>
    </>
  )
}