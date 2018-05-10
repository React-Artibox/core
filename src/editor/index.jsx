// @flow

import React from 'react';
import { ConfigContext } from '../context';
import {
  TYPE_TITLE,
  TYPE_IMAGE,
  TYPE_PARAGRAPH,
} from '../type';
import IconSave from '../icons/IconSave';
import EditorTitle from './editors/EditorTitle';
import EditorParagraph from './editors/EditorParagraph';
import EditorImage from './editors/EditorImage';
import ArtiboxEditorBlockGenerator from './ArtiboxEditorBlockGenerator';

const styles = {
  wrapper: {
    width: '100%',
    backgroundColor: '#fafafa',
    border: '1px solid #e2e2e2',
    padding: '112px 16px 12px 16px',
    borderRadius: 2,
    position: 'relative',
  },
  header: {
    width: 'calc(100% - 32px)',
    height: 88,
    position: 'absolute',
    top: 12,
    left: 16,
  },
  topActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '4px 0',
  },
};

function ArtiboxEditorWrapper({
  name,
  onSubmit,
}: {
  name: string,
  onSubmit: Function,
}) {
  if (!name || !onSubmit) {
    console.error('Please set name and onSubmit to initialize new Artibox Editor');

    return null;
  }

  return (
    <ConfigContext.Consumer>
      {({
        editors,
        createNewEditor,
        createBlock,
        updateValue,
        selectValue,
        removeBlock,
        handleSubmit,
        getActiveBlock,
      }) => {
        const editor = editors[name];

        if (!editor) {
          createNewEditor({
            name,
            onSubmit,
          });

          return null;
        }

        return (
          <div style={styles.wrapper}>
            <header style={styles.header}>
              <div style={styles.topActions}>
                <IconSave scale={0.8} onClick={handleSubmit(editor)} />
              </div>
              <ArtiboxEditorBlockGenerator
                createBlock={createBlock}
                getActiveBlock={getActiveBlock}
                editorName={name} />
            </header>
            {editor.blocks.map((block) => {
              switch (block.type) {
                case TYPE_TITLE:
                  return (
                    <EditorTitle
                      editorName={name}
                      createBlock={createBlock}
                      selectValue={selectValue}
                      updateValue={updateValue}
                      removeBlock={removeBlock}
                      handleSubmit={handleSubmit}
                      block={block}
                      key={block.id} />
                  );

                case TYPE_PARAGRAPH:
                  return (
                    <EditorParagraph
                      editorName={name}
                      createBlock={createBlock}
                      selectValue={selectValue}
                      updateValue={updateValue}
                      removeBlock={removeBlock}
                      handleSubmit={handleSubmit}
                      block={block}
                      key={block.id} />
                  );

                case TYPE_IMAGE:
                  return (
                    <EditorImage
                      editorName={name}
                      createBlock={createBlock}
                      selectValue={selectValue}
                      updateValue={updateValue}
                      removeBlock={removeBlock}
                      handleSubmit={handleSubmit}
                      block={block}
                      key={block.id} />
                  );

                default:
                  return null;
              }
            })}
          </div>
        );
    }}
    </ConfigContext.Consumer>
  );
}

export default ArtiboxEditorWrapper;
