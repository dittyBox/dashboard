"use client"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Cards from './api/component/card/page'
import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import MenusContext, { DefaultMenu } from '@/app/api/context/menus'
import Button from '@mui/material/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Home() {
  let menus = useContext(MenusContext);

  const router = useRouter();

  const [useMenu, setUseMenu] = useState<MenuType[]>([]);

  const changeMenuHandler = (vl: MenuType[]) =>{
    menus.menus = vl;
  }

  const resetHandler = () => {
    const DefaultMenuTemp = DefaultMenu.map(e=>e);
    localStorage.setItem("menus",JSON.stringify(DefaultMenuTemp));
    menus.menus = DefaultMenuTemp;
    menus.changeMenus(DefaultMenuTemp);
    setUseMenu(DefaultMenuTemp);
    router.refresh();
  }

  const saveHandler = () => {
    const checkUse = menus.menus.find(e=>e.useYn=='Y');
    if(checkUse == undefined){
      alert('사용페이지가 한건도 없습니다.');
      return;
    }
    localStorage.setItem("menus",JSON.stringify(menus.menus));
    menus.changeMenus(menus.menus);
    setUseMenu(menus.menus);
    
    router.refresh();
  }

  useEffect(()=>{
    setUseMenu(menus.menus);
  }, [useMenu])

  return (
    <Box component="main" sx={{ marginTop: "50px" }}>
      <Grid container spacing={1} direction="column"
        justifyContent="center"
        alignItems="center" >
        {
          useMenu.map(menu => {
            return (
              <Grid key={menu.menuId} sx={{ width: "500px" }}>
                <Cards config={menu} changeMenuHandler={changeMenuHandler} />
              </Grid>
            )
          })
        }
        <Grid container columnSpacing={1} sx={{ width: "500px", marginTop: "2px" }}>
          <Grid container xs={6} justifyContent="start">
            <Button variant="contained" onClick={resetHandler}>Reset</Button>
          </Grid>
          <Grid container xs={6} justifyContent="end">
            <Button variant="contained" onClick={saveHandler}>저장</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
