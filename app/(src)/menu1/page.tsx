"use client"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Guage1 from '@/app/api/component/chart/gauge'
import FluidGauge from '@/app/api/component/chart/fluidGauge'
import HalfGauge from '@/app/api/component/chart/halfGauge'
import HalfScoreGauge from '@/app/api/component/chart/HalfScoreGauge'
import ScoreGauge from '@/app/api/component/chart/scoreGauge'
import LineGauge from '@/app/api/component/chart/lineGauge'

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
    valueColor: valueColors,
    desc: "하단글자",
    descColor: "#ffffff",
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
    valueColor: valueColors,
    desc: "",
    descColor: "",
  }
}

const halfGauge1Config: halfGaugeConfig = {
  size: 250,
  arcSize: 250,
  arcThickness: 40,
  transitionDuration: 875,
  textColor: "#fff",
  titleSize: 30,
  desc: ""
}

const halfGaugeScore: halfGaugeScore[] = [
  { value: 1, fill: "#cddc3a", sortIndex: 0, label: "LOW" },
  { value: 1, fill: "#8bc34a", sortIndex: 1, label: "MED" },
  { value: 1, fill: "#4caf51", sortIndex: 2, label: "HIGH", selected: true },
  { value: 1, fill: "#1e9688", sortIndex: 3, label: "TOP" }
]

const halfGauge1: halfGaugeProps = {
  elementID: "halfGauge1",
  data: 20,
  config: halfGauge1Config,
  gaugeScore: halfGaugeScore
}


const halfScoreGaugeConfig: halfScoreGaugeConfig = {
  size: 250,
  arcSize: 250,
  arcThickness: 40,
  transitionDuration: 875,
  scoreColorSet: ["#f26d80", "#fced7b", "#8bc34a"],
  textColor: "#fff",
  titleSize: 30,
  prefix: "%"
}

const halfScoreGaugeScore: halfScoreGaugeScore[] = [
  { value: 1, sortIndex: 0 },
  { value: 1, sortIndex: 1 },
  { value: 1, sortIndex: 2 },
  { value: 1, sortIndex: 3 },
  { value: 1, sortIndex: 4 },
  { value: 1, sortIndex: 5 },
  { value: 1, sortIndex: 6 },
  { value: 1, sortIndex: 7 },
  { value: 1, sortIndex: 8 },
  { value: 1, sortIndex: 9 }
]

const halfScoreGauge: halfScorefGaugeProps = {
  elementID: "halfScoreGauge",
  data: 40,
  config: halfScoreGaugeConfig,
  gaugeScore: halfScoreGaugeScore,
}

const halfScoreGaugeConfig1: halfScoreGaugeConfig = {
  size: 250,
  arcSize: 250,
  arcThickness: 40,
  transitionDuration: 875,
  scoreColorSet: ["#f26d80", "#fced7b", "#8bc34a"],
  textColor: "#fff",
  titleSize: 30,
  prefix: "%"
}

const halfScoreGaugeScore1: halfScoreGaugeScore[] = [
  { value: 1, sortIndex: 0 },
  { value: 1, sortIndex: 1 },
  { value: 1, sortIndex: 2 },
  { value: 1, sortIndex: 3 },
  { value: 1, sortIndex: 4 }
]


const halfScoreGauge1: halfScorefGaugeProps = {
  elementID: "halfScoreGauge",
  data: 87,
  config: halfScoreGaugeConfig1,
  gaugeScore: halfScoreGaugeScore1,
}

const scoreGaugeConfig: scoreGaugeConfig = {
  width: 200,
  height: 200,
  TEXTGAP: 150,
  titleWidth: 120,
  titleHeight: 30
}

const scoreGaugeDataSet: scoreGaugeDataSet[] = [
  {name: '어쩌구', value: 50},
  {name: '저쩌구', value: 70},
  {name: '이렇게', value: 80},
]

const scoreGaugeProps: scoreGaugeProps = {
  elementID: "scoreGaugeProps",
  dataSet: scoreGaugeDataSet,
  config: scoreGaugeConfig,
}

const lineGaugeConfig: lineGaugeConfig = {
  width: 80,
  height: 200,
  barColor: "#777777",
  valueColor:"#f0ad4e",
  scoreColor: "#fff",
  pointerColor:"#fff",
  id: "dsp273",
  maximum: 100,
  minimum: 0,
  x: 0,
  y: -200
}

const valueLineColors: lineColorConf[] = [{
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

const lineGaugeProps: lineGaugeProps = {
  elementID: "scoreGaugeProps",
  data: 65,
  config: lineGaugeConfig,
  colorConf: valueLineColors,
}

const lineGaugeConfig1: lineGaugeConfig = {
  width: 80,
  height: 200,
  barColor: "#777777",
  valueColor:"#f0ad4e",
  scoreColor: "#fff",
  pointerColor:"#fff",
  id: "dsp273",
  maximum: 100,
  minimum: 0,
  x: 0,
  y: -200
}

const valueLineColors1: lineColorConf[] = [{
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

const lineGaugeProps1: lineGaugeProps = {
  elementID: "scoreGaugeProps1",
  data: 30,
  config: lineGaugeConfig1,
  colorConf: valueLineColors1,
}


export default function Menu1() {
  return (
    <Grid container sx={{ margin: "6px", width: "100%" }} direction={"column"} spacing={1}>
      <Grid xs={12} sx={{ backgroundColor: "rgba(121, 121, 5, 0)" }}>
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
      <Grid xs={12} sx={{ backgroundColor: "rgba(225, 211, 55, 0)" }}>
        <Box sx={{ border: '1px solid grey', padding: "5px" }}>
          <Grid container direction={"row"} minHeight="280px" spacing={1}>
            <Grid xs={1} maxWidth={'60px'} display="flex" justifyContent="center" alignItems="center" >Pie</Grid>
            <Grid xs={4} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              <ScoreGauge scoreGaugeProps={scoreGaugeProps} />
            </Grid>
            <Grid xs={1} maxWidth={'60px'} display="flex" justifyContent="center" alignItems="center" ></Grid>
            <Grid xs={1} maxWidth={'60px'} display="flex" justifyContent="center" alignItems="center" >Line</Grid>
            <Grid xs={1} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              <LineGauge lineGaugeProps={lineGaugeProps} />
            </Grid>
            <Grid xs={1} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              <LineGauge lineGaugeProps={lineGaugeProps1} />
            </Grid>
            <Grid xs={3} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid xs={12} sx={{ backgroundColor: "rgba(121, 121, 255, 0)" }}>
        <Box sx={{ border: '1px solid grey', padding: "5px" }}>
          <Grid container direction={"row"} minHeight="150px" spacing={1}>
            <Grid xs={1} maxWidth={'60px'} display="flex" justifyContent="center" alignItems="center" >Half</Grid>
            <Grid xs={2} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              <HalfGauge halfGaugeProps={halfGauge1} />
            </Grid>
            <Grid xs={2} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              <HalfScoreGauge halfScorefGaugeProps={halfScoreGauge} />
            </Grid>
            <Grid xs={2} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              <HalfScoreGauge halfScorefGaugeProps={halfScoreGauge1} />
            </Grid>
            <Grid xs={2} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
            </Grid>
            <Grid xs={2} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
