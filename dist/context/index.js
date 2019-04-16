"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormConsumer = exports.FormProvider = exports.FormContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctx = _react.default.createContext();

var FormContext = ctx;
exports.FormContext = FormContext;
var FormProvider = ctx.Provider;
exports.FormProvider = FormProvider;
var FormConsumer = ctx.Consumer;
exports.FormConsumer = FormConsumer;