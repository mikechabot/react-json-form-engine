"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _zipObject = _interopRequireDefault(require("lodash/zipObject"));

var _keys = _interopRequireDefault(require("lodash/keys"));

var _map = _interopRequireDefault(require("lodash/map"));

var _maybeBaby = _interopRequireDefault(require("maybe-baby"));

var _formConst = require("./form-const");

var _formOperations = require("./form-operations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var COMPONENT_CONFIGS = 'componentConfigs';
/**
 * The FormEngine is capable of storing various data types in the instance model (e.g. string, number, date).
 * And for each given data type, there is a set form controls available to the UI. For instance, if a field is
 * of type "array" it can be rendered as a checkbox group, or select dropdown. A "number" type can be displayed
 * as a standard number input, or a range slider.
 *
 */

var FormConfig =
/*#__PURE__*/
function () {
  function FormConfig() {
    var _this$__registerDataT2, _this$__registerDataT3, _this$__registerDataT4, _this$__registerDataT6;

    _classCallCheck(this, FormConfig);

    this.typeConfigs = {};

    this.__registerDataType(_formConst.DATA_TYPE.INFO, _defineProperty({}, _formConst.COMPONENT_TYPE.INFO, require('../../components/form/controls/Info').default));

    this.__registerDataType(_formConst.DATA_TYPE.STRING, (_this$__registerDataT2 = {}, _defineProperty(_this$__registerDataT2, _formConst.COMPONENT_TYPE.TEXT, require('../../components/form/controls/Text').default), _defineProperty(_this$__registerDataT2, _formConst.COMPONENT_TYPE.PASSWORD, require('../../components/form/controls/Text').default), _defineProperty(_this$__registerDataT2, _formConst.COMPONENT_TYPE.TEXTAREA, require('../../components/form/controls/Textarea').default), _defineProperty(_this$__registerDataT2, _formConst.COMPONENT_TYPE.SELECT, require('../../components/form/controls/Select').default), _defineProperty(_this$__registerDataT2, _formConst.COMPONENT_TYPE.RADIO, require('../../components/form/controls/Radio').default), _this$__registerDataT2));

    this.__registerDataType(_formConst.DATA_TYPE.BOOLEAN, (_this$__registerDataT3 = {}, _defineProperty(_this$__registerDataT3, _formConst.COMPONENT_TYPE.CHECKBOX, require('../../components/form/controls/Checkbox').default), _defineProperty(_this$__registerDataT3, _formConst.COMPONENT_TYPE.RADIO, require('../../components/form/controls/Radio').default), _this$__registerDataT3));

    this.__registerDataType(_formConst.DATA_TYPE.NUMBER, (_this$__registerDataT4 = {}, _defineProperty(_this$__registerDataT4, _formConst.COMPONENT_TYPE.NUMBER, require('../../components/form/controls/Number').default), _defineProperty(_this$__registerDataT4, _formConst.COMPONENT_TYPE.RANGE, require('../../components/form/controls/Range').default), _this$__registerDataT4));

    this.__registerDataType(_formConst.DATA_TYPE.DATE, _defineProperty({}, _formConst.COMPONENT_TYPE.DATE, require('../../components/form/controls/DateTime').default));

    this.__registerDataType(_formConst.DATA_TYPE.ARRAY, (_this$__registerDataT6 = {}, _defineProperty(_this$__registerDataT6, _formConst.COMPONENT_TYPE.SELECT, require('../../components/form/controls/Select').default), _defineProperty(_this$__registerDataT6, _formConst.COMPONENT_TYPE.CHECKBOXGROUP, require('../../components/form/controls/CheckboxGroup').default), _this$__registerDataT6));
  }

  _createClass(FormConfig, [{
    key: "__registerDataType",
    value: function __registerDataType(type, components) {
      var _this = this;

      this.typeConfigs[type] = _defineProperty({
        type: type
      }, COMPONENT_CONFIGS, (0, _zipObject.default)((0, _keys.default)(components), (0, _map.default)(components, function (component, key) {
        var config = {
          dataType: type,
          component: {
            type: key,
            element: component
          },
          actions: {
            onUpdate: _this._getOperation(type, key, _formOperations.OPERATION_TYPES.ON_UPDATE)
          }
        };

        if (_this._hasDecorators(key)) {
          config.defaultDecorators = _this._getDefaultDecorators(key);
        }

        return config;
      })));
    }
    /**
     * Return a typeConfig, which is a map of React components and metadata keyed by component type
     * @param type
     * @returns {*}
     */

  }, {
    key: "getTypeConfig",
    value: function getTypeConfig(type) {
      if (!type) throw new Error('Type cannot be null/undefined');

      if (this.typeConfigs[type]) {
        return this.typeConfigs[type];
      }

      console.warn("Unmapped data type: ".concat(type));
    }
    /**
     * Given a data type, Return a map of React components keyed by component type
     * @param dataType
     * @returns {TResult|_.Dictionary<any>|Object|*}
     */

  }, {
    key: "getComponentConfigsByDataType",
    value: function getComponentConfigsByDataType(dataType) {
      var typeConfig = this.getTypeConfig(dataType);
      if (typeConfig) return this.getComponentConfigsByTypeConfig(typeConfig);
      console.warn("Unmapped data type: ".concat(dataType));
    }
  }, {
    key: "getComponentConfigsByTypeConfig",
    value: function getComponentConfigsByTypeConfig(typeConfig) {
      if (typeConfig && typeConfig[COMPONENT_CONFIGS]) {
        return typeConfig[COMPONENT_CONFIGS];
      }

      console.warn("Unmapped type config: ".concat(typeConfig));
    }
  }, {
    key: "getComponentConfig",
    value: function getComponentConfig(dataType, componentType) {
      var components = this.getComponentConfigsByDataType(dataType);

      if (components && components[componentType]) {
        return components[componentType];
      }

      console.warn("Unmapped component type \"".concat(componentType, "\" for data type: \"").concat(dataType, "\""));
    }
  }, {
    key: "getComponentTypeByField",
    value: function getComponentTypeByField(field) {
      if (!field) throw new Error('field is required');
      var componentDecorator = this.getComponentDecorator(field);

      if (componentDecorator.isJust()) {
        return componentDecorator.join();
      }

      return this.getDefaultComponentTypeByDataType(field);
    }
  }, {
    key: "getDefaultComponentTypeByDataType",
    value: function getDefaultComponentTypeByDataType(field) {
      if (!field) throw new Error('field is required');

      switch (field.type) {
        case _formConst.DATA_TYPE.BOOLEAN:
          return this.hasOptions(field) ? _formConst.COMPONENT_TYPE.RADIO : _formConst.COMPONENT_TYPE.CHECKBOX;

        case _formConst.DATA_TYPE.STRING:
          return this.hasOptions(field) ? _formConst.COMPONENT_TYPE.SELECT : _formConst.COMPONENT_TYPE.TEXT;

        case _formConst.DATA_TYPE.NUMBER:
          return _formConst.COMPONENT_TYPE.NUMBER;

        case _formConst.DATA_TYPE.DATE:
          return _formConst.COMPONENT_TYPE.DATE;

        case _formConst.DATA_TYPE.ARRAY:
          return _formConst.COMPONENT_TYPE.SELECT;

        case _formConst.DATA_TYPE.INFO:
          return _formConst.COMPONENT_TYPE.INFO;

        default:
          {
            console.warn("Unmapped data type: \"".concat(field.type, "\""));
          }
      }
    }
  }, {
    key: "getComponentDecorator",
    value: function getComponentDecorator(field) {
      return _maybeBaby.default.of(function () {
        return field.uiDecorators.component.type;
      });
    }
  }, {
    key: "hasOptions",
    value: function hasOptions(field) {
      return _maybeBaby.default.of(field).prop('options').isJust();
    }
  }, {
    key: "_getOperation",
    value: function _getOperation(fieldType, componentType, operation) {
      var _this$_getOperations = this._getOperations(fieldType, componentType),
          field = _this$_getOperations.field,
          component = _this$_getOperations.component;

      if (component && component[operation]) {
        return component[operation];
      } else if (field && field[operation]) {
        return field[operation];
      }

      if (componentType === _formConst.COMPONENT_TYPE.INFO) return;
      console.warn("Unmapped operations for field/component type: ".concat(fieldType, "/").concat(componentType));
    }
  }, {
    key: "_getOperations",
    value: function _getOperations(fieldType, componentType) {
      return {
        field: _formOperations.DATA_TYPE_OPERATIONS[fieldType],
        component: _formOperations.COMPONENT_OPERATIONS[componentType]
      };
    }
  }, {
    key: "_hasDecorators",
    value: function _hasDecorators(componentType) {
      return !!this._getDefaultDecorators(componentType);
    }
  }, {
    key: "_getDefaultDecorators",
    value: function _getDefaultDecorators(componentType) {
      return _formConst.COMPONENT_DECORATORS[componentType];
    }
  }]);

  return FormConfig;
}();

var _default = new FormConfig();

exports.default = _default;