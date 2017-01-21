const VALIDATION_CONST = {
    TYPE: {
        REQUIRED     : '__MissingRequired',
        INVALID_VALUE: '__InvalidValue'
    },
    STATUS: {
        OK     : 'OK',
        WARNING: 'WARNING',
        ERROR  : 'ERROR'
    },
    STATUS_RANKS: {}
};

// The lower the number the more severe the status
// This allows us to sort the most severe to the top
VALIDATION_CONST.STATUS_RANKS.ERROR = 100;
VALIDATION_CONST.STATUS_RANKS.WARNING = 200;
VALIDATION_CONST.STATUS_RANKS.OK = 300;

export default VALIDATION_CONST;
