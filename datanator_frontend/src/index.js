import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import HomePage from './HomePage';
import MetabConcs from './MetabConcs';
import Chart3 from './Chart3';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'


const routing = (
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
  {/*<Route path="/metabconcs/:molecule/:organism(/:abstract)" component={MetabConcs} /> */}
  <Route path="/metabconcs/:molecule/:organism/:abstract?" component={MetabConcs} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
