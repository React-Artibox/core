// @flow

import React, { Fragment, PureComponent } from 'react';
import Colors from '@artibox/colors';
import { mixer } from '../../../helper/style';
import { inputResolver } from '../../../helper/input';
import { TYPE_PARAGRAPH } from '../../../type';

type Props = {
  onChange: Function,
  value: string,
  remove: Function,
  input: {
    current: ?Node,
  },
  insertBlock: Function,
};

type State = {
  isFocus: boolean,
};

class TitleInput extends PureComponent<Props, State> {
  styles = {
    input: {
      fontSize: '1.75em',
      padding: '0.4em 10px 0.15em 10px',
      letterSpacing: 1,
      lineHeight: 1.618,
      border: 0,
      borderRadius: 0,
      outline: 'none',
      flexGrow: 1,
      color: 'transparent',
      backgroundColor: Colors.INPUT_BACKGROUND,
      caretColor: '#4a4a4a',
    },
    inputFocus: {
      backgroundColor: Colors.INPUT_BACKGROUND_HOVERED,
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
          onChange={({
            target: { value: v },
          }) => onChange(v)}
          value={value}
          onFocus={() => this.setState({ isFocus: true })}
          onBlur={() => this.setState({ isFocus: false })}
          style={mixer([
            this.styles.input,
            isFocus && this.styles.inputFocus,
          ])}
          placeholder="Title"
          type="text" />
        <div
          style={{
            ...this.styles.input,
            ...this.styles.preview,
          }}>
          {value}
        </div>
      </Fragment>
    );
  }
}

export default inputResolver(TitleInput);
