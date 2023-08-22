import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default function Menu3() {
  return (
    <Grid container sx={{ margin: "6px", width: "100%" }} direction={"column"} spacing={1}>
      <Grid xs={12} sx={{ backgroundColor: "rgba(121, 121, 5, 0)" }}>
        <Box sx={{ border: '1px solid grey', padding: "5px" }}>
          <Grid container direction={"row"} minHeight="400px" spacing={1}>
            <Grid xs={1} maxWidth={'60px'} display="flex" justifyContent="center" alignItems="center" ></Grid>
            <Grid xs={4} minWidth={'600px'} maxWidth={'600px'} display="flex" justifyContent="center" alignItems="center" >
              
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
            <Grid xs={1} maxWidth={'60px'} display="flex" justifyContent="center" alignItems="center" ></Grid>
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
