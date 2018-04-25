// @flow

import React, {
  PureComponent,
  Node,
} from 'react';
import { ConfigContext } from './context';
import ArtiboxEditor from './editor/ArtiboxEditor';
import Base64ImageHandler from './handlers/Base64ImageHandler';

type Props = {
  children?: Node,
  minimap?: boolean,
  handlers?: {
    image: ?Base64ImageHandler,
  },
};

export default class ArtiboxConfigProvider extends PureComponent<Props> {
  static defaultProps = {
    minimap: true,
  }

  static DEFAULT_HANDLERS = {
    image: new Base64ImageHandler(),
  }

  state = {
    editors: {},
  }

  createNewEditor(options) {
    this.setState({
      editors: {
        ...this.state.editors,
        [options.name]: new ArtiboxEditor({
          ...options,
          onUpdate: () => this.forceUpdate(),
        }),
      },
    });
  }

  render() {
    const {
      children,
      handlers,
      minimap,
    } = this.props;

    const {
      editors,
    } = this.state;

    return (
      <ConfigContext.Provider
        value={{
          minimap,
          handlers: {
            ...ArtiboxConfigProvider.DEFAULT_HANDLERS,
            ...(handlers || {}),
          },
          editors,
          createNewEditor: options => this.createNewEditor(options),
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
