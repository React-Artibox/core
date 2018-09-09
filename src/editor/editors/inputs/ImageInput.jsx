// @flow

import React, { PureComponent } from 'react';
import Colors from '@artibox/colors';
import { ConfigContext } from '../../../context';
import IconPhoto from '../../../icons/IconPhoto';
import { inputResolver } from '../../../helper/input';
import { TYPE_PARAGRAPH } from '../../../type';

type Props = {
  onChange: Function,
  onChangeHook: Function,
  value: string,
  input: {
    current: ?Node,
  },
  remove: Function,
  addNextBlock: Function,
};

class ImageInput extends PureComponent<Props> {
  styles = {
    wrapper: {
      width: '100%',
      position: 'relative',
      minHeight: '20vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fafafa',
      padding: '0.25em 0.5em',
      outline: 'none',
    },
    imageWrapper: {
      position: 'relative',
    },
    input: {
      opacity: 0,
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 10,
      backgroundColor: Colors.INPUT_BACKGROUND,
      border: `1px solid ${Colors.INPUT_BORDER}`,
    },
    image: {

    },
    minSize: {
      minWidth: '75%',
      minHeight: '15vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 10,
    },
    inputWrapperHovered: {
      backgroundColor: Colors.INPUT_BACKGROUND_HOVERED_MASK,
    },
  };

  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
  }

  state = {
    width: null,
    height: null,
    shownImage: null,
    isHovered: false,
    inputKey: Math.random(),
  }

  componentDidMount() {
    const { value } = this.props;

    if (value) {
      this.updateImageSize(value);
    }
  }

  componentDidUpdate({ value: pastImage }) {
    const {
      value: newImage,
    } = this.props;

    if (newImage && pastImage !== newImage) {
      this.updateImageSize(newImage);
    }
  }

  updateImageSize(image) {
    const { width } = this.wrapper.current.getBoundingClientRect();
    const widthLimit = width * 0.9;
    const heightLimit = window.innerHeight * 0.4;

    const img = new Image();
    img.onload = () => {
      const ratio = img.width / img.height;

      if (ratio >= 1) {
        const targetWidth = Math.min(widthLimit, img.width);

        this.setState({
          shownImage: image,
          width: targetWidth,
          height: img.height / (img.width / targetWidth),
        });
      } else {
        const targetHeight = Math.min(heightLimit, img.height);

        this.setState({
          shownImage: image,
          width: img.width / (img.height / targetHeight),
          height: targetHeight,
        });
      }
    };
    img.src = image;
  }

  handleKeyUp(code) {
    const { remove } = this.props;

    switch (code) {
      case 8:
        remove();
        break;

      default:
        break;
    }
  }

  handleKeyDown(event) {
    const { addNextBlock } = this.props;

    switch (event.keyCode || event.which) {
      case 13:
        event.preventDefault();

        addNextBlock();
        break;

      default:
        break;
    }
  }

  render() {
    const {
      onChange,
      onChangeHook,
      input,
    } = this.props;

    const {
      width,
      height,
      isHovered,
      inputKey,
      shownImage,
    } = this.state;

    const isImageLoaded = width && height && shownImage;

    return (
      <div
        role="button"
        tabIndex="-1"
        onKeyPress={() => input.current.focus()}
        onClick={() => input.current.focus()}
        style={this.styles.wrapper}
        ref={this.wrapper}>
        {isImageLoaded ? (
          <div style={this.styles.imageWrapper}>
            <img src={shownImage} width={width} height={height} alt="" style={this.styles.image} />
            <div
              style={{
                ...this.styles.inputWrapper,
                ...(isHovered ? this.styles.inputWrapperHovered : {}),
              }}
              onMouseEnter={() => this.setState({ isHovered: true })}
              onMouseLeave={() => this.setState({ isHovered: false })}>
              <input
                ref={input}
                key={inputKey}
                onKeyDown={e => this.handleKeyDown(e)}
                onKeyUp={({
                  keyCode,
                  which,
                }) => this.handleKeyUp(keyCode || which)}
                onChange={onChangeHook(onChange)}
                style={this.styles.input}
                accept="image/*"
                type="file" />
            </div>
          </div>
        ) : (
          <div
            style={{
              ...this.styles.imageWrapper,
              ...this.styles.minSize,
            }}>
            <IconPhoto scale={1.5} />
            <div
              style={{
                ...this.styles.inputWrapper,
                ...(isHovered ? this.styles.inputWrapperHovered : {}),
              }}
              onMouseEnter={() => this.setState({ isHovered: true })}
              onMouseLeave={() => this.setState({ isHovered: false })}>
              <input
                ref={input}
                key={inputKey}
                onKeyDown={e => this.handleKeyDown(e)}
                onKeyUp={({
                  keyCode,
                  which,
                }) => this.handleKeyUp(keyCode || which)}
                onChange={onChangeHook(onChange)}
                style={this.styles.input}
                accept="image/*"
                type="file" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

function ImageConfigHandler({
  onChange,
  remove,
  input,
  value,
  insertBlock,
}: {
  onChange: Function,
  remove: Function,
  input: {
    current: ?Node,
  },
  value: string,
  insertBlock: Function,
}) {
  return (
    <ConfigContext.Consumer>
      {({
        handlers: {
          image: {
            onChangeHook,
            getURL,
          },
        },
      }) => (
        <ImageInput
          addNextBlock={() => insertBlock(TYPE_PARAGRAPH)}
          remove={remove}
          onChangeHook={onChangeHook}
          onChange={onChange}
          value={getURL(value)}
          input={input} />
      )}
    </ConfigContext.Consumer>
  );
}

export default inputResolver(ImageConfigHandler);
