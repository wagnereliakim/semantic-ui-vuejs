# Semantic UI VueJS components

> Components to use with Vue2

## Installation

``` bash
# install dependencies
$ npm install semantic-ui-vuejs

```

> Configure webpack.config.js
``` json
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    },
    {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]?[hash]'
        }
    },
    {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'url-loader?importLoaders=1&limit=100000'
    }
```
