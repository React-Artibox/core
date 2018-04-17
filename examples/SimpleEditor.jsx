// @flow

import React, { Component } from 'react';
import {
  Base64ImageHandler,
  createConfigProvider,
  Editor,
} from '../src/index';

const ArtiboxProvider = createConfigProvider({
  imageHandler: new Base64ImageHandler(),
});

const styles = {
  wrapper: {
    width: '100%',
    margin: '32px auto',
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
          <Editor onSubmit={data => this.onSubmitData(data)} />
        </div>
      </ArtiboxProvider>
    );
  }
}

export default SimpleEditor;
