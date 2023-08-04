"use client"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Cards from './api/component/card/page'
import { useState, useEffect } from 'react';


interface Props {
  getMenuStorageHandler: any;
  setMenuStorageHandler: any;
};

export default function Home(props: Props) {
  
  console.log(props);


  useEffect(()=>{
  },[]);

  return (
    <Box component="main" sx={{ marginTop: "50px" }}>
      <Grid container spacing={1} direction="column"
        justifyContent="center"
        alignItems="center" >
        <Grid sx={{width:"500px"}}>
          <Cards config={{cardId:1,name:"메뉴1",useYn:"Y"}} />
        </Grid>
        <Grid sx={{width:"500px"}}>
          <Cards config={{cardId:2,name:"메뉴2",useYn:"Y"}} />
        </Grid>
        <Grid sx={{width:"500px"}}>
          <Cards config={{cardId:3,name:"메뉴3",useYn:"Y"}} />
        </Grid>
      </Grid>
    </Box>
  )
}
