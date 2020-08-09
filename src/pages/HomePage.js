import React from 'react';
import logo from '../assets/images/logo.svg';

import { Button } from 'react-bootstrap';
import Urls from './router/Urls';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container pt-6" style={{ height: '150vh' }}>
      <header>
        <h1>Home</h1>
      </header>
    </div>
  );
};

export default HomePage;
