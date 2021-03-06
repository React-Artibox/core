// @flow

import React, {
  PureComponent,
  Node,
} from 'react';
import debug from 'debug';
import {
  TYPE_TITLE,
  TYPE_IMAGE,
  TYPE_PARAGRAPH,
} from './type';
import EditorTitle from './editor/editors/EditorTitle';
import EditorParagraph from './editor/editors/EditorParagraph';
import EditorImage from './editor/editors/EditorImage';
import { ConfigContext } from './context';
import Base64ImageHandler from './handlers/Base64ImageHandler';

type Props = {
  children?: Node,
  minimap?: boolean,
  handlers?: {
    image: ?Base64ImageHandler,
  },
};

const debugEditor = debug('Artibox:Editor');

function getEditorInitialValues(type, blockIDCursor) {
  switch (type) {
    case TYPE_TITLE:
      return EditorTitle.getInitialValues(blockIDCursor);

    case TYPE_PARAGRAPH:
      return EditorParagraph.getInitialValues(blockIDCursor);

    case TYPE_IMAGE:
      return EditorImage.getInitialValues(blockIDCursor);

    default:
      return null;
  }
}

export default class ArtiboxConfigProvider extends PureComponent<Props> {
  static defaultProps = {
    minimap: true,
    children: null,
    handlers: {
      image: new Base64ImageHandler(),
    },
  }

  static DEFAULT_HANDLERS = {
    image: new Base64ImageHandler(),
  }

  static getEditorData({
    blocks,
    metadata,
  }) {
    return {
      blocks: blocks.map(b => ({
        id: b.id,
        type: b.type,
        value: b.value,
        descriptions: b.descriptions,
      })),
      ...metadata,
    };
  }

  static handleSubmit(editor) {
    return () => editor.onSubmit(ArtiboxConfigProvider.getEditorData(editor));
  }

  static bindInputRef(blocks = []) {
    return blocks.map(block => ({
      ...block,
      input: React.createRef(),
    }));
  }

  constructor(props) {
    super(props);

    this.boundGetActiveBlock = editorName => this.getActiveBlock(editorName);
    this.boundRemoveBlock = (...args) => this.removeBlock(...args);
    this.boundUpdateValue = (...args) => this.updateValue(...args);
    this.boundSelectValue = (...args) => this.selectValue(...args);
    this.boundCreateBlock = (...args) => this.createBlock(...args);
    this.boundHandleSubmit = (...args) => ArtiboxConfigProvider.handleSubmit(...args);
    this.boundCreateNewEditor = options => this.createNewEditor(options);
    this.boundUpdateDescriptions = (...args) => this.updateDescriptions(...args);
    this.boundUpdateMetadata = (...args) => this.updateMetadata(...args);
  }

  state = {
    editors: {},
  }

  componentDidUpdate(prevProps, {
    editors: prevEditors,
  }) {
    const { editors } = this.state;

    Object.entries(prevEditors).forEach(([name, editor]) => {
      if (editor.onChange && editor !== editors[name]) {
        editor.onChange(ArtiboxConfigProvider.getEditorData(editors[name]));
      }
    });
  }

  getActiveBlock(name) {
    const { editors } = this.state;

    return editors[name].blocks.find(b => b.input.current === document.activeElement);
  }

  updateMetadata(name, key, value) {
    const { editors } = this.state;

    this.setState({
      editors: {
        ...editors,
        [name]: {
          ...editors[name],
          metadata: {
            ...editors[name].metadata,
            [key]: value.target.value,
          },
        },
      },
    });
  }

  createNewEditor({
    name,
    initialValues = {},
    onSubmit,
    onChange,
  } = {}) {
    const { editors } = this.state;

    this.setState({
      editors: {
        ...editors,
        [name]: {
          name,
          blockIDCursor: -1,
          blocks: ArtiboxConfigProvider.bindInputRef(initialValues.blocks),
          metadata: {
            title: initialValues.title || '',
          },
          onSubmit,
          onChange,
        },
      },
    });

    return this;
  }

