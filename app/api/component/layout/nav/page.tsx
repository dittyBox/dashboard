import * as React from 'react';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  drawerBool: boolean;
  toggleFn: any;
}

export default function Nav(props: Props) {
  return (
    <Box sx={{ backgroundColor: "#343a40", height: "100%" }}>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key="메뉴1" disablePadding>
          <ListItemButton component="a" href="menu1">
            <ListItemIcon sx={{ color: "text.primary" }}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="메뉴1" />
          </ListItemButton>
        </ListItem>
        <ListItem key="메뉴2" disablePadding>
          <ListItemButton component="a" href="menu2">
            <ListItemIcon sx={{ color: "text.primary" }}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="메뉴2" />
          </ListItemButton>
        </ListItem>
        <ListItem key="메뉴3" disablePadding>
          <ListItemButton component="a" href="menu3">
            <ListItemIcon sx={{ color: "text.primary" }}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="메뉴3" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="설정" disablePadding>
          <ListItemButton component="a" href="/">
            <ListItemIcon sx={{ color: "text.primary" }}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="설정" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  )
}