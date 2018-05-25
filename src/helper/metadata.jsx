// @flow

import React, {
  PureComponent,
  ComponentType,
} from 'react';
import { MetadataContext } from '../context';

type Props = {
  update: Function,
  name: string,
  metaKey: string,
  Component: ComponentType,
  value: ?string,
};

class MiddlewareComponent extends PureComponent<Props> {
  render() {
    const {
      Component,
      metaKey,
      name,
      update,
      value,
    } = this.props;

    return (
      <Component
        value={value}
        onChange={v => update(name, metaKey, v)} />
    );
  }
}

export const metadataResolver =
  (key: string) => (Component: ComponentType) => function MetadataResolver() {
    return (
      <MetadataContext.Consumer>
        {({
          name,
          metadata,
          update,
        }) => (
          <MiddlewareComponent
            update={update}
            name={name}
            metaKey={key}
            Component={Component}
            value={metadata[key]} />
        )}
      </MetadataContext.Consumer>
    );
  };

export default {
  metadataResolver,
};
