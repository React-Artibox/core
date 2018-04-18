// @flow

import React from 'react';
import Editor from './Editor';
import { TYPE_TITLE } from '../../type';
import { EditorContext } from '../../context';
import TitleInput from './inputs/TitleInput';

const styles = {
  wrapper: {
    width: '100%',
    position: 'relative',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
};

class EditorTitle extends Editor {
  static type = TYPE_TITLE
  static getInitialValues(blockID) {
    return {
      ...super.getInitialValues(blockID),
      type: EditorTitle.type,
      value: '',
      input: React.createRef(),
    };
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <EditorContext.Consumer>
          {props => <TitleInput {...props} {...this.props} />}
        </EditorContext.Consumer>
      </div>
    );
  }
}

export default EditorTitle;
