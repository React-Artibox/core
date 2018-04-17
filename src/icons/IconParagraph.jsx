// @flow

import React, { PureComponent } from 'react';
import { BLOCK_ICON, BLOCK_ICON_HOVERED } from '../styles/color';

class IconParagraph extends PureComponent<Props, State> {
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
          <text
            x="8"
            y="23"
            fill={isHovered ? BLOCK_ICON_HOVERED : BLOCK_ICON}
            strokeWidth="0"
            fontWeight="500"
            fontFamily="sans-serif"
            fontSize="18">
            A
          </text>
          <text
            x="21"
            y="23"
            fill={isHovered ? BLOCK_ICON_HOVERED : BLOCK_ICON}
            strokeWidth="0"
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
        </g>
      </svg>
    );
  }
}

export default IconParagraph;
