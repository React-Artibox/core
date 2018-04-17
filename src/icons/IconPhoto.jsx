// @flow

import React, { PureComponent } from 'react';
import { BLOCK_ICON, BLOCK_ICON_HOVERED } from '../styles/color';

type Props = {};
type State = {
  isHovered: boolean,
};

class IconPhoto extends PureComponent<Props, State> {
  state = {
    isHovered: false,
  }

  render() {
    const {
      isHovered,
    } = this.state;

    return (
      <svg
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
        width="40"
        height="32">
        <g
          fill="transparent"
          strokeWidth="2"
          stroke={isHovered ? BLOCK_ICON_HOVERED : BLOCK_ICON}>
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
        </g>
      </svg>
    );
  }
}

export default IconPhoto;
