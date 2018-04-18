// @flow
/* eslint class-methods-use-this: 0 */

export default class Base64ImageHandler {
  static BROWSER_NOT_SUPPORT_ERROR = new Error('Browser Not Support FileReader API')
  static INVALID_FILE_TYPE_ERROR = new Error('Invalid File Type')

  constructor() {
    if (typeof FileReader === 'undefined') {
      throw Base64ImageHandler.FileReader;
    }

    // Bind this
    this.upload = (...args) => this.constructor.upload(...args);
    this.getURL = (...args) => this.constructor.getURL(...args);
    this.onChangeHook = (...args) => this.constructor.onChangeHook(...args);
  }

  static onChangeHook(onChange) {
    return ({
      target: {
        files,
      },
    }) => {
      Array.from(files).forEach(async (file) => {
        const url = await this.upload(file);

        onChange(url);
      });
    };
  }

  static upload(file) {
    if (!(file instanceof File)) {
      throw Base64ImageHandler.INVALID_FILE_TYPE_ERROR;
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onError = (err) => {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  }

  static getURL(file) {
    return file;
  }
}
