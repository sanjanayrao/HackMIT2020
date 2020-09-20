import React,  {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';



class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addr: '',
      rad: '1 mi'
    }
  }


   handleChange = (event) => {
    this.setState({rad: event.target.values })
  }
  updateState = (event) => {
    this.setState({addr : event.target.value })

  }

  render () {
    return (
      <div style={{flexGrow : 1}}>
        <Grid container style={{flexGrow : 1}} spacing={3} > 
          <Grid item xs={12} sm={6} md={6} lg={7}> 
            <TextField
                id="search-bar"
                label="Address"
                placeholder="Enter an address to get started!"
                helperText=""
                onChange={this.updateState}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={2} md={2} lg={2}>
            <FormControl  fullWidth>
              {/* <InputLabel>Radius</InputLabel> */}
              <InputLabel shrink >
                Radius
              </InputLabel>
              <NativeSelect
                value={this.state.rad}
                onChange={this.handleChange}
                inputProps={{
                  name: 'Radius',
                  id: 'uncontrolled-native',
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
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Button  onClick={() => {this.props.handleClick(this.state.addr, this.state.rad)}} variant="contained" color="primary" size="large" fullWidth >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </div>
      );
    }
  
}
  
export default SearchBar