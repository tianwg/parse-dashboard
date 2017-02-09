/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
//This file should be imported by another config file, like build.config.js

var path = require('path');
var SvgPrepPlugin = require('./plugins/svg-prep');

// pulls in package.json and gets version
var webpack = require('webpack');
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var version = json.version;

module.exports = {
  context: path.join(__dirname, '../src'),
  output: {
    filename: '[name].bundle.js',
    publicPath: 'bundles/'
  },
  resolve: {
    modules: [__dirname,path.resolve(__dirname, '../src'), path.resolve(__dirname, 'node_modules'), 'node_modules']
  },
  resolveLoader: {
    modules: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          "presets": [
            "react",
            "es2015",
            "stage-1"
          ],
          "plugins": [
            "transform-runtime",
            "add-module-exports",
            "transform-decorators-legacy",
            "transform-react-display-name"
          ]
        }
      }, {
        test: /\.scss$/,
        loader: "style-loader!css-loader?modules&localIdentName=[local]__[hash:base64:5]!sass-loader?includePaths[]=" +
          encodeURIComponent(path.resolve(__dirname, '../src'))
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.png$/,
        loader: 'file-loader?name=img/[hash].[ext]',
      }, {
        test: /\.jpg$/,
        loader: 'file-loader?name=img/[hash].[ext]',
      }
    ]
  },
  plugins: [
    new SvgPrepPlugin({
      source: path.join(__dirname,'../src', 'icons')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'version' : JSON.stringify(version)
      }
    })
  ]
};
