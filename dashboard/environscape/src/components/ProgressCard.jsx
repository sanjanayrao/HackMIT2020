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
    padding: theme.spacing(3),
    width: "50%"
  },
  statColor: {
    backgroundColor: props => props.col
  }
}));

export default function ProgressCard(props) {
    const classes = useStyles(props);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
    
    console.log(props)
    const open = Boolean(anchorEl);
    return (
        <Card   style={{margin: "0 0 14px 0"}} aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}>
            <CardContent style={{backgroundColor: "#F0F0F0"}}>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.title} 
                </Typography>
                <Typography gutterBottom variant="body2" component="p" style={{textAlign: "right", margin: "0 3px -20px 0", zIndex: 1000, position: "relative"}}>
                  {props.aqi + '/500'}
                </Typography>
                <BorderLinearProgress classes={{barColorPrimary: classes.statColor}} variant="determinate" value={props.aqi/5}/>
            </CardContent>
            <Popover
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
            </Popover>
        </Card>
    );
}