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
    position: 'absolute',
    left: 16,
    bottom: 12,
    width: 'calc(100% - 32px)',
    height: 48,
    borderRadius: 2,
    backgroundColor: '#f2f2f2',
    padding: '0 6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
};

function ArtiboxEditorBlockGenerator() {
  return (
    <div
      role="presentation"
      style={styles.wrapper}>
      <BlockGeneratorButton type={TYPE_TITLE}>
        <IconTitle />
      </BlockGeneratorButton>
      <BlockGeneratorButton type={TYPE_PARAGRAPH}>
        <IconParagraph />
      </BlockGeneratorButton>
      <BlockGeneratorButton type={TYPE_IMAGE}>
        <IconPhoto />
      </BlockGeneratorButton>
    </div>
  );
}

export default ArtiboxEditorBlockGenerator;
