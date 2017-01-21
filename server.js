'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

new WebpackDevServer(webpack(config), {
    hot               : true,
    historyApiFallback: true
}).listen(3060, 'localhost', error => {
    console.log(error || `Started WebpackDevServer on port 3060`);
});
