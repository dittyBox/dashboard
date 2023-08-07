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
import MenusContext from '@/app/api/context/menus'
import { useContext } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  const menus = useContext(MenusContext);
  const router = useRouter();

  const movePages = (routerUrl:string) =>{
    router.push(routerUrl);
  }

  return (
    <Box sx={{ backgroundColor: "#343a40", height: "100%" }}>
      <Toolbar />
      <Divider />
      <List>
        {
          menus.map(menu => {
            return (
              <ListItem key={menu.menuId} disablePadding >
                <ListItemButton component="a" onClick={
                  (event) => {
                    movePages(menu.menuId);
                  }
                }>
                  <ListItemIcon sx={{ color: "text.primary" }}>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={menu.menuName} />
                </ListItemButton>
              </ListItem>
            )
          })
        }
      </List>
      <Divider />
      <List>
        <ListItem key="설정" disablePadding>
          <ListItemButton component="a" onClick={
                  (event) => {
                    movePages('/');
                  }
                }>
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