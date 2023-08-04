"use client"
import './globals.css'
import AppBarComp from './api/component/layout/appbar/page'
import Nav from './api/component/layout/nav/page'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, styled, useTheme } from "@mui/material/styles";
import theme from "./theme";

const drawerWidth = 240;

export const metadata = {
  title: 'MOMpro DashBoard',
  description: 'GMOMpro DashBoard',
}

const menuData: MenuType[] = [
  { menuId: 'menu1', setTimer: 10, useYn: 'Y', endPoint: '/menu1?mode=play', sort: 1 },
  { menuId: 'menu2', setTimer: 10, useYn: 'Y', endPoint: '/menu2?mode=play', sort: 2 },
  { menuId: 'menu3', setTimer: 10, useYn: 'Y', endPoint: '/menu3?mode=play', sort: 3 },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  let usePathnm = usePathname();
  let mode = searchParams.get("mode") == null ? true : false;
  const [state, setState] = useState(mode);

  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [redirectTo, setRedirectTo] = useState('/');

  const toggleDrawer = (vl: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState(vl);
    };

  const toggleDrawer1 = (vl: boolean) => {
    setState(vl);
    console.log(state);
  };
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  const toggleMode = (vl: boolean) => {
    console.log(vl);
    toggleFullScreen();
    if(vl){
      setSecondsRemaining(0);
      setState(false);
      router.push(`${usePathnm}?mode=play`);
    } else {
      setSecondsRemaining(0);
      setState(true);
      router.push(usePathnm);
    }
  }

  const moveMenu = (arrow: string) => {
    const menuDataUse = menuData.filter(e => e.useYn === 'Y').find(e => e.menuId == usePathnm.replace('/', ''));
    if (menuDataUse != undefined) {
      if (document.fullscreenElement != null) {
        document.exitFullscreen()
      }
      if (arrow == 'L') {
        setSecondsRemaining(0);
        setState(true);
        const sortData = menuData.sort((a,b)=>
        {
          if(a.sort > b.sort){
            return -1; 
          } else if(a.sort === b.sort) {
            return 0; 
          } else return 1;
        }).find(e=>e.sort<menuDataUse.sort)

        if(sortData == undefined){
          const MaxData = menuData.sort((a,b)=>
          {
            if(a.sort > b.sort){
              return -1; 
            } else if(a.sort === b.sort) {
              return 0; 
            } else return 1;
          })[0]
          router.push(`/${MaxData.menuId}`);
        } else {
          router.push(`/${sortData.menuId}`);
        }
      } else if (arrow == 'R') {
        setSecondsRemaining(0);
        setState(true);

        const sortData = menuData.sort((a,b)=>
        {
          if(a.sort > b.sort){
            return 1; 
          } else if(a.sort === b.sort) {
            return 0; 
          } else return -1;
        }).find(e=>e.sort > menuDataUse.sort)

        if(sortData == undefined){
          const MaxData = menuData.sort((a,b)=>
          {
            if(a.sort > b.sort){
              return 1; 
            } else if(a.sort === b.sort) {
              return 0; 
            } else return -1;
          })[0]
          router.push(`/${MaxData.menuId}`);
        } else {
          router.push(`/${sortData.menuId}`);
        }
      } else {
        return;
      }
    }
  }

  useEffect(() => {
    if (!mode) {
      if (secondsRemaining == 0) {
        if(usePathnm == '/'){
          usePathnm = menuData.filter(e => e.useYn === 'Y')[0].menuId;
          router.push(menuData.filter(e => e.useYn === 'Y')[0].endPoint);
        }
        const menuDataUse = menuData.filter(e => e.useYn === 'Y').find(e => e.menuId == usePathnm.replace('/', ''));
        if (menuDataUse == undefined) {
          setRedirectTo('/');
        } else {
          let sortMax = menuDataUse.sort;
          const findSortMax = menuData.filter(e => e.useYn === 'Y').find(e => e.sort > sortMax);
          if (findSortMax == undefined) {
            const sortMin = menuData.reduce((acc, cur, idx) => { if (acc == 0) { return cur.sort } else { return acc > cur.sort ? cur.sort : acc } }, 0);
            const findData = menuData.find(e => e.sort == sortMin);
            setRedirectTo(findData == undefined ? '/' : findData.endPoint);
            setSecondsRemaining(findData == undefined ? 0 : findData.setTimer);
          } else {
            setRedirectTo(findSortMax.endPoint);
            setSecondsRemaining(findSortMax.setTimer);
          }
        }
      }
      console.log(`${secondsRemaining}      ${redirectTo}`);

      const timer = setTimeout(() => {
        setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
        if (secondsRemaining === 2) router.push(redirectTo);
      }, 1000);

      return () => {
        console.log('end');
        clearInterval(timer);
      };
    }
  }, [router, secondsRemaining, mode]);
  return (
    <html lang="en">
      <body>
        <Box sx={{ display: 'flex' }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBarComp drawerBool={state} toggleFn={toggleDrawer1} mode={mode} toggleMode={toggleMode}
            moveMenu={moveMenu} />
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              anchor="left"
              variant="persistent"
              open={state}
              onClose={toggleDrawer(state)}
            >
              <Nav drawerBool={state} toggleFn={toggleDrawer1} />
            </Drawer>
            <Box
              sx={{
                flexGrow: 1,
                padding: (theme) => theme.spacing(3),
                transition: (theme) => theme.transitions.create('margin', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                marginLeft: `-${drawerWidth}px`,
                ...(state && {
                  transition: (theme) => theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                  marginLeft: 0,
                }), height: "100%"
              }}>
              {children}
            </Box>
          </ThemeProvider>
        </Box>
      </body>
    </html>
  )
}
