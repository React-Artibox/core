// @flow

import React, { Fragment } from 'react';
import { mixer } from '../../../helper/style';
import { inputResolver } from '../../../helper/input';
import { TYPE_PARAGRAPH } from '../../../type';
import RangeHandler from '../../../helper/RangeHandler';

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
    color: 'transparent',
    caretColor: '#4a4a4a',
  },
  wrapperLast: {
    padding: '0 0 12px 0',
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
    width: '100%',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
  },
  menu: {
    backgroundColor: '#121212',
    borderRadius: 4,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
    position: 'absolute',
    zIndex: 10,
    padding: '2px 8px',
    opacity: 0,
    pointerEvents: 'none',
    transform: 'scale(1.01) translate(0, -12px)',
    transition: 'opacity 0.12s ease-out, transform 0.08s ease-out',
  },
  menuShown: {
    opacity: 1,
    pointerEvents: 'cursor',
    transform: 'scale(1) translate(0, 0)',
  },
  menuButton: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.618,
    letterSpacing: 1,
    padding: '0 0 0 1px',
  },
  triangle: {
    borderTop: '6px solid #121212',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    position: 'absolute',
    left: 'calc(50% - 3px)',
    bottom: -6,
    zIndex: 10,
  },
};

type Props = {
  onChange: Function,
  value: string,
  remove: Function,
  insertBlock: Function,
  input: {
    current: ?Node,
  },
};

class ParagraphInput extends RangeHandler<Props> {
  state = {
    isFocus: false,
    menuX: null,
    menuY: null,
    menuShown: false,
  }

  constructor(props) {
    super(props);

    this.preview = React.createRef();
    this.menu = React.createRef();
  }

  componentDidMount() {
    this.updateHeight();

    this.props.input.current.focus();
  }

  onSelect() {
    const {
      input: {
        current: textarea,
      },
    } = this.props;

    if (textarea.selectionStart === textarea.selectionEnd) {
      this.setState({
        menuShown: false,
      });

      return;
    }

    const rangeOnPreview = this.getSelectedRangeOnPreview();
    const {
      x: parentX,
      y: parentY,
    } = textarea.getBoundingClientRect();
    const { width: menuWidth } = this.menu.current.getBoundingClientRect();
    const {
      x: selectionX,
      y: selectionY,
      width,
    } = rangeOnPreview.getBoundingClientRect();

    this.setState({
      menuShown: true,
      menuX: (selectionX + ((width - menuWidth) / 2)) - parentX,
      menuY: selectionY - parentY - 32,
    });
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
      insertBlock,
    } = this.props;

    if (value.match(/\n/)) {
      insertBlock(TYPE_PARAGRAPH);

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
      menuX,
      menuY,
      menuShown,
    } = this.state;

    return (
      <Fragment>
        <textarea
          ref={input}
          onSelect={() => this.onSelect()}
          onPaste={() => this.updateHeight()}
          onKeyUp={({
            keyCode,
            which,
          }) => this.handleKeyUp(keyCode || which)}
          onChange={({
            target: { value: v },
          }) => this.updateValueHandler(v)}
          onFocus={() => this.setState({ isFocus: true })}
          onBlur={() => this.setState({
            isFocus: false,
            menuShown: false,
          })}
          value={value}
          style={mixer([
            styles.input,
            isFocus && styles.inputFocus,
          ])}
          placeholder="Paragraph" />
        <div
          ref={this.preview}
          style={{
            ...styles.input,
            ...styles.preview,
          }}>
          {value}
        </div>
        <div
          ref={this.menu}
          style={{
            ...styles.menu,
            ...(menuShown ? styles.menuShown : {}),
            left: menuX,
            top: menuY,
          }}>
          <button type="button" style={styles.menuButton}>Highlight</button>
          <span style={styles.triangle} />
        </div>
      </Fragment>
    );
  }
}

export default inputResolver(ParagraphInput);
