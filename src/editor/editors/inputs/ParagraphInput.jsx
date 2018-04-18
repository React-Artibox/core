// @flow

import React, { Fragment, PureComponent } from 'react';
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
    backgroundColor: '#efefef',
    outline: 'none',
    padding: '0.25em 0.5em',
    minHeight: '1.618em',
    border: 0,
    overflow: 'hidden',
  },
  wrapperLast: {
    padding: '0 0 12px 0',
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
  componentDidMount() {
    this.updateHeight();

    this.props.input.current.focus();
  }

  updateHeight() {
    const ta = this.props.input.current;

    ta.style.height = '1px';
    ta.style.height = `${ta.scrollHeight}px`;
  }

  handleKeyDown(code) {
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

    return (
      <Fragment>
        <textarea
          ref={input}
          onPaste={() => this.updateHeight()}
          onKeyDown={({
            keyCode,
            which,
          }) => this.handleKeyDown(keyCode || which)}
          onKeyUp={() => this.updateHeight()}
          onChange={({
            target: { value: v },
          }) => this.updateValueHandler(v)}
          value={value}
          style={styles.input}
          placeholder="Paragraph" />
      </Fragment>
    );
  }
}

export default inputResolver(ParagraphInput);
