// @flow

import { PureComponent } from 'react';

type Props = {
  input: {
    current: ?Node,
  },
};

export default class RangeHandler extends PureComponent<Props> {
  getSelectedRangeOnPreview() {
    const {
      input: {
        current: input,
      },
    } = this.props;

    let node = null;
    let foundStart = false;
    let cursor = 0;
    const range = document.createRange();
    range.setStart(this.preview.current, 0);
    range.collapse(true);
    const nodeStack = [this.preview.current];

    while (true) {
      node = nodeStack.pop();

      if (!node) break;

      switch (node.nodeType) {
        case Node.TEXT_NODE: {
          const nextCursor = cursor + node.length;

          if (!foundStart && input.selectionStart >= cursor && input.selectionStart <= nextCursor) {
            // Start cursor in this node
            range.setStart(node, input.selectionStart - cursor);

            foundStart = true;
          }

          if (foundStart && input.selectionEnd >= cursor && input.selectionEnd <= nextCursor) {
            // End cursor in this node
            range.setEnd(node, input.selectionEnd - cursor);
          }

          cursor = nextCursor;
          break;
        }

        case Node.ELEMENT_NODE:
          Array.from(node.childNodes)
            .reverse()
            .forEach((childNode) => { nodeStack.push(childNode); });
          break;

        default:
          break;
      }
    }

    return range;
  }
}
