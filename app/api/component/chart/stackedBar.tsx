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

    const param1 = datas.reduce((prev, curr) => {
      return new Date(prev.date).getTime() <= new Date(curr.date).getTime() ? prev : curr;
    })

    const param2 = datas.reduce((prev, curr) => {
      return new Date(prev.date).getTime() <= new Date(curr.date).getTime() ? curr : prev;
    })
    //param1은 시작일, param2는 종료일이다.
    function getDateRangeData(param1: any, param2: any) {
      let res_day = [];
      let ss_day = new Date(param1.date);
      let ee_day = new Date(param2.date);

      while (ss_day <= ee_day) {
        let _mon_ = (ss_day.getMonth() + 1);
        res_day.push(`${ss_day.getFullYear()}-${`0${_mon_}`.slice(-2)}`);
        ss_day.setMonth(ss_day.getMonth() + 1);
      }
      return res_day;
    }
    const timeRange = getDateRangeData(param1, param2);
    const dataSetAll:any[] = [];
    columns.sort((a,b)=>{
      if(a.sort > b.sort) return 1;
      if(a.sort === b.index) return 0;
      if(a.sort < b.sort) return -1;
    }).map((e,i)=>{e.index = i; return e});
    let maximum = config.maximum == 0 ? 0 : config.maximum;
    columns.forEach((t: any) => {
      const sdata_: any[] = [];
      let ch = dataSetAll.find(e=>e.index == t.index-1);
      timeRange.forEach((e) => {
        let str_ = `${e}-01`
        let ss_ = new Date(str_);
        let ee_ = new Date(str_);
        ee_.setMonth(ss_.getMonth() + 1)
        let ssStr_ = `${ss_.getFullYear()}-${`0${ss_.getMonth() + 1}`.slice(-2)}-01`;
        let eeStr_ = `${ee_.getFullYear()}-${`0${ee_.getMonth() + 1}`.slice(-2)}-01`;
        let sub_ = t.data.filter((e: any) => e.date >= ssStr_ && e.date < eeStr_).reduce((prev: any, curr: any) => {
          return prev + curr.value;
        }, 0)
        let s_ = 0;
        if(ch != undefined){
          let td = ch.dataAll?.find(fe=>fe.w == e);
          if(td != undefined && td.d > 0)
          s_ = td.d;
        }
        let d_ = s_ + sub_;
        maximum = maximum < d_ ? d_ : maximum;
        sdata_.push({ w: e, s:s_, d: d_ })
      })
      dataSetAll.push({ ...t, dataAll: sdata_ })
    })
    const textBoxH = 50;
    const x = d3.scaleBand()
      .domain(timeRange.map((d) => d))
      .range([margin.left, svgWidth - margin.right])
      .padding(0.5)

    const y = d3.scaleLinear()
      .domain([config.minimum, maximum])
      //.domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
      .rangeRound([svgHeight - margin.bottom - textBoxH, margin.top])

    const xAxis = (g: any) => g
      .attr("transform", `translate(0, ${svgHeight - margin.bottom - textBoxH})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
    // .call(g => g.selectAll(".domain").remove()) //Gets rid of border line

    const yAxis = (g: any) => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickValues(d3.range(config.minimum, maximum+1, config.valueGap)))

    const bars = svg.append("g")
      .attr("class", "bars");

    const s = bars.selectAll("g").data(dataSetAll)
      .join("g")
      .attr("class", "series")
      .attr("fill", d => d.color)
      .selectAll("rect")
      .data((d: any) => d.dataAll)
    .join("rect") //recall (0,0) is top left corner, thus:
      .attr("x", (d:any) => x(d.w))
      .attr("y", d => y(d.d)) //y-coordinate determined by top of bar
      .attr("height", d => y(d.s) - y(d.d)) //height is bottom - top
      .attr("width", x.bandwidth())
    // .append("title") //Useful for tooltips/accessibility.
    //   .text(d  => `${d.data.day} ${d.key}: ${d.data[d.key]} hours`);


    const xAx = svg.append("g").call(xAxis);
    const yAx = svg.append("g").call(yAxis);
    const txtRange = d3.range(100,svgWidth - 100, svgWidth / (columns.length+1))

    const txtBoxs = svg.append("g");
    
    const subTxtBoxs = svg.append("g");
    const txtBox = subTxtBoxs.selectAll("rect")
      .data(columns)
      .join("rect")
      .attr("fill", d => d.color)
      .attr("x", d=>{ console.log(d); return txtRange[d.index]})
      .attr("y",svgHeight - textBoxH/2)
      .attr("height", 10)
      .attr("width", 10)

      // Bar 모션 추가 필요

    const txt = subTxtBoxs.selectAll("text")
      .data(columns)
      .join("text")
      .attr("fill", "#ffffff")
      .attr("x", d=>{ console.log(d); return txtRange[d.index] + 15})
      .attr("y",svgHeight - textBoxH/2)
      .attr("dy", "0.7em")
      .text(d=>d.name)


    console.log(columns)
    
  }, [props, dataSet, config])

  return (
    <>
      <svg id={elementID} ref={svgRef}>
      </svg>
    </>
  );
}