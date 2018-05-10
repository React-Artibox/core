// @flow

import React, { ComponentType } from 'react';

type Props = {
  removeBlock: Function,
  updateValue: Function,
  createBlock: Function,
  id: number,
  input: {
    current: ?Node,
  },
  value: ?string,
  editorName: string,
};

export function inputResolver(Input: ComponentType) {
  return function InputResolver(props: Props) {
    const {
      updateValue,
      removeBlock,
      createBlock,
      id,
      input,
      value,
      editorName,
    } = props;

    return (
      <Input
        id={id}
        input={input}
        value={value}
        onChange={e => updateValue(editorName, id, e)}
        remove={() => removeBlock(editorName, id)}
        insertBlock={type => createBlock(editorName, type, id)} />
    );
  };
}

export default {
  inputResolver,
};
