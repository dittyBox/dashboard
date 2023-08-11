import * as React from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenusContext from '@/app/api/context/menus'
import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';

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
      <Typography variant="h6" color="inherit" component="div" 
      style={{ color: "text.secondary", height:"45px", textAlign:"center", marginTop: "10px" }}>
        MOMpro DashBoard
      </Typography>
      <Divider sx={{backgroundColor:"text.secondary"}} />
      <List>
        {
          menus.menus.sort((a, b) => {
            if (a.sort > b.sort) {
              return 1;
            } else if (a.sort === b.sort) {
              return 0;
            } else return -1;
          }).map(menu => {
            return (
              <ListItem key={menu.menuId} disablePadding >
                <ListItemButton component="a" onClick={
                  (event) => {
                    movePages(menu.menuId);
                  }
                }>
                  <ListItemIcon sx={{ color: "text.primary" }}>
                    <SpeakerNotesOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={menu.menuName} />
                </ListItemButton>
              </ListItem>
            )
          })
        }
      </List>
      <Divider sx={{backgroundColor:"text.secondary"}} />
      <List>
        <ListItem key="설정" disablePadding>
          <ListItemButton component="a" onClick={
                  (event) => {
                    movePages('/');
                  }
                }>
            <ListItemIcon sx={{ color: "text.primary" }}>
              <BuildCircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="설정" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{backgroundColor:"text.secondary"}} />
    </Box>
  )
}