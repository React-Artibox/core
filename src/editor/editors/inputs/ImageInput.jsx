// @flow

import React, { PureComponent } from 'react';
import IconPhoto from '../../../icons/IconPhoto';
import { inputResolver } from '../../../helper/input';

const styles = {
  wrapper: {
    width: '100%',
    position: 'relative',
    height: '20vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    padding: '0.25em 0.5em',
  },
  input: {
    opacity: 0,
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
};

type Props = {
  onChange: Function,
  value: string,
  input: {
    current: ?Node,
  },
};

class ImageInput extends PureComponent<Props> {
  render() {
    const {
      onChange,
      value,
      input,
    } = this.props;

    return (
      <div style={styles.wrapper}>
        {value ? (
          <img src={value} alt="" style={styles.image} />
        ) : (
          <IconPhoto scale={1.5} />
        )}
        <input
          ref={input}
          key={value || Math.random()}
          onChange={onChange}
          style={styles.input}
          accept="image/*"
          type="file" />
      </div>
    );
  }
}

export default inputResolver(ImageInput);
