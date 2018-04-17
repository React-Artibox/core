// @flow

import React, { Fragment } from 'react';
import Editor from './Editor';
import { TYPE_TITLE } from '../../type';
import IconTitle from '../../icons/IconTitle';
import IconTrash from '../../icons/IconTrash';
import { EditorContext } from '../../context';

const styles = {
  wrapper: {
    width: '100%',
    position: 'relative',
    padding: '12px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    margin: '0 12px 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
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

class EditorTitle extends Editor {
  static type = TYPE_TITLE
  static getInitialValues(blockID) {
    return {
      ...super.getInitialValues(blockID),
      type: EditorTitle.type,
      value: '',
    };
  }

  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  componentDidMount() {
    this.input.current.focus();
  }

  render() {
    const {
      block,
    } = this.props;

    return (
      <div style={styles.wrapper}>
        <div style={styles.icon}>
          <IconTitle scale={0.5} />
        </div>
        <EditorContext.Consumer>
          {({
            updateValue,
            selectValue,
            removeBlock,
          }) => (
            <Fragment>
              <input
                ref={this.input}
                onChange={updateValue(block.id)}
                value={selectValue(block.id)}
                style={styles.input}
                placeholder="Title"
                type="text" />
              <button
                onClick={() => removeBlock(block.id)}
                type="button">
                <IconTrash scale={0.5} />
              </button>
            </Fragment>
          )}
        </EditorContext.Consumer>
      </div>
    );
  }
}

export default EditorTitle;
