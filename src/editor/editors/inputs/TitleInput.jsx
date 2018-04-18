// @flow

import React, { Fragment, PureComponent } from 'react';
import { inputResolver } from '../../../helper/input';
import { TYPE_PARAGRAPH } from '../../../type';

const styles = {
  input: {
    fontSize: '1.75em',
    padding: '0.4em 10px 0.15em 10px',
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
  remove: Function,
  input: {
    current: ?Node,
  },
  meta: {
    createBlock: Function,
  },
};

class TitleInput extends PureComponent<Props> {
  componentDidMount() {
    this.props.input.current.focus();
  }

  handleKeyUp(keyCode) {
    const {
      remove,
      value,
      meta: {
        createBlock,
      },
    } = this.props;

    switch (keyCode) {
      case 8:
        if (!value) remove();
        break;

      case 13:
        createBlock(TYPE_PARAGRAPH);
        break;

      default:
        break;
    }
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
          onKeyUp={({
            keyCode,
            which,
          }) => this.handleKeyUp(keyCode || which)}
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
