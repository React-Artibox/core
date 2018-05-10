// @flow

import React from 'react';
import Editor from './Editor';
import { TYPE_IMAGE } from '../../type';
import ImageInput from './inputs/ImageInput';

const styles = {
  wrapper: {
    width: '100%',
    position: 'relative',
    padding: 0,
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

class EditorImage extends Editor {
  static type = TYPE_IMAGE
  static getInitialValues(blockID) {
    return {
      ...super.getInitialValues(blockID),
      type: EditorImage.type,
      value: '',
      input: React.createRef(),
    };
  }

  render() {
    const {
      block,
      editorName,
      createBlock,
      removeBlock,
      updateValue,
    } = this.props;

    return (
      <div style={styles.wrapper}>
        <ImageInput
          input={block.input}
          value={block.value}
          id={block.id}
          editorName={editorName}
          createBlock={createBlock}
          removeBlock={removeBlock}
          updateValue={updateValue} />
      </div>
    );
  }
}

export default EditorImage;
