// @flow

import React from 'react';
import Icon from './Icon';

function IconTitle(props) {
  return (
    <Icon {...props}>
      <text
        x="14"
        y="24"
        fontWeight="300"
        fontFamily="sans-serif"
        fontSize="20">
        T
      </text>
    </Icon>
  );
}

export default IconTitle;
