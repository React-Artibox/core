// @flow

import React, { PureComponent } from 'react';
import debug from 'debug';
import IconSave from '../icons/IconSave';
import { EditorContext } from '../context';
import ArtiboxEditorBlockGenerator from './ArtiboxEditorBlockGenerator';
import EditorTitle from './editors/EditorTitle';
import EditorParagraph from './editors/EditorParagraph';
import {
  TYPE_TITLE,
  TYPE_IMAGE,
  TYPE_PARAGRAPH,
} from '../type';

type Props = {
  onSubmit: Function,
};
type State = {
  blocks: Array<*>,
  meta: {
    title: ?string,
  },
};

const debugEditor = debug('Artibox:Editor');

debug.enable('Artibox:Editor');

const styles = {
  wrapper: {
    width: '100%',
    backgroundColor: '#fafafa',
    border: '1px solid #e2e2e2',
    padding: '52px 16px 92px 16px',
    borderRadius: 2,
    position: 'relative',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 'calc(100% - 32px)',
    height: 40,
    position: 'absolute',
    top: 12,
    left: 16,
  },
};

class ArtiboxEditor extends PureComponent<Props, State> {
  state = {
    blockID: -1,
    blocks: [],
    meta: {
      title: '',
    },
  }

  getEditorInitialValues(type) {
    const {
      blockID,
    } = this.state;

    switch (type) {
      case TYPE_TITLE:
        return EditorTitle.getInitialValues(blockID);

      case TYPE_PARAGRAPH:
        return EditorParagraph.getInitialValues(blockID);

      default:
        return null;
    }
  }

  createBlock(type) {
    const {
      blockID,
      blocks,
    } = this.state;

    const blockInitialValues = this.getEditorInitialValues(type);

    if (!blockInitialValues) return;

    this.setState({
      blocks: [
        ...blocks,
        blockInitialValues,
      ],
      blockID: blockID - 1,
    });
  }

  removeBlock(id) {
    const {
      blocks,
    } = this.state;

    const blockIndex = blocks.findIndex(b => b.id === id);

    if (!~blockIndex) {
      debugEditor(`Cannot found target block: ${id}`);

      return;
    }

    this.setState({
      blocks: [
        ...blocks.slice(0, blockIndex),
        ...blocks.slice(blockIndex + 1),
      ],
    });
  }

  selectValue(id) {
    const {
      blocks,
    } = this.state;

    const block = blocks.find(b => b.id === id);

    if (!block) {
      debugEditor(`Cannot found target block: ${id}`);

      return '';
    }

    return block.value;
  }

  updateValue(id) {
    const {
      blocks,
    } = this.state;

    return (e) => {
      const blockIndex = blocks.findIndex(b => b.id === id);

      if (!~blockIndex) {
        debugEditor(`Cannot found target block: ${id}`);

        return;
      }

      this.setState({
        blocks: [
          ...blocks.slice(0, blockIndex),
          {
            ...blocks[blockIndex],
            value: e.target.value,
          },
          ...blocks.slice(blockIndex + 1),
        ],
      });
    };
  }

  handleSubmit() {
    const {
      onSubmit,
    } = this.props;

    const {
      blocks,
      meta,
    } = this.state;

    if (!onSubmit) {
      debugEditor('Please define onSubmit function on editor');
    }

    return () => {
      onSubmit({
        blocks: [...blocks],
        ...meta,
      });
    };
  }

  render() {
    const {
      blocks,
      meta,
    } = this.state;

    return (
      <EditorContext.Provider
        value={{
          updateValue: id => this.updateValue(id),
          selectValue: id => this.selectValue(id),
          createBlock: type => this.createBlock(type),
          removeBlock: id => this.removeBlock(id),
          blocks,
          meta,
        }}>
        <div style={styles.wrapper}>
          <header style={styles.header}>
            <IconSave scale={0.8} onClick={this.handleSubmit()} />
          </header>
          {blocks.map((block, index) => {
            switch (block.type) {
              case TYPE_TITLE:
                return <EditorTitle block={block} key={block.id} />;

              case TYPE_PARAGRAPH:
                return (
                  <EditorParagraph
                    isLastBlock={index === (blocks.length - 1)}
                    block={block}
                    key={block.id} />
                );

              default:
                return null;
            }
          })}
          <ArtiboxEditorBlockGenerator />
        </div>
      </EditorContext.Provider>
    );
  }
}

export default ArtiboxEditor;
