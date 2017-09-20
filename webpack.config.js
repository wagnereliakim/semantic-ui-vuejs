const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  entry: './index',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'semantic-ui-vue.js',
  },
  module: {
    rules: [
      {test: /\.vue$/, loader: 'vue-loader'},
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader'
            })
          }
        }
      },
      {test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader', options: {name: '[name].[ext]?[hash]'}},
      {test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url-loader?importLoaders=1&limit=100000'},
    ]
  },
  plugins: [
    new ExtractTextPlugin("semantic-ui-vue.css"),
    // Progress Bar Webpack plugin format
    // https://github.com/clessg/progress-bar-webpack-plugin#options
    new ProgressBarPlugin({
      format: chalk.cyan.bold('  build ') + chalk.bold('[') + ':bar' + chalk.bold(']') + chalk.green.bold(' :percent') + ' (:elapsed seconds)' + ' (:msg)',
      clear: false
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
