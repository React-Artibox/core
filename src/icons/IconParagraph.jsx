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
    </Icon>
  );
}

export default IconParagraph;
