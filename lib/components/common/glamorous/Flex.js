'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NavbarItem = exports.NavbarItemEnd = exports.NavbarBrand = exports.Navbar = exports.Button = exports.Flex = undefined;

var _glamorous$a;

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ALLOWED_FLEX_PROPS = ['alignItems', 'background', 'backgroundColor', 'border', 'borderRadius', 'boxShadow', 'color', 'cursor', 'flex', 'flexGrow', 'flexShrink', 'flexWrap', 'fontSize', 'height', 'justifyContent', 'margin', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'overflow', 'overflowX', 'overflowY', 'padding', 'width'];

function _getExplicitStyles(props, propKeys) {
    if (!propKeys) throw new Error('Missing required propKeys');
    if (!Array.isArray(propKeys)) throw new Error('propKeys must be an Array');
    return propKeys.map(function (prop) {
        return props[prop] !== null && props[prop] !== undefined ? _defineProperty({}, prop, props[prop]) : null;
    }).filter(function (rule) {
        return rule;
    });
}

function _getImplicitProps(props) {
    var implicit = [];
    if (props.column) {
        implicit.push({ flexDirection: 'column ' });
    }
    if (props.hAlignCenter) {
        implicit.push(props.column ? { alignItems: 'center' } : { justifyContent: 'center' });
    }

    if (props.vAlignCenter) {
        implicit.push(props.column ? { justifyContent: 'center' } : { alignItems: 'center' });
    }
    return implicit;
}

var Flex = exports.Flex = _glamorous2.default.div({
    display: 'flex'
}, function (props) {
    return [].concat(_toConsumableArray(_getImplicitProps(props)), _toConsumableArray(_getExplicitStyles(props, ALLOWED_FLEX_PROPS)));
});

var mediaQueries = {
    Desktop: '@media screen and (min-width: 1088px)',
    Tablet: '@media screen and (min-width: 769px), print',
    Mobile: '@media screen and (max-width: 768px)'
};

var Button = exports.Button = _glamorous2.default.button(_defineProperty({
    userSelect: 'none',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    alignItems: 'center',
    cursor: 'pointer',
    border: '1px solid transparent',
    boxShadow: 'none',
    display: 'inlineFlex',
    justifyContent: 'center',
    fontSize: '1rem',
    height: '2.25em',
    lineHeight: 1.5,
    backgroundColor: '#3273dc',
    color: '#ffffff',
    borderWidth: '1px',
    paddingBottom: 'calc(0.375em - 1px)',
    paddingLeft: '0.75em',
    paddingRight: '0.75em',
    paddingTop: 'calc(0.375em - 1px)',
    textAlign: 'center',
    whiteApace: 'nowrap',
    ':hover': {
        backgroundColor: '#276cda',
        borderColor: 'transparent',
        color: '#ffffff'
    },
    ':focus': {
        outline: 'none',
        borderColor: 'transparent',
        color: '#ffffff'
    },
    ':active': {
        outline: 'none',
        backgroundColor: '#2366d1',
        borderColor: 'transparent',
        color: '#ffffff'
    }
}, mediaQueries.Mobile, {
    fontSize: '0.75rem !important'
}));

// .navbar .is-dark
var Navbar = exports.Navbar = _glamorous2.default.div({
    backgroundColor: '#363636',
    color: 'whitesmoke',
    minHeight: '3.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 30
});

var NavbarBrand = exports.NavbarBrand = _glamorous2.default.div({
    alignItems: 'stretch',
    display: 'flex',
    flexShrink: 0,
    minHeight: '3.25rem'
});

var NavbarItemEnd = exports.NavbarItemEnd = _glamorous2.default.div({
    padding: '0.5rem 0.75rem'
});

var NavbarItem = exports.NavbarItem = _glamorous2.default.a((_glamorous$a = {
    color: 'whitesmoke',
    lineHeight: 1.5,
    padding: '0.5rem 0.75rem',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    display: 'flex',
    ':hover': {
        backgroundColor: '#292929',
        color: 'whitesmoke'
    }
}, _defineProperty(_glamorous$a, mediaQueries.Mobile, {
    fontSize: '1rem !important'
}), _defineProperty(_glamorous$a, mediaQueries.Tablet, {
    fontSize: '1.25rem !important'
}), _defineProperty(_glamorous$a, mediaQueries.Desktop, {
    fontSize: '1.5rem !important'
}), _glamorous$a), function (_ref2) {
    var isActive = _ref2.isActive;

    var styles = [];
    if (isActive) {
        styles.push({
            backgroundColor: '#292929',
            color: 'whitesmoke'
        });
    }
});