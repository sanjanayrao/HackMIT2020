import { Card } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import * as React from 'react';


export default function Cards(props) {
  
    return (
        <Card style={{backgroundColor: props.col, color: "white", margin: "0px 0px 12px 0px"}}>
            <CardContent >
                <Typography variant="body2" component="p" >
                    {props.title} 
                </Typography>
                <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}} >
                    {props.body}
                </Typography>
            </CardContent>
        </Card>
    );
}