// @flow

import React from 'react';
import type { EditorType } from '../type';
import { EditorContext } from '../context';

type Props = {
  type: EditorType,
  children: Node,
};

const styles = {
  createBtn: {
    margin: '0 3px',
    padding: 0,
    outline: 'none',
    height: 32,
  },
};

function BlockGeneratorButton({
  type,
  children,
}: Props) {
  return (
    <EditorContext.Consumer>
      {({ createBlock }) => (
        <button
          onClick={() => createBlock(type)}
          style={styles.createBtn}
          type="button">
          {children}
        </button>
      )}
    </EditorContext.Consumer>
  );
}

export default BlockGeneratorButton;
