import React from 'react';
import logo from '../assets/images/logo.svg';

import { Button } from 'react-bootstrap';
import Urls from './router/Urls';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="container pt-6">
      <header className="App-header">
        <h1>404</h1>
      </header>
    </div>
  );
};

export default Error404;
