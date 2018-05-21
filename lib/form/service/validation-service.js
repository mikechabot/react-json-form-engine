'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _sortBy2 = require('lodash/sortBy');

var _sortBy3 = _interopRequireDefault(_sortBy2);

var _formConst = require('../config/form-const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RANKS = _formConst.VALIDATION_CONST.STATUS_RANKS;

var ValidationService = {
    /**
     * Return the most severe status given a list of validation
     * messages.
     * @param messages
     * @returns {*}
     */
    getMostSevereStatus: function getMostSevereStatus(messages) {
        var message = (0, _head3.default)((0, _sortBy3.default)(messages, function (message) {
            return message.rank;
        }));
        if (message) return message.status;
    },

    /**
     * Determine if a given status is more severe than another.
     * Lower ranks are more severe than higher ranks
     * @param status
     * @param overallStatus
     * @returns {boolean}
     */
    isMoreSevereStatus: function isMoreSevereStatus(status, overallStatus) {
        return RANKS[status] < RANKS[overallStatus];
    },
    isError: function isError(status) {
        return status === _formConst.VALIDATION_CONST.STATUS.ERROR;
    }
};

exports.default = ValidationService;