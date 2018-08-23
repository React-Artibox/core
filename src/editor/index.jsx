// @flow

import React, { PureComponent } from 'react';
import Colors from '@artibox/colors';
import {
  ConfigContext,
  MetadataContext,
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
import ArticleTitleEditor from './metadata/ArticleTitleEditor';

type Props = {
  name: string,
  noTitle?: boolean,
  onSubmit: Function,
};

class ArtiboxEditorWrapper extends PureComponent<Props> {
  static defaultProps = {
    noTitle: false,
  };

  styles = {
    wrapper: {
      width: '100%',
      backgroundColor: Colors.EDITOR_BACKGROUND,
      border: `1px solid ${Colors.EDITOR_BORDER}`,
      padding: '12px 16px',
      borderRadius: 2,
      position: 'relative',
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    header: {
      width: '100%',
    },
    topActions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '4px 0',
    },
    mainContainer: {
      width: '100%',
      display: 'block',
      overflow: 'auto',
      flexGrow: 1,
    },
  }

  render() {
    const {
      name,
      noTitle,
      onSubmit,
    } = this.props;

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
          updateDescriptions,
          selectValue,
          removeBlock,
          handleSubmit,
          getActiveBlock,
          updateMetadata,
        }) => {
          const editor = editors[name];

          if (!editor) {
            setTimeout(() => {
              createNewEditor({
                name,
                onSubmit,
              });
            }, 0);

            return null;
          }

          return (
            <div style={this.styles.wrapper}>
              <header style={this.styles.header}>
                <div style={this.styles.topActions}>
                  <IconSave scale={0.8} onClick={handleSubmit(editor)} />
                </div>
                {noTitle ? null : (
                  <MetadataContext.Provider
                    value={{
                      name,
                      metadata: editor.metadata,
                      update: updateMetadata,
                    }}>
                    <ArticleTitleEditor />
                  </MetadataContext.Provider>
                )}
                <ArtiboxEditorBlockGenerator
                  createBlock={createBlock}
                  getActiveBlock={getActiveBlock}
                  editorName={name} />
              </header>
              <main style={this.styles.mainContainer}>
                {editor.blocks.map((block) => {
                  switch (block.type) {
                    case TYPE_TITLE:
                      return (
                        <EditorTitle
                          editorName={name}
                          updateDescriptions={updateDescriptions}
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
                          updateDescriptions={updateDescriptions}
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
                          updateDescriptions={updateDescriptions}
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
              </main>
            </div>
          );
        }
      }
      </ConfigContext.Consumer>
    );
  }
}

export default ArtiboxEditorWrapper;
