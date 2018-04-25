// @flow

import debug from 'debug';
import {
  TYPE_TITLE,
  TYPE_IMAGE,
  TYPE_PARAGRAPH,
} from '../type';
import EditorTitle from './editors/EditorTitle';
import EditorParagraph from './editors/EditorParagraph';
import EditorImage from './editors/EditorImage';

const debugEditor = debug('Artibox:Editor');

export default class ArtiboxEditor {
  constructor({
    onSubmit,
    name,
    onUpdate,
  }: {
    onSubmit: Function,
    name: ?string,
    onUpdate: Function,
  }) {
    this.name = name;
    this.blockIDCursor = -1;
    this.storedBlocks = [];
    this.meta = {
      title: '',
    };
    this.onSubmit = onSubmit;
    this.onUpdate = onUpdate;
  }

  get blocks() {
    return this.storedBlocks;
  }

  set blocks(block) {
    this.storedBlocks = block;

    this.onUpdate(this);
  }

  getEditorInitialValues(type) {
    switch (type) {
      case TYPE_TITLE:
        return EditorTitle.getInitialValues(this.blockIDCursor);

      case TYPE_PARAGRAPH:
        return EditorParagraph.getInitialValues(this.blockIDCursor);

      case TYPE_IMAGE:
        return EditorImage.getInitialValues(this.blockIDCursor);

      default:
        return null;
    }
  }

  createBlock(type, afterId) {
    const {
      blocks,
    } = this;

    const blockInitialValues = this.getEditorInitialValues(type);

    if (!blockInitialValues) return;

    if (afterId) {
      const index = blocks.findIndex(b => b.id === afterId);

      if (~index) {
        this.blockIDCursor -= 1;
        this.blocks = [
          ...blocks.slice(0, index + 1),
          blockInitialValues,
          ...blocks.slice(index + 1),
        ];

        return;
      }
    }

    this.blockIDCursor -= 1;
    this.blocks = [
      ...blocks,
      blockInitialValues,
    ];
  }

  removeBlock(id) {
    return () => {
      const {
        blocks,
      } = this;

      const blockIndex = blocks.findIndex(b => b.id === id);

      if (!~blockIndex) {
        debugEditor(`Cannot found target block: ${id}`);

        return;
      }

      const prevBlock = blocks[blockIndex - 1];

      this.blocks = [
        ...blocks.slice(0, blockIndex),
        ...blocks.slice(blockIndex + 1),
      ];

      if (prevBlock && prevBlock.input.current) {
        prevBlock.input.current.focus();
      }
    };
  }

  selectValue(id) {
    const {
      blocks,
    } = this;

    const block = blocks.find(b => b.id === id);

    if (!block) {
      debugEditor(`Cannot found target block: ${id}`);

      return '';
    }

    return block.value;
  }

  updateValue(id) {
    const {
      blocks,
    } = this;

    return (e) => {
      const value = e.constructor.name === 'SyntheticEvent' ? e.target.value : e;
      const blockIndex = blocks.findIndex(b => b.id === id);

      if (!~blockIndex) {
        debugEditor(`Cannot found target block: ${id}`);

        return;
      }

      this.blocks = [
        ...blocks.slice(0, blockIndex),
        {
          ...blocks[blockIndex],
          value,
        },
        ...blocks.slice(blockIndex + 1),
      ];
    };
  }

  handleSubmit() {
    const {
      blocks,
      meta,
      onSubmit,
    } = this;

    if (!onSubmit) {
      debugEditor('Please define onSubmit function on editor');
    }

    return () => {
      onSubmit({
        blocks: blocks.map(b => ({
          id: b.id,
          type: b.type,
          value: b.value,
        })),
        ...meta,
      });
    };
  }
}
