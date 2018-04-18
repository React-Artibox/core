// @flow

import React from 'react';
import Editor from './Editor';
import { TYPE_TITLE } from '../../type';
import { EditorContext } from '../../context';
import TextInput from './inputs/TitleInput';

const styles = {
  wrapper: {
    width: '100%',
    position: 'relative',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    margin: '0 12px 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: '1.2em',
    padding: '2px 10px',
    letterSpacing: 1,
    lineHeight: 1.618,
    border: '1px solid #f2f2f2',
    borderRadius: 2,
    outline: 'none',
    flexGrow: 1,
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
          {props => <TextInput {...props} {...this.props} />}
        </EditorContext.Consumer>
      </div>
    );
  }
}

export default EditorTitle;
