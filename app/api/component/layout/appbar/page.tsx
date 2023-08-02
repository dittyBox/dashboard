"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import {lightBlue} from '@mui/material/colors'
import theme from '@/app/theme';
import { alpha } from '@mui/material/styles';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  drawerBool: boolean;
  toggleFn: any;
  mode: boolean;
}

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

export default function AppBarComp(props: Props) {
  let { window, drawerBool, toggleFn, mode } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const [checked, setChecked] = React.useState(!mode);
  const handle = useFullScreenHandle();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const clickTogleHandler = () => {
    if (drawerBool) {
      drawerBool = false;
      toggleFn(drawerBool);
    } else {
      drawerBool = true;
      toggleFn(drawerBool);
    }
  }
  return (
    <AppBar position="fixed" style={{ backgroundColor: "#343a40", boxShadow: "none" }}
      sx={{
        ...(drawerBool && {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: (theme) => theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }}>
      <Toolbar variant="dense" style={{ paddingLeft: 15 }}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} style={{ color: "text.secondary" }}
          onClick={clickTogleHandler}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }} style={{ color: "text.secondary" }}>
          MOMpro DashBoard
        </Typography>

        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          //onClick={handleMenu}
          color="inherit"
        >
        {/* sx={(
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: lightBlue[300],
            '&:hover': {
              backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
            },
          },
        )} */}
          <AccountCircle />
        </IconButton>
        <Switch
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: lightBlue[200],
              '&:hover': {
                backgroundColor: alpha(lightBlue[200], theme.palette.action.hoverOpacity),
              },
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: lightBlue[200],
            },
          }}
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled', color:"blue" }}
        />
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          //onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}