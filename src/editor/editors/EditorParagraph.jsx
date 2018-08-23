// @flow

import React from 'react';
import Editor from './Editor';
import { mixer } from '../../helper/style';
import { TYPE_PARAGRAPH } from '../../type';
import ParagraphInput from './inputs/ParagraphInput';

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

class EditorParagraph extends Editor {
  static type = TYPE_PARAGRAPH

  static getInitialValues(blockID) {
    return {
      ...super.getInitialValues(blockID),
      type: EditorParagraph.type,
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
      <div
        style={mixer([
          styles.wrapper,
        ])}>
        <ParagraphInput
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

export default EditorParagraph;
