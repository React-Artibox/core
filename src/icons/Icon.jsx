// @flow

import React, { PureComponent } from 'react';
import Colors from '@artibox/colors';

type Props = {
  children: Node,
  scale?: number,
  onClick?: ?Function,
};

type State = {
  isHovered: boolean,
};

const styles = {
  clickable: {
    cursor: 'pointer',
  },
};

class Icon extends PureComponent<Props, State> {
  static defaultProps = {
    scale: 1,
    onClick: null,
  };

  state = {
    isHovered: false,
  }

  updateTextNode(nodes) {
    const {
      isHovered,
    } = this.state;

    if (Array.isArray(nodes)) {
      return nodes.map((node) => {
        if (!React.isValidElement(node)) return node;

        return {
          ...node,
          props: {
            ...node.props,
            children: this.updateTextNode(node.props.children),
            ...(node.type === 'text' ? {
              fill: isHovered ? Colors.BLOCK_ICON_HOVERED : Colors.BLOCK_ICON,
              strokeWidth: 0,
            } : {}),
          },
        };
      });
    }

    if (!React.isValidElement(nodes)) return nodes;

    return {
      ...nodes,
      props: {
        ...nodes.props,
        children: this.updateTextNode(nodes.props.children),
        ...(nodes.type === 'text' ? {
          fill: isHovered ? Colors.BLOCK_ICON_HOVERED : Colors.BLOCK_ICON,
          stroke: 0,
        } : {}),
      },
    };
  }

  render() {
    const {
      isHovered,
    } = this.state;

    const {
      children,
      scale,
      onClick,
    } = this.props;

    return this.updateTextNode((
      <svg
        style={onClick ? styles.clickable : null}
        onClick={onClick}
        transform={`scale(${scale})`}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
        width="40"
        height="32">
        <g
          fill="transparent"
          strokeWidth="2"
          stroke={isHovered ? Colors.BLOCK_ICON_HOVERED : Colors.BLOCK_ICON}>
          {children}
        </g>
      </svg>
    ));
  }
}

export default Icon;
