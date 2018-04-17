// @flow

import React from 'react';
import Icon from './Icon';

function IconSave(props) {
  return (
    <Icon {...props}>
      <circle
        cx="18"
        cy="21"
        r="4" />
      <path
        d="M6 2L29 2L34 10L34 30L6 30L6 2M12 2L12 12L24 12L24 2" />
    </Icon>
  );
}

export default IconSave;
