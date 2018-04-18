// @flow

import React, { Fragment, PureComponent } from 'react';
import { mixer } from '../../../helper/style';
import { inputResolver } from '../../../helper/input';
import { TYPE_PARAGRAPH } from '../../../type';

const styles = {
  wrapper: {
    width: '100%',
    position: 'relative',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    fontSize: 16,
    lineHeight: 1.618,
    resize: 'none',
    width: '100%',
    backgroundColor: '#fafafa',
    outline: 'none',
    padding: '0.25em 10px',
    minHeight: '1.618em',
    border: 0,
    overflow: 'hidden',
  },
  wrapperLast: {
    padding: '0 0 12px 0',
  },
  inputFocus: {
    backgroundColor: '#efefef',
  },
};

type Props = {
  onChange: Function,
  value: string,
  remove: Function,
  meta: {
    createBlock: Function,
  },
  input: {
    current: ?Node,
  },
};

class ParagraphInput extends PureComponent<Props> {
  state = {
    isFocus: false,
  }

  componentDidMount() {
    this.updateHeight();

    this.props.input.current.focus();
  }

  updateHeight() {
    const ta = this.props.input.current;

    ta.style.height = '1px';
    ta.style.height = `${ta.scrollHeight}px`;
  }

  handleKeyUp(code) {
    const {
      remove,
      value,
    } = this.props;

    switch (code) {
      case 8:
        if (!value) remove();
        break;

      default:
        break;
    }

    this.updateHeight();
  }

  updateValueHandler(value) {
    const {
      onChange,
      meta: {
        createBlock,
      },
    } = this.props;

    if (value.match(/\n/)) {
      createBlock(TYPE_PARAGRAPH);

      return;
    }

    onChange(value);
  }

  render() {
    const {
      value,
      input,
    } = this.props;

    const {
      isFocus,
    } = this.state;

    return (
      <Fragment>
        <textarea
          ref={input}
          onPaste={() => this.updateHeight()}
          onKeyUp={({
            keyCode,
            which,
          }) => this.handleKeyUp(keyCode || which)}
          onChange={({
            target: { value: v },
          }) => this.updateValueHandler(v)}
          onFocus={() => this.setState({ isFocus: true })}
          onBlur={() => this.setState({ isFocus: false })}
          value={value}
          style={mixer([
            styles.input,
            isFocus && styles.inputFocus,
          ])}
          placeholder="Paragraph" />
      </Fragment>
    );
  }
}

export default inputResolver(ParagraphInput);
