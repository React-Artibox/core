// @flow

import React, { ComponentType } from 'react';

type Props = {
  removeBlock: Function,
  selectValue: Function,
  updateValue: Function,
  block: {
    id: number,
    input: {
      current: ?Node,
    },
  },
};

export function inputResolver(Input: ComponentType) {
  return function InputResolver(props: Props) {
    const {
      selectValue,
      updateValue,
      removeBlock,
      block: {
        id,
        input,
      },
    } = props;

    return (
      <Input
        input={input}
        value={selectValue(id)}
        onChange={updateValue(id)}
        remove={removeBlock(id)}
        meta={props} />
    );
  };
}

export default {
  inputResolver,
};
