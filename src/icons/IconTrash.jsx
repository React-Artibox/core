// @flow

import React from 'react';
import Icon from './Icon';

function IconTrash(props) {
  return (
    <Icon {...props}>
      <path
        d="M6 6L15 6L16 3L24 3L25 6L34 6L6 6" />
      <path
        d="M10 6L10 28L30 28L30 6" />
      <path
        d="M15 10L15 24" />
      <path
        d="M20 10L20 24" />
      <path
        d="M25 10L25 24" />
    </Icon>
  );
}

export default IconTrash;
