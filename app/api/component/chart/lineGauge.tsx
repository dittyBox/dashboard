"use client"
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface Props {
  window?: () => Window;
  lineGaugeProps: lineGaugeProps;
}

export default function LineGauge(props: Props){
  const config = props.lineGaugeProps.config;
  const elementID = props.lineGaugeProps.elementID;
  const value = props.lineGaugeProps.data;

  const [datas, setDatas] = useState(props.lineGaugeProps.data);
  const svgRef = useRef(null);

  const [svgWidth, setSvgWidth] = useState(config.width);
  const [svgHeight, setSvgHeight] = useState(config.height);
  
  useEffect(()=>{

    setDatas(props.lineGaugeProps.data);

    setSvgWidth(config.width);
    setSvgHeight(config.height);

    console.log(svgHeight)

    const svg = d3.select(svgRef.current);
    svg
    .attr("width", svgWidth)
    .attr("height", svgHeight+30)
    
    svg.selectAll("g").remove();
    const panelG = svg.append("g")
      .attr("transform", "translate(" + 0 + "," + (svgHeight) + ")")
      
    const vbarPanelLayer = panelG.append('g').classed('vbarPanelLayer', true);
    let panel = vbarPanelLayer.append('g').classed('vbarPanel', true)
      .data([config])

      function scale(valueRnage: any, range: any, value:number) {
        let scale = d3.scaleLinear().domain([valueRnage.min, valueRnage.max]).range([range.start, range.end]);
        return scale(value);
      }
    panel
        .attr('id', function(d) { console.log(d); return d.id; })
        .attr('transform', function(d) { return 'translate(' + [d.x, d.y] + ')'; })
        .attr('unit', function(d) { return d.unit; })
        .attr('prefix', function(d) { return d.prefix || ''; });

        const bars = panel
        .append('g').classed('bars', true)

        bars.append('rect').classed('bg', true)
        .attr('height', function(d) {
          
            var initValue = this.getAttribute('preValue') || 0;

            var percentage = scale({
                min: d.minimum || 0,
                max: d.maximum || 100
            }, {
                start: 0,
                end: 1
            }, (100 - initValue));
            
            var height = d.height * percentage;
      
            if ((height - 10) < 0) {
                height = 10;
            }

            return height + 'px';
        })

        bars.append('rect').classed('pointer', true)
        .attr("y", function(d) {
            var initValue = this.getAttribute('preValue') || 0;
            var percentage = scale({
                min: d.minimum || 0,
                max: d.maximum || 100
            }, {
                start: 0,
                end: 1
            }, (100 - initValue));
            var y = (d.height * percentage);
            if (y < 0) {
                y = 0;
            }
            return y + 'px';
        });

    var textMarker = panel
        .append('g')
        .attr('class', 'text-markers')
        .attr('text-anchor', 'start');

        textMarker
        .selectAll('text')
        .data(function(d) {
            var list = [];
            var percentage = 0;
            for (var i = 0; i <= 100; i += 10) {
              percentage = scale({
                  min: d.minimum || 0,
                  max: d.maximum || 100
              }, {
                  start: 0,
                  end: 1
              }, (100 - i));
              list.push({
                  label: i,
                  y: ((d.height) * percentage)
              });
            }
            return list;
        })
        .enter()
        .append('text')
        .attr('x', 0)
        .attr('y', function(d) {
            return (d.y);
        })
        .attr('fill', '#555')
        .text(function(d) {
            return d.label;
        })
        .attr('font-family','Verdana')
        .attr('font-weight', 'bold')
        .style('font-size', '12px');
    




  },[props,config])

  return (
    <>
    <svg id={elementID} ref={svgRef}>
    </svg>
    </>
  )
}