  selectValue(name, id) {
    const { editors } = this.state;
    const block = editors[name].blocks.find(b => b.id === id);

    return block ? block.value : null;
  }

  createBlock(name, type, afterId) {
    const { editors } = this.state;

    const blockInitialValues = getEditorInitialValues(type, editors[name].blockIDCursor);

    if (!blockInitialValues) return;

    if (afterId) {
      const index = editors[name].blocks.findIndex(b => b.id === afterId);

      if (~index) {
        this.setState({
          editors: {
            ...editors,
            [name]: {
              ...editors[name],
              blockIDCursor: editors[name].blockIDCursor - 1,
              blocks: [
                ...editors[name].blocks.slice(0, index + 1),
                blockInitialValues,
                ...editors[name].blocks.slice(index + 1),
              ],
            },
          },
        });

        return;
      }
    }

    this.setState({
      editors: {
        ...editors,
        [name]: {
          ...editors[name],
          blockIDCursor: editors[name].blockIDCursor - 1,
          blocks: [
            ...editors[name].blocks,
            blockInitialValues,
          ],
        },
      },
    });
  }

  removeBlock(name, id) {
    const { editors } = this.state;
    const blockIndex = editors[name].blocks.findIndex(b => b.id === id);

    if (!~blockIndex) {
      debugEditor(`Cannot found target block: ${id}`);

      return;
    }

    const prevBlock = editors[name].blocks[blockIndex - 1];

    this.setState({
      editors: {
        ...editors,
        [name]: {
          ...editors[name],
          blocks: [
            ...editors[name].blocks.slice(0, blockIndex),
            ...editors[name].blocks.slice(blockIndex + 1),
          ],
        },
      },
    });

    if (prevBlock && prevBlock.input.current) {
      prevBlock.input.current.focus();
    }
  }

  updateValue(name, id, value) {
    const { editors } = this.state;
    const blockIndex = editors[name].blocks.findIndex(b => b.id === id);

    if (!~blockIndex) {
      debugEditor(`Cannot found target block: ${id}`);

      return;
    }

    this.setState({
      editors: {
        ...editors,
        [name]: {
          ...editors[name],
          blocks: [
            ...editors[name].blocks.slice(0, blockIndex),
            {
              ...editors[name].blocks[blockIndex],
              value,
            },
            ...editors[name].blocks.slice(blockIndex + 1),
          ],
        },
      },
    });
  }

  updateDescriptions(name, id, descriptions) {
    const { editors } = this.state;
    const blockIndex = editors[name].blocks.findIndex(b => b.id === id);

    if (!~blockIndex) {
      debugEditor(`Cannot found target block: ${id}`);

      return;
    }

    this.setState({
      editors: {
        ...editors,
        [name]: {
          ...editors[name],
          blocks: [
            ...editors[name].blocks.slice(0, blockIndex),
            {
              ...editors[name].blocks[blockIndex],
              descriptions,
            },
            ...editors[name].blocks.slice(blockIndex + 1),
          ],
        },
      },
    });
  }

  render() {
    const {
      children,
      handlers,
      minimap,
    } = this.props;

    const {
      editors,
    } = this.state;

    return (
      <ConfigContext.Provider
        value={{
          minimap,
          handlers: {
            ...ArtiboxConfigProvider.DEFAULT_HANDLERS,
            ...(handlers || {}),
          },
          editors,
          getActiveBlock: this.boundGetActiveBlock,
          removeBlock: this.boundRemoveBlock,
          selectValue: this.boundSelectValue,
          updateValue: this.boundUpdateValue,
          createBlock: this.boundCreateBlock,
          updateDescriptions: this.boundUpdateDescriptions,
          handleSubmit: this.boundHandleSubmit,
          createNewEditor: this.boundCreateNewEditor,
          updateMetadata: this.boundUpdateMetadata,
        }}>
        {children}
      </ConfigContext.Provider>
    );
  }
}

export function createConfigProvider(options = {}) {
  return function renderProvider(props) {
    return <ArtiboxConfigProvider {...props} {...options} />;
  };
}
