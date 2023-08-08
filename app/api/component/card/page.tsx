"use client"
import { useState, useRef, useContext, useEffect } from "react";

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
import { useDrag, useDrop } from "react-dnd";
import {ItemTypes} from "./dnd";

export default function Cards(props: any) {
  const ref = useRef<HTMLInputElement>(null);
  const menus = useContext(MenusContext);

  const config = props.config;
  const menuId = config.menuId;

  const [checked, setChecked] = useState(config.useYn == 'Y' ? true : false);
  const [timer, setTimer] = useState(config.setTimer);

  const timerClickHandlr = (vl: string) => {
    const menu = menus.menus.find(e => e.menuId == menuId);
    if (menu != undefined) {
      if (vl == 'R') {
        setTimer(++menu.setTimer);
      } else {
        setTimer(--menu.setTimer);
      }
      props.changeMenuHandler(menus.menus);
    }
  }

  const changeCheckHandler = () => {
    const menu = menus.menus.find(e => e.menuId == menuId);
    if (menu != undefined) {
      if (!checked) {
        menu.useYn = 'Y';
        setChecked(true);
      } else {
        menu.useYn = 'N';
        setChecked(false);
      }
      props.changeMenuHandler(menus.menus);
    }
  }

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if(clientOffset == null) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      props.moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });
  const [{ isDragging }, drag] = useDrag({
    item: {  id: menuId, index: props.index },
    type: ItemTypes.CARD,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  
  useEffect(() => {
    setChecked(config.useYn == 'Y' ? true : false);
    setTimer(config.setTimer);
  }, [props])

  return (
      <Card sx={{ width: "500px", margin: "5px" }} ref={ref}>
        <CardActionArea>
          <CardContent sx={{ height: "30px" }}>
            <Typography color="primary">
              {config.menuName}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={checked} onChange={changeCheckHandler} />} label={<Typography color='primary'>사용유무</Typography>} />
          </FormGroup>
          <IconButton onClick={(event) => { timerClickHandlr('L') }} color="primary" aria-label="add an alarm">
            <RemoveCircleIcon />
          </IconButton>
          <Typography color="primary">
            {timer}
          </Typography>
          <IconButton onClick={(event) => { timerClickHandlr('R') }} color="primary" aria-label="add an alarm">
            <AddCircleIcon />
          </IconButton>
          <Typography color="primary">
            유지시간(초)
          </Typography>
        </CardActions>
      </Card>
  )
}
