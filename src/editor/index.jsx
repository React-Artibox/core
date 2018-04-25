// @flow

import React, { PureComponent } from 'react';
import {
  EditorContext,
  ConfigContext,
} from '../context';
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
    padding: '52px 16px 72px 16px',
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

type Props = {
  editor: ArtiboxEditor,
  blocks: Array<ArtiboxEditorBlock>,
  meta: ArtiboxEditorMeta,
};

class ArtiboxEditorView extends PureComponent<Props> {
  render() {
    const {
      editor,
      blocks,
      meta,
    } = this.props;

    return (
      <EditorContext.Provider
        value={{
          updateValue: (...args) => editor.updateValue(...args),
          selectValue: (...args) => editor.selectValue(...args),
          createBlock: (...args) => editor.createBlock(...args),
          removeBlock: (...args) => editor.removeBlock(...args),
          blocks,
          meta,
        }}>
        <div style={styles.wrapper}>
          <header style={styles.header}>
            <IconSave scale={0.8} onClick={editor.handleSubmit()} />
          </header>
          {editor.blocks.map((block) => {
            switch (block.type) {
              case TYPE_TITLE:
                return <EditorTitle block={block} key={block.id} />;

              case TYPE_PARAGRAPH:
                return <EditorParagraph block={block} key={block.id} />;

              case TYPE_IMAGE:
                return <EditorImage block={block} key={block.id} />;

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
      }) => {
        const editor = editors[name];

        if (!editor) {
          createNewEditor({
            onSubmit,
            name,
          });

          return null;
        }

        return (
          <ArtiboxEditorView
            blocks={editor.blocks}
            meta={editor.meta}
            editor={editor} />
        );
    }}
    </ConfigContext.Consumer>
  );
}

export default ArtiboxEditorWrapper;
