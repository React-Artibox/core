// @flow

import React, {
  PureComponent,
  Node,
} from 'react';
import { ConfigContext } from './context';
import Base64ImageHandler from './handlers/Base64ImageHandler';

type Props = {
  children?: Node,
  handlers?: {
    image: ?Base64ImageHandler,
  },
};

export default class ArtiboxConfigProvider extends PureComponent<Props> {
  static DEFAULT_HANDLERS = {
    image: new Base64ImageHandler(),
  }

  render() {
    const {
      children,
      handlers,
    } = this.props;

    return (
      <ConfigContext.Provider
        value={{
          handlers: {
            ...ArtiboxConfigProvider.DEFAULT_HANDLERS,
            ...(handlers || {}),
          },
        }}>
        {children}
      </ConfigContext.Provider>
    );
  }
}

export function createConfigProvider(options = {}) {
  return function renderProvider(props) {
    return <ArtiboxConfigProvider {...props} {...options} />;
  };
}
