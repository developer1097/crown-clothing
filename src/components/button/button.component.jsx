import React from 'react';

import './button.style.scss';

const CustomButton = ({ children , isGoogleSignIn, inverted, ...othetProps}) => (
  <button className={`${inverted ? 'inverted' : ''}
  ${isGoogleSignIn ? 'google-sign-in' : ''}
    custom-button`} {...othetProps}>
    {children}
  </button>
);

export default CustomButton;