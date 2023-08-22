"use client"
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface Props {
  window?: () => Window;
  verticalGroupBarProps: verticalGroupBarProps;
}

export default function VerticalGroupBar(props: Props) {

  const config = props.verticalGroupBarProps.config;
  const elementID = props.verticalGroupBarProps.elementID;
  const dataSet = props.verticalGroupBarProps.data;
  const margin = props.verticalGroupBarProps.config.margin;

  const [svgWidth, setSvgWidth] = useState(config.width);
  const [svgHeight, setSvgHeight] = useState(config.height);
  const [datas, setDatas] = useState(dataSet);
  const [columns, setColumns] = useState(config.columns);

  const svgRef = useRef(null);

  useEffect(() => {
    setDatas(dataSet);
    setColumns(config.columns);

    const svg = d3.select(svgRef.current);
    svg
      .attr("viewBox", [0, 0, svgWidth, svgHeight]);

    svg.selectAll("g").remove();

    
    columns.map((e) => {
      e.data = datas.filter((f) => f.id == e.id);
      return e;
    })


    //param1은 시작일, param2는 종료일이다.
    function getItemDataSet(dataSet_: verticalGroupBarDataSet[]) {
      let distSet = [...new Set(dataSet_.map(m=>m.item))]
      return distSet;
    }
    
    let maximum = config.maximum == 0 ? 0 : config.maximum;

    const itemDataSet = getItemDataSet(props.verticalGroupBarProps.data);

    const dataSetAll:any[] = [];
    
    // columns.sort((a,b)=>{
    //   if(a.sort > b.sort) return 1;
    //   if(a.sort === b.index) return 0;
    //   if(a.sort < b.sort) return -1;
    // }).map((e,i)=>{e.index = i; return e});

    // columns.forEach((t: any) => {
    //   const sdata_: any[] = [];
    //   let ch = dataSetAll.find(e=>e.index == t.index-1);
    //   timeRange.forEach((e) => {
    //     let str_ = `${e}-01`
    //     let ss_ = new Date(str_);
    //     let ee_ = new Date(str_);
    //     ee_.setMonth(ss_.getMonth() + 1)
    //     let ssStr_ = `${ss_.getFullYear()}-${`0${ss_.getMonth() + 1}`.slice(-2)}-01`;
    //     let eeStr_ = `${ee_.getFullYear()}-${`0${ee_.getMonth() + 1}`.slice(-2)}-01`;
    //     let sub_ = t.data.filter((e: any) => e.date >= ssStr_ && e.date < eeStr_).reduce((prev: any, curr: any) => {
    //       return prev + curr.value;
    //     }, 0)
    //     let s_ = 0;
    //     if(ch != undefined){
    //       let td = ch.dataAll?.find(fe=>fe.w == e);
    //       if(td != undefined && td.d > 0)
    //       s_ = td.d;
    //     }
    //     let d_ = s_ + sub_;
    //     maximum = maximum < d_ ? d_ : maximum;
    //     sdata_.push({ w: e, s:s_, d: d_ })
    //   })
    //   dataSetAll.push({ ...t, dataAll: sdata_ })
    // })

    const x = d3.scaleLinear()
    .domain([config.minimum, maximum])
    .rangeRound([margin.left, svgWidth - margin.right])

    // const y = d3.scaleLinear()
    //   .domain([config.minimum, maximum])
    //   //.domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    //   .rangeRound([svgHeight - margin.bottom - config.textBoxH, margin.top])
    const y = d3.scaleBand()
    .domain(columns.map((d) => d.name))
    .range([margin.left, svgHeight - margin.bottom - config.textBoxH])

    const xAxis = (g: any) => g
      .attr("transform", `translate(0, ${svgHeight - margin.bottom - config.textBoxH})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
    // .call(g => g.selectAll(".domain").remove()) //Gets rid of border line

    const yAxis = (g: any) => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0))

    const xAx = svg.append("g").call(xAxis);
    const yAx = svg.append("g").call(yAxis);

  }, [props])

  return (
    <>
      <svg id={elementID} ref={svgRef}>
      </svg>
    </>
  )
}