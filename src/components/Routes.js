import React, { useEffect, useState, useContext } from 'react';
import { Route, Link, Routes } from 'react-router-dom';

import Blog from './blogs'
import Learn from './learn'
import "../App.css";
import ShowBlog from './showBlog';

const ErrorPage = () => {

  return (

    <div class="container1">
      <h2 style={{ textAlign: 'center', marginBottom: 0 }}>Oops! Page not found.</h2>
      <h1>404</h1>
      <p>We can't find the page you're looking for.</p>
      <Link to="/dsc_report">Go back home</Link>
      {/* <Footer/> */}
    </div>
  )
}

const Routess = () => {

  return (
    <Routes>
      {/* <Route path="/" element={<AllPoints />} /> */}
      {/* Add more routes as needed */}
      <Route exact path="/dsc_report" element={<Blog />} />
      <Route path="/dsc_report/search/:uid" element={<ShowBlog />}/>
      <Route element={<ErrorPage />} />
    </Routes>
  );

}

export default Routess;