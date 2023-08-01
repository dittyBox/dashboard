"use client"
import { useRef } from "react";

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Cards(props:any) {

  const ref = useRef(null);

  return (
    <Card ref={ref}>
    <CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.children}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        Share
      </Button>
      <Button size="small" color="primary">
        Learn More
      </Button>
    </CardActions>
  </Card>
  )
}
