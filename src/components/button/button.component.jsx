import React from 'react';

// import './button.style.scss';

import { CustomButtonContainer } from './button-style';

const CustomButton = ({children,...props}) => (
  <CustomButtonContainer {...props }>
    {children}
  </CustomButtonContainer>
);

export default CustomButton; 