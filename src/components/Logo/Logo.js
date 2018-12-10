import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const Logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger Logo" />
  </div>
);

export default Logo;