// @flow

import React from 'react';
import IconPhoto from '../icons/IconPhoto';
import IconParagraph from '../icons/IconParagraph';
import IconTitle from '../icons/IconTitle';
import BlockGeneratorButton from './BlockGeneratorButton';
import {
  TYPE_IMAGE,
  TYPE_TITLE,
  TYPE_PARAGRAPH,
} from '../type';

const styles: {} = {
  wrapper: {
    width: '100%',
    height: 48,
    borderRadius: 2,
    backgroundColor: '#f2f2f2',
    padding: '0 6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
};

function ArtiboxEditorBlockGenerator({
  createBlock,
  getActiveBlock,
  editorName,
}: {
  createBlock: Function,
  getActiveBlock: Function,
  editorName: string,
}) {
  return (
    <div
      role="presentation"
      style={styles.wrapper}>
      <BlockGeneratorButton
        createBlock={createBlock}
        getActiveBlock={getActiveBlock}
        editorName={editorName}
        type={TYPE_TITLE}>
        <IconTitle />
      </BlockGeneratorButton>
      <BlockGeneratorButton
        createBlock={createBlock}
        getActiveBlock={getActiveBlock}
        editorName={editorName}
        type={TYPE_PARAGRAPH}>
        <IconParagraph />
      </BlockGeneratorButton>
      <BlockGeneratorButton
        createBlock={createBlock}
        getActiveBlock={getActiveBlock}
        editorName={editorName}
        type={TYPE_IMAGE}>
        <IconPhoto />
      </BlockGeneratorButton>
    </div>
  );
}

export default ArtiboxEditorBlockGenerator;
