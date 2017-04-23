process.traceDeprecation = true;
/**
 * Created by Qi on 4/21/17.
 */

var path = require('path');
var webpack = require('webpack');
process.traceDeprecation = true
const PATHS = {
    build: path.join(__dirname, 'build')
};

process.traceDeprecation = true;
module.exports = {

    entry: './src/index.js',

    output: {
        path: PATHS.build,
        filename: 'ui-bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015','es2016','stage-0','react']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(?:png|jpg|svg)$/,
                loader: 'url-loader?limit=1000000'
            }
        ]
    },
    node: {
        net: 'empty',
    }
}