import React, { Component } from 'react';
import { RouterGuard } from 'react-router-guard';
import routesConfig from './routes/config';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap';
import './styles/ui.css';
import 'react-slideshow-image/dist/styles.css'
import 'antd/dist/antd.css';


class App extends Component{
  render(){
    return (
      <div>
         <RouterGuard config={routesConfig} />
      </div>
    );
  }
}

export default App;
