// @flow

import React from 'react';
import Icon from './Icon';

function IconTitle(props) {
  return (
    <Icon {...props}>
      <text
        x="14"
        y="24"
        fontWeight="500"
        fontFamily="sans-serif"
        fontSize="20">
        T
      </text>
      <rect
        width="36"
        height="28"
        rx="4"
        ry="4"
        x="2"
        y="2" />
    </Icon>
  );
}

export default IconTitle;
