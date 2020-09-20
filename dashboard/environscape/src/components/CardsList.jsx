import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cards from './Cards'

const useStyles = makeStyles((theme) => ({
    card :{
        display:'none',
        padding: 5,
    }
  }));
export default function CardsList(props) {
    const classes = useStyles();
    return (
        <div>
            <Cards title="Total Population" col="#5688C7" body={props.pop}></Cards>
            <Cards title="Median Age" col="#DDA448" body={props.age}></Cards>
            <Cards title="Median Income " col="#2C5784" body={'$'.concat(props.inc,'/year')}></Cards>
        </div>
    );
}