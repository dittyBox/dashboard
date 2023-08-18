import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import StackedBar from '@/app/api/component/chart/stackedBar';
import * as t1 from '@/app/api/fech/stackedBarTest';

const stackedBarMargin: stackedBarMargin = {
  top: 10,
  right: 10,
  bottom: 20,
  left: 40,
}

const stackedBarColumnConf: stackedBarColumnConf[] = [
  {id: "t1", name: "정상", color: ""},
  {id: "t2", name: "과다", color: ""},
  {id: "t3", name: "문제", color: ""},
  {id: "t4", name: "폐기", color: ""},
] 

const stackedBarConfig: stackedBarConfig = {
  width: 600,
  height: 400,
  margin: stackedBarMargin,
  columns: stackedBarColumnConf,
  xTitleColor: "",
  xTitle: "",
  minimum: 20,
  maximum: 14,
}

const stackedBarDataSet: stackedBarDataSet[] = t1.getStackedBarDataSet;

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
