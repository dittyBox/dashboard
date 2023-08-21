import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import StackedBar from '@/app/api/component/chart/stackedBar';
import * as t1 from '@/app/api/fech/stackedBarTest';

const stackedBarMargin: stackedBarMargin = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 35,
}

const stackedBarColumnConf: stackedBarColumnConf[] = [
  {sort: 3, id: "t4", name: "폐기", color: "#2f7593"},
  {sort: 0, id: "t1", name: "정상", color: "#7cd865"},
  {sort: 1, id: "t2", name: "과다", color: "#4477dd"},
  {sort: 2, id: "t3", name: "문제", color: "#ea8c2e"},
] 


const stackedBarDataSet: stackedBarDataSet[] = t1.getStackedBarDataSet;

// const minValue = stackedBarDataSet.reduce((prev, curr) => {
//   return prev.value <= curr.value ? prev : curr;
// }).value;

// const maxValue = stackedBarDataSet.reduce((prev, curr) => {
//   return prev.value <= curr.value ? curr : prev;
// }).value;

const stackedBarConfig: stackedBarConfig = {
  width: 600,
  height: 400,
  margin: stackedBarMargin,
  columns: stackedBarColumnConf,
  xTitleColor: "",
  xTitle: "",
  minimum: 0,
  maximum: 300,
  valueGap: 30,
}

const stackedBarProps: stackedBarProps = {
  elementID: "stackedBar",
  config: stackedBarConfig,
  data: stackedBarDataSet,
}
export default function Menu2() {

  return (
    <Grid container sx={{ margin: "6px", width: "100%" }} direction={"column"} spacing={1}>
      <Grid xs={12} sx={{ backgroundColor: "rgba(121, 121, 5, 0)" }}>
        <Box sx={{ border: '1px solid grey', padding: "5px" }}>
          <Grid container direction={"row"} minHeight="400px" spacing={1}>
            <Grid xs={1} maxWidth={'60px'} display="flex" justifyContent="center" alignItems="center" >가로</Grid>
            <Grid xs={4} minWidth={'600px'} maxWidth={'600px'} display="flex" justifyContent="center" alignItems="center" >
              <StackedBar stackedBarProps={stackedBarProps} />
            </Grid>
            <Grid xs={2} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              
            </Grid>
            <Grid xs={2} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              
            </Grid>
            <Grid xs={2} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid xs={12} sx={{ backgroundColor: "rgba(225, 211, 55, 0)" }}>
        <Box sx={{ border: '1px solid grey', padding: "5px" }}>
          <Grid container direction={"row"} minHeight="350px" spacing={1}>
            <Grid xs={1} maxWidth={'60px'} display="flex" justifyContent="center" alignItems="center" >세로</Grid>
            <Grid xs={4} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              
            </Grid>
            <Grid xs={1} maxWidth={'60px'} display="flex" justifyContent="center" alignItems="center" ></Grid>
            <Grid xs={1} maxWidth={'60px'} display="flex" justifyContent="center" alignItems="center" ></Grid>
            <Grid xs={1} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              
            </Grid>
            <Grid xs={1} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
              
            </Grid>
            <Grid xs={3} maxWidth={'180px'} display="flex" justifyContent="center" alignItems="center" >
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
