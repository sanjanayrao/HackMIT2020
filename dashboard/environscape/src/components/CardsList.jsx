import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cards from './Cards'

const useStyles = makeStyles((theme) => ({
    card:{
        backgroundColor: "#9E8FB2"
    }
  }));

export default function CardsList(props) {
    const classes = useStyles();
    return (
        <div>
            <Cards className={classes.card} title="Total Population" body="test body1"></Cards>
            <Cards title="Average Age" body="test body2"></Cards>
            <Cards title="Average Income" body="test body3"></Cards>
        </div>
    );
}