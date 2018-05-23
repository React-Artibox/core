// @flow
/* eslint prefer-spread: 0 */

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
    height: 26,
    backgroundColor: '#121212',
    borderRadius: 4,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
    position: 'absolute',
    zIndex: 10,
    padding: 0,
    opacity: 0,
    transform: 'scale(1.01) translate(0, -12px)',
    transition: 'opacity 0.12s ease-out, transform 0.08s ease-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  menuShown: {
    opacity: 1,
    pointerEvents: 'auto',
    transform: 'scale(1) translate(0, 0)',
  },
  menuButton: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: 1,
    padding: '0 8px 0 9px',
    cursor: 'pointer',
    height: '100%',
    lineHeight: '26px',
  },
  triangle: {
    borderTop: '6px solid #121212',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    position: 'absolute',
    left: 'calc(50% - 3px)',
    bottom: -6,
    zIndex: 10,
    pointerEvents: 'none',
  },
  spliter: {
    width: 1,
    height: '100%',
    backgroundColor: '#575757',
    display: 'block',
  },
  highlight: {
    color: 'red',
  },
  link: {
    textDecoration: 'none',
    color: '#08c',
    pointerEvents: 'auto',
  },
  linkModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
    zIndex: 5,
    opacity: 0,
    pointerEvents: 'none',
    transform: 'scale(0.9)',
    transition: 'opacity 0.12s ease-out, transform 0.12s ease-out',
  },
  linkModalShown: {
    opacity: 1,
    pointerEvents: 'auto',
    transform: 'scale(1)',
  },
  linkModalInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    lineHeight: '24px',
    fontSize: 16,
    fontWeight: 400,
    padding: '0 8px',
    width: 600,
    maxWidth: 'calc(100vw - 48px)',
    border: 0,
    borderRadius: 1,
    outline: 'none',
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
  static DESC_HIGHLIGHT = 'DESC/HIGHLIGHT'
  static DESC_LINK = 'DESC/LINK'

  static DESC_HIGHLIGHT_SYMBOL = '*';
  static DESC_LINK_SYMBOL_FROM = 48;

  static wrapDescriptions(value, descriptions) {
    const wrappedStrings = [];

    if (!descriptions.length) return value;

    let workingDescIndex = 0;
    let nodeContent = '';
    let concatingType = null;

    Array.from(value).forEach((char, index) => {
      if (index === descriptions[workingDescIndex].to) {
        // Flush
        switch (concatingType) {
          case ParagraphInput.DESC_HIGHLIGHT:
            wrappedStrings.push((
              <span key={workingDescIndex} style={styles.highlight}>{nodeContent}</span>
            ));

            nodeContent = '';
            break;

          case ParagraphInput.DESC_LINK:
            wrappedStrings.push((
              <a
                href={descriptions[workingDescIndex].url}
                target="_blank"
                key={workingDescIndex}
                style={styles.link}>
                {nodeContent}
              </a>
            ));

            nodeContent = '';
            break;

          default:
            wrappedStrings.push(nodeContent);

            nodeContent = '';
            break;
        }

        if (descriptions[workingDescIndex + 1]) {
          workingDescIndex += 1;
        }
      }

      if (index === descriptions[workingDescIndex].from) {
        // Flush Plain Text
        switch (concatingType) {
          default:
            wrappedStrings.push(nodeContent);

            nodeContent = '';
            break;
        }

        concatingType = descriptions[workingDescIndex].type;
      }

      nodeContent = `${nodeContent}${char}`;
    });

    wrappedStrings.push(nodeContent);

    return (
      <Fragment>
        {wrappedStrings}
      </Fragment>
    );
  }

  state = {
    isFocus: false,
    menuX: null,
    menuY: null,
    menuShown: false,
    linkModalShown: false,
    selectionStart: null,
    selectionEnd: null,
  }

  constructor(props) {
    super(props);

    this.preview = React.createRef();
    this.menu = React.createRef();
    this.linkInput = React.createRef();
  }

  componentDidMount() {
    this.updateHeight();

    this.props.input.current.focus();
  }

  componentDidUpdate(prevProps, { linkModalShown }) {
    if (!linkModalShown && this.state.linkModalShown) {
      setTimeout(() => {
        this.linkInput.current.focus();
      }, 0);
    }
  }

  onLinkInputKeyUp({ which, keyCode }) {
    const {
      selectionStart,
      selectionEnd,
    } = this.state;

    switch (which || keyCode) {
      case 13:
        this.setState({
          linkModalShown: false,
        });

        this.linkSelection(selectionStart, selectionEnd, this.linkInput.current.value);

        this.linkInput.current.value = '';
        break;

      case 27:
        this.setState({
          linkModalShown: false,
          selectionStart: null,
          selectionEnd: null,
        });
        break;

      default:
        break;
    }
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

  highlightSelection() {
    const {
      input: {
        current: textarea,
      },
    } = this.props;

    if (textarea.selectionStart === textarea.selectionEnd) {
      return;
    }

    this.updateDescriptions({
      type: ParagraphInput.DESC_HIGHLIGHT,
      from: textarea.selectionStart,
      to: textarea.selectionEnd,
    });
  }

  linkSelection(selectionStart, selectionEnd, url) {
    this.updateDescriptions({
      type: ParagraphInput.DESC_LINK,
      from: selectionStart,
      to: selectionEnd,
      url,
    });
  }

  updateDescriptions(description) {
    const {
      descriptions,
      updateDescriptions,
      value,
    } = this.props;

    let valueStr = Array.apply(null, { length: value.length }).map(() => '.').join('');
    let linkCursor = ParagraphInput.DESC_LINK_SYMBOL_FROM;
    const linkMap = new Map();

    [
      ...descriptions,
      description,
    ].forEach((desc) => {
      switch (desc.type) {
        case ParagraphInput.DESC_HIGHLIGHT:
          Array.apply(null, { length: desc.to - desc.from }).forEach((n, index) => {
            valueStr = `${valueStr.substring(0, index + desc.from)}${ParagraphInput.DESC_HIGHLIGHT_SYMBOL}${valueStr.substring(index + desc.from + 1)}`;
          });
          break;

        case ParagraphInput.DESC_LINK:
          linkCursor += 1;
          linkMap.set(String.fromCharCode(linkCursor), desc.url);

          Array.apply(null, { length: desc.to - desc.from }).forEach((n, index) => {
            valueStr = `${valueStr.substring(0, index + desc.from)}${String.fromCharCode(linkCursor)}${valueStr.substring(index + desc.from + 1)}`;
          });
          break;

        default:
          break;
      }
    });

    const newDescriptions = [];
    let isFindingEnd = false;
    let workingLinkCursor = null;

    Array.from(valueStr).forEach((str, index) => {
      if (index === 0 || valueStr[index] !== valueStr[index - 1]) {
        if (isFindingEnd) {
          switch (valueStr[index - 1]) {
            case ParagraphInput.DESC_HIGHLIGHT_SYMBOL:
              newDescriptions[newDescriptions.length - 1].to = index;

              isFindingEnd = false;
              break;

            default:
              if (valueStr[index - 1] === workingLinkCursor) {
                newDescriptions[newDescriptions.length - 1].to = index;

                isFindingEnd = false;
                workingLinkCursor = null;
              }
              break;
          }
        }

        switch (str) {
          case ParagraphInput.DESC_HIGHLIGHT_SYMBOL:
            newDescriptions.push({
              type: ParagraphInput.DESC_HIGHLIGHT,
              from: index,
              to: index,
            });

            isFindingEnd = true;
            break;

          default:
            if (linkMap.get(str)) {
              newDescriptions.push({
                type: ParagraphInput.DESC_LINK,
                from: index,
                to: index,
                url: linkMap.get(str),
              });

              workingLinkCursor = str;

              isFindingEnd = true;
            }
            break;
        }
      }
    });

    updateDescriptions(newDescriptions);
  }

  openLinkModal(selectionStart, selectionEnd) {
    this.setState({
      linkModalShown: true,
      selectionStart,
      selectionEnd,
    });
  }

  render() {
    const {
      value,
      input,
      descriptions,
    } = this.props;

    const {
      isFocus,
      menuX,
      menuY,
      menuShown,
      linkModalShown,
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
          {ParagraphInput.wrapDescriptions(value, descriptions)}
        </div>
        <div
          ref={this.menu}
          style={{
            ...styles.menu,
            ...(menuShown ? styles.menuShown : {}),
            left: menuX,
            top: menuY,
          }}>
          <button
            onMouseDown={() => this.highlightSelection()}
            type="button"
            style={styles.menuButton}>
            Highlight
          </button>
          <span style={styles.spliter} />
          <button
            onMouseDown={() => this.openLinkModal(
              input.current.selectionStart,
              input.current.selectionEnd,
            )}
            type="button"
            style={styles.menuButton}>
            Link
          </button>
          <span style={styles.triangle} />
        </div>
        <div
          style={{
            ...styles.linkModal,
            ...(linkModalShown ? styles.linkModalShown : {}),
          }}>
          <input
            ref={this.linkInput}
            onKeyUp={e => this.onLinkInputKeyUp(e)}
            placeholder="Please enter link URL"
            type="type"
            style={styles.linkModalInput} />
        </div>
      </Fragment>
    );
  }
}

export default inputResolver(ParagraphInput);
