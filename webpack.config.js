var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

function versions() {
  return '"setlxjs-lib v' + require('setlxjs-lib/package.json').version + ' + ' +
    'setlxjs-transpiler v' + require('setlxjs-transpiler/package.json').version + '"';
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loaders: ['file'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      "SETLXJS_VERSION": versions(),
    }),
  ],
}
