// @flow

import React, { Fragment } from 'react';
import Editor from './Editor';
import { mixer } from '../../helper/style';
import { TYPE_PARAGRAPH } from '../../type';
import IconTrash from '../../icons/IconTrash';
import { EditorContext } from '../../context';

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
    padding: '0 0.5em',
    minHeight: '1.618em',
    border: 0,
    overflow: 'hidden',
  },
  wrapperLast: {
    padding: '0 0 12px 0',
  },
};

function updateValueHandler({
  id,
  createBlock,
  updateValue,
}) {
  return (e) => {
    const val = e.target.value;

    if (val.match(/\n/)) {
      createBlock(TYPE_PARAGRAPH);

      return;
    }

    updateValue(id)(e);
  };
}

type Props = {
  isLastBlock: boolean,
};

class EditorParagraph extends Editor<Props> {
  static type = TYPE_PARAGRAPH
  static getInitialValues(blockID) {
    return {
      ...super.getInitialValues(blockID),
      type: EditorParagraph.type,
      value: '',
    };
  }

  constructor(props) {
    super(props);

    this.textarea = React.createRef();
  }

  componentDidMount() {
    this.updateHeight();

    this.textarea.current.focus();
  }

  updateHeight() {
    const ta = this.textarea.current;
    const originHeight = parseInt(ta.style.height, 10);

    ta.style.transition = 'none';
    ta.style.height = '1px';

    const targetHeight = `${ta.scrollHeight}px`;

    ta.style.height = `${originHeight}px`;
    ta.style.transition = 'height 0.04s ease-out';
    ta.style.height = targetHeight;
  }

  render() {
    const {
      block,
      isLastBlock,
    } = this.props;

    return (
      <div
        style={mixer([
          styles.wrapper,
          isLastBlock && styles.wrapperLast,
        ])}>
        <EditorContext.Consumer>
          {({
            createBlock,
            updateValue,
            selectValue,
            removeBlock,
          }) => (
            <Fragment>
              <textarea
                ref={this.textarea}
                onKeyUp={() => this.updateHeight()}
                onChange={updateValueHandler({
                  id: block.id,
                  createBlock,
                  updateValue,
                })}
                value={selectValue(block.id)}
                style={styles.input}
                placeholder="Paragraph" />
              {/* <button
                onClick={() => removeBlock(block.id)}
                type="button">
                <IconTrash scale={0.5} />
              </button> */}
            </Fragment>
          )}
        </EditorContext.Consumer>
      </div>
    );
  }
}

export default EditorParagraph;
