'use strict';

import _head from 'lodash/head';
import _sortBy from 'lodash/sortBy';
import { VALIDATION_CONST } from '../config/form-const';
const RANKS = VALIDATION_CONST.STATUS_RANKS;

const ValidationService = {
    /**
     * Return the most severe status given a list of validation
     * messages.
     * @param messages
     * @returns {*}
     */
    getMostSevereStatus(messages) {
        const message = _head(_sortBy(messages, message => message.rank));
        if (message) return message.status;
    },
    /**
     * Determine if a given status is more severe than another.
     * Lower ranks are more severe than higher ranks
     * @param status
     * @param overallStatus
     * @returns {boolean}
     */
    isMoreSevereStatus(status, overallStatus) {
        return RANKS[status] < RANKS[overallStatus];
    },
    isError(status) {
        return status === VALIDATION_CONST.STATUS.ERROR;
    }
};

export default ValidationService;
