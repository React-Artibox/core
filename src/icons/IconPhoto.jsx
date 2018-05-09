// @flow

import React from 'react';
import Icon from './Icon';

function IconPhoto(props) {
  return (
    <Icon {...props}>
      <circle
        cx="10"
        cy="10"
        r="4" />
      <path
        d="M6 27L14 18L18 22L25 12L34 26" />
    </Icon>
  );
}

export default IconPhoto;
