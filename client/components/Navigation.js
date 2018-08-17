import React from 'react';
import { Link } from 'react-router-dom'

const Navigation = ({ children }) => (
  <div>
    <nav>
        <Link to='/'> Reverse String (Part1) </Link>|
        <Link to='/PostGetRequest'> Post/Get Request (Part2) </Link>
    </nav>
    { children }
  </div>
);

export default Navigation;
