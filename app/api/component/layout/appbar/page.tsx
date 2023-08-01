"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  drawerBool: boolean;
  toggleFn: any;
}

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

export default function AppBarComp(props: Props) {
  let { window, drawerBool, toggleFn } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const clickTogleHandler = () =>{
    if(drawerBool){
      drawerBool = false;
      toggleFn(drawerBool);
    } else {
      drawerBool = true;
      toggleFn(drawerBool);
    }
  }
  return (
      <AppBar position="fixed" style={{backgroundColor: "#343a40", boxShadow:"none"}}
        sx={{...(drawerBool && {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: (theme) => theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),}}>
        <Toolbar variant="dense" style={{paddingLeft: 15}}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} style={{color: "text.secondary"}}
            onClick={clickTogleHandler}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" style={{color: "text.secondary"}}>
            MOMpro DashBoard
          </Typography>
        </Toolbar>
      </AppBar>
  )
}