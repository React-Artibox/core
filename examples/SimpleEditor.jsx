// @flow
/* eslint import/no-extraneous-dependencies: 0 */

import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {
  Base64ImageHandler,
  createConfigProvider,
  Editor,
} from '../src/index';

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
  },
};

class SimpleEditor extends Component {
  onSubmitData(data) {
    console.log(data);
  }

  render() {
    return (
      <ArtiboxProvider>
        <div style={styles.wrapper}>
          <Editor
            name="TestEditors"
            onSubmit={data => this.onSubmitData(data)} />
          <Editor
            name="TestEditors222"
            onSubmit={data => this.onSubmitData(data)} />
        </div>
      </ArtiboxProvider>
    );
  }
}

export default hot(module)(SimpleEditor);
