"use client"
import { useRef } from "react";

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import theme from "@/app/theme";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TextField from '@mui/material/TextField';
import MenusContext from '@/app/api/context/menus'

export default function Cards(props: any) {
  const ref = useRef(null);

  const config = props.config;

  const rightClickHandlr = () => {
    
  }

  return (
    <Card ref={ref}>
      <CardActionArea>
        <CardContent sx={{ height: "30px" }}>
          <Typography color="primary">
            {config.menuName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label={<Typography color='primary'>사용유무</Typography>} />
        </FormGroup>
        <IconButton color="primary" aria-label="add an alarm">
          <RemoveCircleIcon />
        </IconButton>
          <Typography color="primary">
            {config.setTimer}
          </Typography>
        <IconButton onClick={rightClickHandlr} color="primary" aria-label="add an alarm">
          <AddCircleIcon />
        </IconButton>
        <Typography color="primary">
          유지시간(초)
        </Typography>
      </CardActions>
    </Card>
  )
}
