"use client"
import './globals.css'
import AppBarComp from './api/component/layout/appbar/page'
import Nav from './api/component/layout/nav/page'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';

import { useSearchParams } from 'next/navigation';

import { ThemeProvider, styled, useTheme } from "@mui/material/styles";
import theme from "./theme";

const drawerWidth = 240;

export const metadata = {
  title: 'MOMpro DashBoard',
  description: 'GMOMpro DashBoard',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const searchParams = useSearchParams();
  let mode = searchParams.get("mode") == null ? true : false;
  const [state, setState] = useState(mode);
  const toggleDrawer =
    (vl: boolean) =>
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

    const toggleDrawer1 =
    (vl: boolean) => {
      setState(vl);
      console.log(state);
    };

  return (
    <html lang="en">
      <body>
        <Box sx={{ display: 'flex' }}>
          <ThemeProvider theme={theme}>
          <CssBaseline />
            <AppBarComp drawerBool={state} toggleFn={toggleDrawer1} mode={mode} />
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
              <Nav drawerBool={state} toggleFn={toggleDrawer1}/>
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
        }), height:"100%"}}>
              {children}
            </Box>
          </ThemeProvider>
        </Box>
      </body>
    </html>
  )
}
