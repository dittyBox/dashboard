"use client"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Cards from './api/component/card/page'
import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import MenusContext, { DefaultMenu } from '@/app/api/context/menus'
import Button from '@mui/material/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as _ from "lodash";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


export default function Home() {
  let menus = useContext(MenusContext);

  const router = useRouter();

  const [useMenu, setUseMenu] = useState<MenuType[]>([]);

  const changeMenuHandler = (vl: MenuType[]) =>{
    menus.menus = vl;
  }

  const resetHandler = () => {
    const DefaultMenuTemp = _.cloneDeep(DefaultMenu);
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

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = useMenu[dragIndex];

    // 1. 사용자가 item을 드래그하고 있다면
    if (dragItem) {
      setUseMenu((prevState) => {
        // 2. 기존의 데이터(prevState)를 새로운 변수에 복사한다.
        const coppiedStateArray = [...prevState];

        // 3. splice로 hoverIndex 위치부터 1개의 데이터를 제거한 후,
        // 삭제한 index 위치에 현재 드래그하고 있는 item 데이터를 넣는다.
        // -> 삭제된 요소들의 배열은 prevItem 변수에 저장된다.
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // 4. 3번과 마찬가지의 과정을 거친 후
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
        const temp = coppiedStateArray.map((e,index)=>{e.playSort = index+1; return e})
        menus.changeMenus(temp);
        // 5. coppiedStateArray 배열을 return
        return temp;
      });
    }
  };

  useEffect(()=>{
    setUseMenu(menus.menus);
  }, [useMenu])

  return (
    <Box component="main" sx={{ marginTop: "50px" }}>
      <Grid container spacing={1} direction="column"
        justifyContent="center"
        alignItems="center" >
        <DndProvider backend={HTML5Backend}>
          {
            useMenu.sort((a, b) => {
              if (a.playSort > b.playSort) {
                return 1;
              } else if (a.playSort === b.playSort) {
                return 0;
              } else return -1;
            }).map((menu, index) => {
              return (
                  <Cards key={menu.menuId} config={menu} changeMenuHandler={changeMenuHandler}
                    index= {index} moveCardHandler={moveCardHandler} />
              )
            })
          }
        </DndProvider>
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
