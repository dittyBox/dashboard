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
  const value = config.data;

  const [datas, setDatas] = useState(config.data);
  const svgRef = useRef(null);

  const [svgWidth, setSvgWidth] = useState(config.width);
  const [svgHeight, setSvgHeight] = useState(config.height);
  
  useEffect(()=>{

    setDatas(props.lineGaugeProps.config.data);

    setSvgWidth(config.width);
    setSvgHeight(config.height);

    const baseColor = (vl: lineColorConf[], defaultVl: number) => {
      let returnColor: string = '#fff';
      vl.forEach(el=>{
        if(defaultVl <= el.max && defaultVl >= el.min){
          returnColor = el.color;
        }
      })
      return returnColor;
    };

    const mouseoveHandler = () => {
      tooltipG.style("opacity", 1); 
    }
    const mouseoutHandler = () => {
      tooltipG.style("opacity", 0); 
    }
    const mousemoveHandler = (event: any,d: any) => {
      const [x, y] = d3.pointer(event);
      tooltipG
        .attr('transform', `translate(${x-(config.titleWidth/2)}, ${y-config.titleHeight})`)
        
      tooltipR.attr("fill", "rgb(255,255,255,1)")

      tooltip.text(`${d.data}${d.prefix}`).attr("fill", "rgb(0,0,0,1)");
    }


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
        .attr('id', function(d) { return d.id; })
        .attr('transform', function(d) { return 'translate(' + [d.x, d.y] + ')'; })
        //.attr('unit', function(d) { return d.unit; })
        .attr('prefix', function(d) { return d.prefix || ''; });

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
            return (d.y + 20);
        })
        .attr('fill', config.scoreColor)
        .text(function(d) {
            return d.label;
        })
        .attr('font-family','Verdana')
        .attr('font-weight', 'bold')
        .style('font-size', '12px');
    

        const bars = panel
        .append('g').classed('bars', true)

        bars
        .append('rect').attr('class', 'value')
        .attr("transform", "translate(0,14)")
        .attr('fill', (d) => {
          return baseColor(props.lineGaugeProps.colorConf,Number(datas));
        })
        .attr('height', function(d) {
            return d.height + 5 + 'px';
        })
        .attr('width', '20px')
        .attr('x', '42')
    .on("mouseover", mouseoveHandler)
    .on("mouseout",  mouseoutHandler)
    .on("mousemove", mousemoveHandler);

        bars.append('rect').classed('bg', true)
        .attr("transform", "translate(0,14)")
        .attr('fill', (b)=>b.barColor)
        .attr('height', function(d) {
            var initValue = Number(this.getAttribute('preValue')) || 0;
  
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
  
              return height + 5 + 'px';
        })
        .attr('width', '20px')
        .attr('x', '42');


        bars.append('rect').classed('pointer', true)
        .attr("transform", "translate(0,14)")
        .attr('fill', (d)=>d.pointerColor)
        .attr('height', '4px')
        .attr('y', function(d) {
            var initValue = Number(this.getAttribute('preValue')) || 0;
            
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
        })
        .attr('width', '20px')
        .attr('x', '42');


        panel
            .select('.bars .bg')
            .transition()
            .duration(1000)
            .tween("number", function(d) {
                var element = d3.select(this);
                var preValue = element.attr('preValue') || d.minimum;
                var percentage = scale({
                    min: d.minimum || 0,
                    max: d.maximum || 100
                }, {
                    start: 0,
                    end: 1
                }, (100 - Number(datas)));
                var i = d3.interpolateNumber(Number(preValue), percentage);

                element.attr('preValue', percentage);

                return function(t) {
                    var height = d.height * i(t);
                    if ((height - 10) < 0) {
                        height = 10;
                    }
                    element.attr('height', height + 'px');
                };
            });

        panel
            .select('.bars .pointer')
            .transition()
            .duration(1000)
            .tween("number", function(d) {
                var element = d3.select(this);
                var preValue = element.attr('preValue') || d.minimum;
                var percentage = scale({
                    min: d.minimum || 0,
                    max: d.maximum || 100
                }, {
                    start: 0,
                    end: 1
                }, (100 - Number(datas)));
                var i = d3.interpolateNumber(Number(preValue), percentage);

                element.attr('preValue', percentage);

                return function(t) {
                    var y = (d.height * i(t));
                    if (y < 0) {
                        y = 0;
                    }
                    element.attr('y', y + 'px');
                };
            });

            const tooltipG = bars.append("g").style("opacity", 0)
        
            const tooltipR = tooltipG.append("rect")
              .attr('transform', `translate(0,0)`)
              .attr("width", config.titleWidth)
              .attr("height", config.titleHeight)
              .attr("fill", "rgb(255,255,255,0.8)")
              .attr('stroke', 'rgb(0,0,0,0.5)')
              .attr('stroke-width', '1.3')
      
              const tooltip = tooltipG
              .append("text")
              .attr('transform', `translate(5,20)`)
              .attr("class","tooltip-text")
              .attr("fill", "rgb(0,0,0,1)")

  },[props,config])

  return (
    <>
    <svg id={elementID} ref={svgRef}>
    </svg>
    </>
  )
}