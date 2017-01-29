'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const del = require('del');

const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

class Clean {
    constructor (options) {
        this.options = options;
    }
    apply () {
        del.sync(this.options.files);
    }
}

module.exports = {
    devtool: 'eval',
    entry  : [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3060',
        'webpack/hot/only-dev-server',
        './src/Bootstrap'
    ],
    output: {
        path    : distPath,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    plugins: [
        new Clean({ files: ['dist/*'] }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('css/bundle.css'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            inject  : 'body'
        })
    ],
    module: {
        loaders: [
            {
                test   : /\.(js|jsx)$/,
                loaders: ['babel'],
                include: srcPath
            },
            {
                test  : /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
            },
            {
                test  : /\.(svg|png|jpg|gif)(\?v=[0-9].[0-9].[0-9])?$/,
                loader: 'url?limit=10000&name=[name]-[hash].[ext]'
            },
            {
                test  : /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            },
            {
                test   : /\.json$/,
                loader : ['json'],
                include: srcPath
            }
        ]
    }
};
