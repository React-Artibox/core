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
};

class EditorImage extends Editor {
  static type = TYPE_IMAGE

  static getInitialValues(blockID) {
    return {
      ...super.getInitialValues(blockID),
      type: EditorImage.type,
      value: '',
      input: React.createRef(),
      descriptions: [],
    };
  }

  render() {
    const {
      block,
      editorName,
      createBlock,
      removeBlock,
      updateValue,
      updateDescriptions,
    } = this.props;

    return (
      <div style={styles.wrapper}>
        <ImageInput
          input={block.input}
          value={block.value}
          id={block.id}
          descriptions={block.descriptions}
          updateDescriptions={updateDescriptions}
          editorName={editorName}
          createBlock={createBlock}
          removeBlock={removeBlock}
          updateValue={updateValue} />
      </div>
    );
  }
}

export default EditorImage;
