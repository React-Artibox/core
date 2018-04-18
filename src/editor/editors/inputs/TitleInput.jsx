// @flow

import React, { Fragment, PureComponent } from 'react';
import { inputResolver } from '../../../helper/input';

const styles = {
  input: {
    fontSize: '1.5em',
    padding: '0.25em 10px',
    letterSpacing: 1,
    lineHeight: 1.618,
    border: 0,
    borderRadius: 2,
    outline: 'none',
    flexGrow: 1,
    backgroundColor: '#efefef',
  },
};

type Props = {
  onChange: Function,
  value: string,
  input: {
    current: ?Node,
  },
};

class TitleInput extends PureComponent<Props> {
  componentDidMount() {
    this.props.input.current.focus();
  }

  render() {
    const {
      onChange,
      value,
      input,
    } = this.props;

    return (
      <Fragment>
        <input
          ref={input}
          onChange={onChange}
          value={value}
          style={styles.input}
          placeholder="Title"
          type="text" />
      </Fragment>
    );
  }
}

export default inputResolver(TitleInput);
