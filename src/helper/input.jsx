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
  updateDescriptions: Function,
  descriptions: Array<{
    type: 'DESC_HIGHLIGHT' | 'DESC_LINK',
    from: number,
    to: number,
  }>,
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
      descriptions,
      editorName,
      updateDescriptions,
    } = props;

    return (
      <Input
        id={id}
        input={input}
        value={value}
        descriptions={descriptions}
        updateDescriptions={newDescriptions => updateDescriptions(editorName, id, newDescriptions)}
        onChange={e => updateValue(editorName, id, e)}
        remove={() => removeBlock(editorName, id)}
        insertBlock={type => createBlock(editorName, type, id)} />
    );
  };
}

export default {
  inputResolver,
};
