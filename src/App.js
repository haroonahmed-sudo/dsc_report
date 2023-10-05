import React, { Component, useEffect, useState } from 'react';
import Routes from './components/Routes';
import TopNavigation from './components/topNavigation';
import SideNavigation from './components/sideNavigation';
import Footer from './components/Footer';
import './index.css';
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  document.title = 'Changing Management'
  return (

    <Router basename='/dsc_report'>
      <TopNavigation />
      {/* <SideNavigation /> */}
      <Routes />
      {/* <Footer /> */}
    </Router>
    // <div>
    //   Hi
    // </div>
  );

}

export default App;
