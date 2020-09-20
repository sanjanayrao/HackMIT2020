import React,  {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';

export default function PieChart(props) {

  var data = {
    labels: [
      'No Education',
      'High School',
      'Associates',
      'Bachelors',
      'Doctorates'
    ],
    datasets: [{
      data: [props.demographics.education_none, props.demographics.education_highschool, props.demographics.education_associate, props.demographics.education_bachelor, props.demographics.education_master, props.demographics.education_doctorate],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56', 
      '#C6A2EB',
      '#A1CE56', 
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#C6A2EB',
      '#A1CE56',
      ]
    }]
  }


  return (
    <Paper style={{padding:12}} elevation={3} >
      <Doughnut 
        data={data} 
        height={256}
      />
    </Paper>
  );
  
}

