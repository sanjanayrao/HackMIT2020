import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import About from './componets/pages/About/About';
import Home from './componets/pages/Home/Home';




function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/about" component={About} />
        <Route path='/home' component={Home} />
        <Route path='/environscape' component={Home} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
