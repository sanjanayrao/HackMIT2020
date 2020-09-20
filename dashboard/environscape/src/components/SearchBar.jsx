import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  formControl: { 
    marginLeft: 16,
    height: '110%',
    width: '96px'
  },
}));

export default function SearchBar() {
  const classes = useStyles();

  const [num, setRadius] = React.useState({
    num: '1',
  });

  const handleChange = (event) => {
    setRadius(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.root} spacing={0} justify='left' > 
        <Grid item xs={12} sm={8}> 
          <TextField
              className={classes.textField}
              id="search-bar"
              label="Address"
              placeholder="Enter an address to get started!"
              helperText=""
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="radius-picker">Radius</InputLabel>
            <NativeSelect
              value={num}
              onChange={handleChange}
              defaultValue={1}
              inputProps={{
                name: 'Radius',
                id: 'radius-picker',
              }}
            >
              
              <option value={1}>1 mi</option>
              <option value={2}>2 mi</option>
              <option value={3}>3 mi</option>
              <option value={4}>4 mi</option>
              <option value={5}>5 mi</option>
            </NativeSelect>
        </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}