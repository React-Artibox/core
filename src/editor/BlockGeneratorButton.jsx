// @flow

import React, { PureComponent } from 'react';
import type { EditorType } from '../type';
import { EditorContext } from '../context';

type Props = {
  type: EditorType,
  children: Node,
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
    } = this.props;

    const {
      focusedBlock,
    } = this.state;

    return (
      <EditorContext.Consumer>
        {({
          createBlock,
          blocks,
        }) => (
          <button
            onMouseEnter={() => {
              const activedBlock = blocks.find(b =>
                b.input.current === document.activeElement);

              if (activedBlock !== focusedBlock) {
                this.setState({
                  focusedBlock: activedBlock,
                });
              }
            }}
            onClick={() => createBlock(
              type,
              focusedBlock ? focusedBlock.id : null,
            )}
            style={styles.createBtn}
            type="button">
            {children}
          </button>
        )}
      </EditorContext.Consumer>
    );
  }
}

export default BlockGeneratorButton;
