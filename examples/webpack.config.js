// @flow

const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

const developmentEntries = [
  'react-hot-loader/patch',
  'webpack/hot/only-dev-server',
];

module.exports = {
  devtool: NODE_ENV !== 'production' ? 'source-map' : false,
  mode: NODE_ENV || 'development',
  entry: [
    ...(NODE_ENV !== 'production' ? developmentEntries : []),
    path.resolve(__dirname, 'entry.jsx'),
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  target: 'web',
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        'babel-loader',
      ],
    }],
  },
};
