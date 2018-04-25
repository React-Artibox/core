// @flow
/* eslint react/jsx-filename-extension: 0 */

import React, { PureComponent } from 'react';
import debug from 'debug';
import { ConfigContext } from '../../context';
import EditorTitle from '../editors/EditorTitle';
import EditorParagraph from '../editors/EditorParagraph';
import EditorImage from '../editors/EditorImage';
import MinimapTitle from './MinimapTitle';
import MinimapParagraph from './MinimapParagraph';
import MinimapImage from './MinimapImage';

const debugMinimap = debug('Artibox:Minimap');

const styles = {
  wrapper: {
    width: 150,
    maxHeight: '100vh',
    backgroundColor: '#fcfcfc',
    border: '1px solid #e2e2e2',
    height: '100%',
    padding: '6px 4px',
    borderRadius: 2,
  },
};

type Props = {
  blocks: Array<ArtiboxEditorBlock>,
};

class MinimapView extends PureComponent<Props> {
  render() {
    const {
      blocks,
    } = this.props;

    return (
      <div style={styles.wrapper}>
        {blocks.filter(b => b.value).map((block) => {
          switch (block.type) {
            case EditorTitle.type:
              return <MinimapTitle key={block.id} value={block.value} />;

            case EditorParagraph.type:
              return <MinimapParagraph key={block.id} value={block.value} />;

            case EditorImage.type:
              return <MinimapImage key={block.id} value={block.value} />;

            default:
              return null;
          }
        })}
      </div>
    );
  }
}

function Minimap({
  name,
}: {
  name: string,
}) {
  if (!name) {
    console.error('Please give editor name for minimap');

    return null;
  }

  return (
    <ConfigContext.Consumer>
      {({
        editors,
      }) => {
        const editor = editors[name];

        if (!editor) {
          debugMinimap('Cannot found target editor');

          return null;
        }

        return (
          <MinimapView blocks={editor.blocks} meta={editor.meta} />
        );
      }}
    </ConfigContext.Consumer>
  );
}

export default Minimap;
