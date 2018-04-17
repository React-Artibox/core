// @flow

import React, { PureComponent } from 'react';
import { mixer } from '../helper/style';
import IconPhoto from '../icons/IconPhoto';
import IconPlus from '../icons/IconPlus';
import IconParagraph from '../icons/IconParagraph';
import IconTitle from '../icons/IconTitle';
import BlockGeneratorButton from './BlockGeneratorButton';
import {
  TYPE_IMAGE,
  TYPE_TITLE,
  TYPE_PARAGRAPH,
} from '../type';

const styles: {} = {
  wrapper: {
    position: 'absolute',
    left: 16,
    bottom: 12,
    width: 'calc(100% - 32px)',
    height: 80,
    border: '2px solid #d2d2d2',
    borderRadius: 2,
    backgroundColor: '#f2f2f2',
    display: 'block',
    overflow: 'hidden',
  },
  placeholder: {
    height: 76,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    border: 0,
    outline: 'none',
    opacity: 1,
    transition: 'transform 0.18s ease-out, opacity 0.18s ease-out',
  },
  placeholderShown: {
    transform: 'translate(0, -76px)',
    opacity: 0,
  },
  blockTypes: {
    height: 76,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.18s ease-out, opacity 0.18s ease-out',
    opacity: 0,
  },
  blockTypesShown: {
    transform: 'translate(0, -76px)',
    opacity: 1,
  },
};

type Props = {

};

type State = {
  optionsOpened: boolean,
};

class ArtiboxEditorBlockGenerator extends PureComponent<Props, State> {
  state = {
    optionsOpened: false,
  }

  render() {
    const {
      optionsOpened,
    } = this.state;

    return (
      <div
        role="presentation"
        style={styles.wrapper}
        onClick={() => this.setState({ optionsOpened: !optionsOpened })}>
        <button
          type="button"
          style={mixer([
            styles.placeholder,
            optionsOpened && styles.placeholderShown,
          ])}>
          <IconPlus />
        </button>
        <div
          style={mixer([
            styles.blockTypes,
            optionsOpened && styles.blockTypesShown,
          ])}>
          <BlockGeneratorButton type={TYPE_TITLE}>
            <IconTitle />
          </BlockGeneratorButton>
          <BlockGeneratorButton type={TYPE_PARAGRAPH}>
            <IconParagraph />
          </BlockGeneratorButton>
          <BlockGeneratorButton type={TYPE_IMAGE}>
            <IconPhoto />
          </BlockGeneratorButton>
        </div>
      </div>
    );
  }
}

export default ArtiboxEditorBlockGenerator;
