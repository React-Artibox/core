// @flow

import React, {
  PureComponent,
  Node,
} from 'react';

type Props = {
  children?: Node,
};

export default class ArtiboxConfigProvider extends PureComponent<Props> {
  render() {
    const {
      children,
    } = this.props;

    return children;
  }
}

export function createConfigProvider(options = {}) {
  return function renderProvider(props) {
    return <ArtiboxConfigProvider {...props} {...options} />;
  };
}
