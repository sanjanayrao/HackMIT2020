import React,  {Component} from 'react';
import {Bar} from 'react-chartjs-2';

import Paper from '@material-ui/core/Paper';

export default function BarChart(props) {

    var data = {
      labels: ['White', 'Black', 'Hispanic', 'Asian', 'Native', 'Pacific Islander'],
      datasets: [
          {
              label: 'Population',
              title: 'Race',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [props.demographics.race_total_white, props.demographics.race_total_black, props.demographics.race_total_hispanic, props.demographics.race_total_asian, props.demographics.race_total_native, props.demographics.race_total_pacific_islander]
          }
      ]
    }
    return (
      <Paper style={{padding:12}} elevation={3} >
        <Bar
          data={data}
          width={100}
          height={256}
          options={{
            maintainAspectRatio: false
          }}
        />
    </Paper>
    );
}