import { Card } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';

const BorderLinearProgress = withStyles({
    root: {
      height: 20,
    },
  })(LinearProgress);

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function Cards(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    return (
        <Card style={{backgroundColor: props.col, color: '#ffffff', margin: "5px"}}  aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}>
            <CardContent >
                <Typography gutterBottom variant="h5" component="h2" style={{align:'center'}}>
                    {props.title} 
                </Typography>
                <Typography variant="body2" text-color={props.aq ? "#000000" :"white"} component="p" style={{align:'center'}}>
                   {props.body}
                </Typography>
                {props.aq ? <BorderLinearProgress variant="determinate" value={props.aqi/5}/> : <></>}
            </CardContent>
            {props.aq ? <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >{ props.source == "" ? 
                <>
                <Typography>
                    <b>Dominant Pollutant</b>: {props.poll}
                </Typography>
                <Typography>
                    <b>Health Recommendation</b>: {props.health}
                </Typography> 
                </>:
                <><Typography>
                    <b>Source</b>: {props.source}
                </Typography>
                <Typography>
                    <b>Effect</b>: {props.effects}
                </Typography></>}
            </Popover> : <p></p> }
        </Card>
    );
}