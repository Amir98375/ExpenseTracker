import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth:300
  },
});

const MyCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Total : {props.income - props.expense}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Income: {props.income}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Expense: {props.expense}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const MemoisedCard = React.memo(MyCard);
