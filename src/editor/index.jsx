// @flow

import React, { PureComponent } from 'react';
import { EditorContext } from '../context';
import ArtiboxEditorBlockGenerator from './ArtiboxEditorBlockGenerator';

type Props = {};
type State = {
  blocks: Array<*>,
  meta: {
    title: ?string,
  },
};

const styles = {
  wrapper: {
    width: '100%',
    backgroundColor: '#fafafa',
    border: '1px solid #e2e2e2',
    padding: '12px 16px',
    borderRadius: 2,
  },
};

class ArtiboxEditor extends PureComponent<Props, State> {
  state = {
    blocks: [],
    meta: {
      title: '',
    },
  }

  createBlock(type) {
    console.log('-->', type);
  }

  render() {
    const {
      blocks,
      meta,
    } = this.state;

    return (
      <EditorContext.Provider
        value={{
          createBlock: type => this.createBlock(type),
          blocks,
          meta,
        }}>
        <div style={styles.wrapper}>
          <ArtiboxEditorBlockGenerator />
        </div>
      </EditorContext.Provider>
    );
  }
}

export default ArtiboxEditor;
