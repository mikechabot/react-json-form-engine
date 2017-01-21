'use strict';

const del = require('del');

class CleanPlugin {
    constructor (options) {
        this.options = options;
    }
    apply () {
        del.sync(
            this.options.files
        );
    }
}

module.exports = CleanPlugin;
