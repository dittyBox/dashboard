"use client"
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface Props {
  window?: () => Window;
  verticalGroupBarProps: verticalGroupBarProps;
}

export default function VerticalGroupBar(props: Props){

  const config = props.verticalGroupBarProps.config;
  const elementID = props.verticalGroupBarProps.elementID;
  const dataSet = props.verticalGroupBarProps.data;
  
  const svgRef = useRef(null);

  return (
    <>
      <svg id={elementID} ref={svgRef}>
        </svg>
    </>
  )
}