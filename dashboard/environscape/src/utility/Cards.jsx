import { Card } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import * as React from 'react';

export default function Cards(props) {
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.body}
                </Typography>
            </CardContent>
        </Card>
    );
}
// #export default CardList

