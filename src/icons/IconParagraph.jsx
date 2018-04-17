// @flow

import React from 'react';
import Icon from './Icon';

function IconParagraph(props) {
  return (
    <Icon {...props}>
      <text
        x="8"
        y="23"
        fontWeight="500"
        fontFamily="sans-serif"
        fontSize="18">
        A
      </text>
      <text
        x="21"
        y="23"
        fontWeight="400"
        fontFamily="sans-serif"
        fontSize="18">
        a
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

export default IconParagraph;
