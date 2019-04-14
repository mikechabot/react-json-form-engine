"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Asterisk", {
  enumerable: true,
  get: function get() {
    return _Asterisk.default;
  }
});
Object.defineProperty(exports, "Icon", {
  enumerable: true,
  get: function get() {
    return _Icon.default;
  }
});
Object.defineProperty(exports, "Flex", {
  enumerable: true,
  get: function get() {
    return _Flex.default;
  }
});

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _freeRegularSvgIcons = require("@fortawesome/free-regular-svg-icons");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _Asterisk = _interopRequireDefault(require("./Asterisk"));

var _Icon = _interopRequireDefault(require("./Icon"));

var _Flex = _interopRequireDefault(require("./Flex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_fontawesomeSvgCore.library.add(_freeRegularSvgIcons.faSquare, _freeRegularSvgIcons.faCheckSquare, _freeSolidSvgIcons.faAngleRight, _freeSolidSvgIcons.faAsterisk, _freeSolidSvgIcons.faExclamationTriangle, _freeRegularSvgIcons.faCircle, _freeRegularSvgIcons.faDotCircle, _freeSolidSvgIcons.faQuestionCircle);