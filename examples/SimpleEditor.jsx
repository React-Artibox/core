// @flow
/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react';
import { hot } from 'react-hot-loader';
import '@artibox/theme-dark';
import { Color } from '@artibox/colors';
import {
  Base64ImageHandler,
  createConfigProvider,
  Editor,
  Minimap,
} from '../src/index';

Color.setTheme('dark');

const ArtiboxProvider = createConfigProvider({
  minimap: true,
  handlers: {
    image: new Base64ImageHandler(),
  },
});

const styles = {
  wrapper: {
    width: '100%',
    margin: '0 auto',
    padding: '32px 0',
    maxWidth: 720,
    height: '80vh',
  },
  minimap: {
    width: 150,
    position: 'fixed',
    right: 12,
    top: 12,
    borderRadius: 2,
    boxShadow: '-1px 4px 12px rgba(0, 0, 0, 0.08)',
  },
};

function SimpleEditor() {
  return (
    <ArtiboxProvider>
      <div style={styles.wrapper}>
        <Editor
          name="TestEditors"
          onChange={data => console.log('Changed:', data)}
          onSubmit={data => console.log('Submitted:', data)} />
        <div style={styles.minimap}>
          <Minimap name="TestEditors" />
        </div>
      </div>
    </ArtiboxProvider>
  );
}

export default hot(module)(SimpleEditor);
