// @flow

import React, { PureComponent } from 'react';
import IconPhoto from '../../../icons/IconPhoto';
import { inputResolver } from '../../../helper/input';

const styles = {
  wrapper: {
    width: '100%',
    position: 'relative',
    minHeight: '20vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    padding: '0.25em 0.5em',
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
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
};

type Props = {
  onChange: Function,
  value: string,
  input: {
    current: ?Node,
  },
};

class ImageInput extends PureComponent<Props> {
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

  render() {
    const {
      onChange,
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
        style={styles.wrapper}
        ref={this.wrapper}>
        {isImageLoaded ? (
          <div style={styles.imageWrapper}>
            <img src={shownImage} width={width} height={height} alt="" style={styles.image} />
            <div
              style={{
                ...styles.inputWrapper,
                ...(isHovered ? styles.inputWrapperHovered : {}),
              }}
              onMouseEnter={() => this.setState({ isHovered: true })}
              onMouseLeave={() => this.setState({ isHovered: false })}>
              <input
                ref={input}
                key={inputKey}
                onChange={onChange}
                style={styles.input}
                accept="image/*"
                type="file" />
            </div>
          </div>
        ) : (
          <div
            style={{
              ...styles.imageWrapper,
              ...styles.minSize,
            }}>
            <IconPhoto scale={1.5} />
            <div
              style={{
                ...styles.inputWrapper,
                ...(isHovered ? styles.inputWrapperHovered : {}),
              }}
              onMouseEnter={() => this.setState({ isHovered: true })}
              onMouseLeave={() => this.setState({ isHovered: false })}>
              <input
                ref={input}
                key={inputKey}
                onChange={onChange}
                style={styles.input}
                accept="image/*"
                type="file" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default inputResolver(ImageInput);
