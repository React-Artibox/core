// @flow

import React, { PureComponent } from 'react';
import Colors from '@artibox/colors';
import { metadataResolver } from '../../helper/metadata';

type Props = {
  onChange: Function,
  value: string,
};

class ArticleTitleEditor extends PureComponent<Props> {
  styles = {
    wrapper: {
      padding: '8px 0',
      width: '100%',
    },
    input: {
      width: '100%',
      height: 48,
      borderRadius: 2,
      backgroundColor: Colors.INPUT_BACKGROUND,
      border: `1px solid ${Colors.INPUT_BORDER}`,
      fontSize: 22,
      lineHeight: '46px',
      padding: '0 10px',
    },
  };

  render() {
    const {
      onChange,
      value,
    } = this.props;

    return (
      <div style={this.styles.wrapper}>
        <input
          onChange={onChange}
          value={value}
          style={this.styles.input}
          placeholder="Article Title"
          type="text" />
      </div>
    );
  }
}

export default metadataResolver('title')(ArticleTitleEditor);
