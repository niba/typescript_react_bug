const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index.tsx',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.(less|css)$/,
        loader: extractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!less?sourceMap')
      },
      { test: /\.tsx?$/, loader: 'ts' }
    ]
  },
  postcss: [autoprefixer],
  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.tsx', '.js', '.less']
  },
  plugins: [
    new extractTextPlugin('bundle.css', { allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  devtool: 'eval'
}