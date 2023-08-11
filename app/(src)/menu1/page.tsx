"use client"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Guage1 from '@/app/api/component/chart/gauge'
import FluidGauge from '@/app/api/component/chart/fluidGauge'

const valueColors: circleColorConf[] = [{
    nm: "good",
    max: 100,
    min: 71,
    color: '#c1f497'
  }, {
    nm: "normal",
    max: 70,
    min: 41,
    color: '#fced7b'
  }, {
    nm: "bad",
    max: 40,
    min: 0,
    color: '#f26d80'
  }];

const cicleGauge1_1: circleGaugeProps = {
  elementID: "asdasd",
  data: 60,
  config: {
    anchor: "middle",
    arcColor: "#b1d690",
    circleColor: "#000",
    width: 110,
    height: 110,
    textSize: 1,
    textColor: "#f0f0f0",
    id: "circlegauge",
    maximum: 100,
    minimum: 0,
    prefix: "",
    radius: 100,
    size: 30,
    unit: "%",
    x: 120,
    y: 120,
    decimals: 1,
    status: 1,
    desc: '',
    valueColor: valueColors
  }
}

const cicleGauge1_2: circleGaugeProps = {
  elementID: "wewewe",
  data: 18,
  config: {
    anchor: "middle",
    arcColor: "#b1d690",
    circleColor: "#000",
    width: 150,
    height: 150,
    textSize: 1,
    textColor: "#f0f0f0",
    id: "circlegauge",
    maximum: 100,
    minimum: 0,
    prefix: "",
    radius: 100,
    size: 30,
    unit: "%",
    x: 120,
    y: 120,
    decimals: 1,
    status: 1,
    desc: '하단글자',
    valueColor: valueColors
  }
}

const cicleGauge1_3: circleGaugeProps = {
  elementID: "wewrwrw",
  data: 89,
  config: {
    anchor: "middle",
    arcColor: "#b1d690",
    circleColor: "#000",
    width: 150,
    height: 150,
    textSize: 1,
    textColor: "#f0f0f0",
    id: "circlegauge",
    maximum: 100,
    minimum: 0,
    prefix: "",
    radius: 100,
    size: 30,
    unit: "%",
    x: 120,
    y: 120,
    decimals: 1,
    status: 1,
    desc: '',
    valueColor: valueColors
  }
}

const valueFluidColors: fluidColorConf[] = [{
  nm: "good",
  max: 100,
  min: 71,
  color: '#c1f497'
}, {
  nm: "normal",
  max: 70,
  min: 41,
  color: '#fced7b'
}, {
  nm: "bad",
  max: 40,
  min: 0,
  color: '#f26d80'
}];

const fluidGauge1: fluidGaugeProps = {
  elementID: "dffhfh",
  data: 89,
  config: {
    width: 150,
    height: 150,
    minValue: 0, 
    maxValue: 100, 
    circleThickness: 0.05, 
    circleFillGap: 0.05, 
    circleColor: "#1677c5", 
    waveHeight: 0.05, 
    waveCount: 2, 
    waveRiseTime: 1000, 
    waveAnimateTime: 2000, 
    waveRise: true, 
    waveHeightScaling: true, 
    waveAnimate: true, 
    waveColor: "#3dbdff", 
    waveOffset: 0, 
    textVertPosition: .25, 
    textSize: 1, 
    valueCountUp: true, 
    displayPercent: true, 
    textColor: "#045681", 
    waveTextColor: "#ffffff",
    valueColor: valueColors
  }
}

const fluidGauge2: fluidGaugeProps = {
  elementID: "dwfwf",
  data: 62,
  config: {
    width: 150,
    height: 150,
    minValue: 0, 
    maxValue: 100, 
    circleThickness: 0.05, 
    circleFillGap: 0.05, 
    circleColor: "#1677c5", 
    waveHeight: 0.05, 
    waveCount: 2, 
    waveRiseTime: 1000, 
    waveAnimateTime: 2000, 
    waveRise: true, 
    waveHeightScaling: true, 
    waveAnimate: true, 
    waveColor: "#3dbdff", 
    waveOffset: 0, 
    textVertPosition: .25, 
    textSize: 1, 
    valueCountUp: true, 
    displayPercent: true, 
    textColor: "#045681", 
    waveTextColor: "#ffffff",
    valueColor: valueColors
  }
}



export default function Menu1() {
  return (
    <Grid container sx={{ margin: "6px", width: "100%" }} direction={"column"} spacing={1}>
      <Grid xs={12} sx={{ backgroundColor: "rgba(121, 121, 5, 0.1)" }}>
        <Box sx={{ border: '1px solid grey', padding: "5px" }}>
          <Grid container direction={"row"} minHeight="150px" spacing={1}>
            <Grid xs={1} maxWidth={'60px'} display="flex" justifyContent="center" alignItems="center" >Circle</Grid>
            <Grid xs={2} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              <Guage1 circleGaugeProps={cicleGauge1_1} />
            </Grid>
            <Grid xs={2} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              <Guage1 circleGaugeProps={cicleGauge1_2} />
            </Grid>
            <Grid xs={2} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              <Guage1 circleGaugeProps={cicleGauge1_3} />
            </Grid>
            <Grid xs={2} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              <FluidGauge fluidGaugeProps={fluidGauge1} />
            </Grid>
            <Grid xs={2} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              <FluidGauge fluidGaugeProps={fluidGauge2} />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid xs={12} sx={{ backgroundColor: "rgba(225, 211, 55, 0.4)" }}>
        <Box sx={{ border: '1px solid grey', padding: "5px" }}>
          harp circle
        </Box>
      </Grid>
      <Grid xs={12} sx={{ backgroundColor: "rgba(121, 121, 255, 0.4)" }}>
        <Box sx={{ border: '1px solid grey', padding: "5px" }}>
          Line Gauge
        </Box>
      </Grid>
      <Grid xs={12} sx={{ backgroundColor: "rgba(121, 69, 155, 0.4)" }}>
        <Box sx={{ border: '1px solid grey', padding: "5px" }}>
          other Gauge
        </Box>
      </Grid>
    </Grid>
  )
}
