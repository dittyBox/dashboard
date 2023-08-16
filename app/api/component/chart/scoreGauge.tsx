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
  const value = props.scoreGaugeProps.data;

  const [data, setData] = useState(props.scoreGaugeProps.data);
  const [svgWidth, setSvgWidth] = useState(config.width);
  const [svgHeight, setSvgHeight] = useState(config.height);
  
  useEffect(()=>{
    const svg = d3.select(svgRef.current);

    setSvgWidth(config.width);
    setSvgHeight(config.height);
    setData(props.scoreGaugeProps.data);

  },[props])

  return (
    <>
    <svg id={elementID} ref={svgRef}>
    </svg>
    </>
  )
}