"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _glamorous = _interopRequireDefault(require("glamorous"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ALLOWED_FLEX_PROPS = ['alignItems', 'background', 'backgroundColor', 'border', 'borderRadius', 'boxShadow', 'color', 'cursor', 'flex', 'flexGrow', 'flexDirection', 'flexShrink', 'flexWrap', 'fontSize', 'height', 'justifyContent', 'margin', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'overflow', 'overflowX', 'overflowY', 'padding', 'width'];

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
    implicit.push({
      flexDirection: 'column '
    });
  }

  if (props.hAlignCenter) {
    implicit.push(props.column ? {
      alignItems: 'center'
    } : {
      justifyContent: 'center'
    });
  }

  if (props.vAlignCenter) {
    implicit.push(props.column ? {
      justifyContent: 'center'
    } : {
      alignItems: 'center'
    });
  }

  return implicit;
}

var Flex = _glamorous.default.div({
  display: 'flex'
}, function (props) {
  return [].concat(_toConsumableArray(_getImplicitProps(props)), _toConsumableArray(_getExplicitStyles(props, ALLOWED_FLEX_PROPS)));
});

var _default = Flex;
exports.default = _default;