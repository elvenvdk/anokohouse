import React from 'react';

import { navHeaders } from '../../componentData';
import Logo from '../../assets/anoko_logo_main.png';
import './NavBar.scss';

const renderHeaders = navHeaders.map((header, idx) => (
  <li className='NavBar__Headers-Item' key={idx}>
    {header.name.toUpperCase()}
  </li>
));

const navBar = () => {
  return (
    <div className='NavBar'>
      <img src={Logo} alt='AnokoLogo' className='NavBar__Logo' />
      <ul className='NavBar__Headers-Container'>{renderHeaders}</ul>
    </div>
  );
};

export default navBar;
