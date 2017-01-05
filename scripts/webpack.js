const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


var config = module.exports = {
    plugins: [],
};

// Set context to root of project
config.context = path.resolve(__dirname, '..');

// Resolver config
config.resolve = {
    extensions: ['.js', '.vue'],
    enforceExtension: false,
};

config.resolveLoader = {
    modules: config.resolve.modules,
};

// Client entry
config.entry = {
    bootstrapVue: path.resolve(__dirname, '../index'),
};

// Basic output config
config.output = {
    path: path.resolve(__dirname, '../build'),
    filename: 'semantic-ui-vue.js',
};

// Config Module Loaders
config.module = {

    loaders: [
        // Vue
        {
            test: /\.vue$/,
            loader: 'vue-loader',
        },
        // JS
        // {
        //     test: /\.js$/,
        //     loader: 'babel-loader',
        // important: exclude files in node_modules, otherwise it's going to be really slow!
        // exclude: /node_modules|vendor/
        // },
        //LESS
        {
            test: /\.less$/,
            loader: ['css-loader', 'less-loader']
// )
        },
// Font
// {
//     test: /\.(eot|svg|ttf|woff|woff2)$/,
//     loader: 'file'
// },
// Media
// {
//     test: /\.(png|jpg|gif|svg)$/,
//     loader: 'url',
//     query: {
// limit for base64 inlining in bytes
// limit: 10000,
// custom naming format if file is larger than the threshold
// name: '[name].[ext]?[hash]'
// }
// }
    ]
}
;

// Config Vue style loader
config.plugins.push(new webpack.LoaderOptionsPlugin({
    options: {
        vue: {
            loaders: {
                'less': 'css-loader!less-loader', // This will match all <style lang=less> tags
            }
        }
    }
}));

// Output extracted CSS to a file
config.plugins.push(
    new ExtractTextPlugin({filename: 'semantic-ui-vue.css', allChunks: true})
);

if (process.env.NODE_ENV !== 'production') { // Development Config

    config.devtool = '#eval';

} else { // Production Config


    config.devtool = '#source-map';

    // Pass build environment inside bundle
    // This will Strip comments in Vue code & hort-circuits all Vue.js warning code
    config.plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }));

    // The UglifyJsPlugin will no longer put loaders into minimize mode, and the debug option has been deprecated.
    config.plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
    }));

    // Minify with dead-code elimination
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        sourceMap: true,
    }));

}