// @flow

import React, { Fragment, PureComponent } from 'react';
import { mixer } from '../../../helper/style';
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
    backgroundColor: '#fafafa',
    color: 'transparent',
    caretColor: '#4a4a4a',
  },
  inputFocus: {
    backgroundColor: '#efefef',
  },
  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    pointerEvents: 'none',
    color: 'default',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
  },
};

type Props = {
  onChange: Function,
  value: string,
  remove: Function,
  input: {
    current: ?Node,
  },
  insertBlock: Function,
};

class TitleInput extends PureComponent<Props> {
  state = {
    isFocus: false,
  }

  componentDidMount() {
    const {
      input: {
        current,
      },
    } = this.props;

    current.focus();
  }

  handleKeyUp(keyCode) {
    const {
      remove,
      value,
      insertBlock,
    } = this.props;

    switch (keyCode) {
      case 8:
        if (!value) remove();
        break;

      case 13:
        insertBlock(TYPE_PARAGRAPH);
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

    const {
      isFocus,
    } = this.state;

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
          onFocus={() => this.setState({ isFocus: true })}
          onBlur={() => this.setState({ isFocus: false })}
          style={mixer([
            styles.input,
            isFocus && styles.inputFocus,
          ])}
          placeholder="Title"
          type="text" />
        <div
          style={{
            ...styles.input,
            ...styles.preview,
          }}>
          {value}
        </div>
      </Fragment>
    );
  }
}

export default inputResolver(TitleInput);
