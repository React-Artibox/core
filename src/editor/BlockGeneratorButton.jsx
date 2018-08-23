// @flow

import React, { PureComponent } from 'react';
import type { EditorType } from '../type';

type Props = {
  type: EditorType,
  children: Node,
  createBlock: Function,
  getActiveBlock: Function,
  editorName: string,
};

type State = {
  focusedBlock: ?{
    id: number,
  },
};

const styles = {
  createBtn: {
    margin: '0 3px',
    padding: 0,
    outline: 'none',
    height: 32,
    border: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
};

class BlockGeneratorButton extends PureComponent<Props, State> {
  state = {
    focusedBlock: null,
  }

  render() {
    const {
      type,
      children,
      createBlock,
      getActiveBlock,
      editorName,
    } = this.props;

    const {
      focusedBlock,
    } = this.state;

    return (
      <button
        onMouseEnter={() => {
          const activedBlock = getActiveBlock(editorName);

          if (activedBlock && activedBlock !== focusedBlock) {
            this.setState({
              focusedBlock: activedBlock,
            });
          }
        }}
        onClick={() => createBlock(
          editorName,
          type,
          focusedBlock ? focusedBlock.id : null,
        )}
        style={styles.createBtn}
        type="button">
        {children}
      </button>
    );
  }
}

export default BlockGeneratorButton;
