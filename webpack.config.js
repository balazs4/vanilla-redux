const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'vanilla.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new htmlWebpackPlugin()],
  devServer: {
    port: 9000,
    hot: true,
    contentBase: path.join(__dirname, 'dist')
  }
};
