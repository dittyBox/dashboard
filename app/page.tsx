"use client"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Cards from './api/component/card/page'
import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import MenusContext from '@/app/api/context/menus'
import Button from '@mui/material/Button';


export default function Home() {
  const menus = useContext(MenusContext);

  const [useMenu, setUseMenu] = useState(menus);

  const changeMenuHandler = () =>{

  }

  useEffect(()=>{
    console.log(menus)
  }, [menus])

  return (
    <Box component="main" sx={{ marginTop: "50px" }}>
      <Grid container spacing={1} direction="column"
        justifyContent="center"
        alignItems="center" >
        {
          menus.map(menu => {
            return (
              <Grid key={menu.menuId} sx={{ width: "500px" }}>
                <Cards config={menu} />
              </Grid>
            )
          })
        }
        <Grid container columnSpacing={1} sx={{ width: "500px", marginTop: "2px" }}>
          <Grid container xs={6} justifyContent="start">
            <Button variant="contained">Reset</Button>
          </Grid>
          <Grid container xs={6} justifyContent="end">
            <Button variant="contained">저장</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
