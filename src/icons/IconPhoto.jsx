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
      <rect
        width="36"
        height="28"
        rx="4"
        ry="4"
        x="2"
        y="2" />
      <path
        d="M6 27L14 18L18 22L25 12L34 26" />
    </Icon>
  );
}

export default IconPhoto;
