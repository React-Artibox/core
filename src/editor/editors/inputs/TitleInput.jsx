// @flow

import React, { Fragment, PureComponent } from 'react';
import { inputResolver } from '../../../helper/input';
import IconTrash from '../../../icons/IconTrash';

const styles = {
  input: {
    fontSize: '1.2em',
    padding: '2px 10px',
    letterSpacing: 1,
    lineHeight: 1.618,
    border: '1px solid #f2f2f2',
    borderRadius: 2,
    outline: 'none',
    flexGrow: 1,
  },
};

type Props = {
  onChange: Function,
  value: string,
  remove: Function,
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
      remove,
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
        <button
          onClick={remove}
          type="button">
          <IconTrash scale={0.5} />
        </button>
      </Fragment>
    );
  }
}

export default inputResolver(TitleInput);
