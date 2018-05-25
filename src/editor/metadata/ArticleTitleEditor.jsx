// @flow

import React, { PureComponent } from 'react';
import { metadataResolver } from '../../helper/metadata';

const styles = {
  wrapper: {
    padding: '8px 0',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '',
    fontSize: 22,
    lineHeight: '46px',
    padding: '0 10px',
  },
};

type Props = {
  onChange: Function,
  value: string,
};

class ArticleTitleEditor extends PureComponent<Props> {
  render() {
    const {
      onChange,
      value,
    } = this.props;

    return (
      <div style={styles.wrapper}>
        <input
          onChange={onChange}
          value={value}
          style={styles.input}
          placeholder="Article Title"
          type="text" />
      </div>
    );
  }
}

export default metadataResolver('title')(ArticleTitleEditor);
