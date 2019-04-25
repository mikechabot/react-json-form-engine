"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _maybeBaby = _interopRequireDefault(require("maybe-baby"));

var _zipObject = _interopRequireDefault(require("lodash/zipObject"));

var _formConst = require("./form-const");

var _formOperations = require("./form-operations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

    this.dataTypeConfigurations = {};

    this.__registerDataType(_formConst.DATA_TYPE.INFO, _defineProperty({}, _formConst.COMPONENT_TYPE.INFO, require('../../components/form/controls/Info')["default"]));

    this.__registerDataType(_formConst.DATA_TYPE.STRING, (_this$__registerDataT2 = {}, _defineProperty(_this$__registerDataT2, _formConst.COMPONENT_TYPE.TEXT, require('../../components/form/controls/Text')["default"]), _defineProperty(_this$__registerDataT2, _formConst.COMPONENT_TYPE.PASSWORD, require('../../components/form/controls/Text')["default"]), _defineProperty(_this$__registerDataT2, _formConst.COMPONENT_TYPE.TEXTAREA, require('../../components/form/controls/Textarea')["default"]), _defineProperty(_this$__registerDataT2, _formConst.COMPONENT_TYPE.SELECT, require('../../components/form/controls/Select')["default"]), _defineProperty(_this$__registerDataT2, _formConst.COMPONENT_TYPE.RADIO, require('../../components/form/controls/Radio')["default"]), _this$__registerDataT2));

    this.__registerDataType(_formConst.DATA_TYPE.BOOLEAN, (_this$__registerDataT3 = {}, _defineProperty(_this$__registerDataT3, _formConst.COMPONENT_TYPE.CHECKBOX, require('../../components/form/controls/Checkbox')["default"]), _defineProperty(_this$__registerDataT3, _formConst.COMPONENT_TYPE.RADIO, require('../../components/form/controls/Radio')["default"]), _this$__registerDataT3));

    this.__registerDataType(_formConst.DATA_TYPE.NUMBER, (_this$__registerDataT4 = {}, _defineProperty(_this$__registerDataT4, _formConst.COMPONENT_TYPE.NUMBER, require('../../components/form/controls/Number')["default"]), _defineProperty(_this$__registerDataT4, _formConst.COMPONENT_TYPE.RANGE, require('../../components/form/controls/Range')["default"]), _this$__registerDataT4));

    this.__registerDataType(_formConst.DATA_TYPE.DATE, _defineProperty({}, _formConst.COMPONENT_TYPE.DATE, require('../../components/form/controls/DateTime')["default"]));

    this.__registerDataType(_formConst.DATA_TYPE.ARRAY, (_this$__registerDataT6 = {}, _defineProperty(_this$__registerDataT6, _formConst.COMPONENT_TYPE.SELECT, require('../../components/form/controls/Select')["default"]), _defineProperty(_this$__registerDataT6, _formConst.COMPONENT_TYPE.CHECKBOXGROUP, require('../../components/form/controls/CheckboxGroup')["default"]), _this$__registerDataT6));
  }
  /**
   * Register a data type with dataTypeConfigurations map.
   * The map is keyed by data type, and contains a map of "componentConfigs",
   * which control the component type, the component element, and any action
   * operations associated with that data/component type.
   * @param dataType
   * @param componentMap
   * @private
   */


  _createClass(FormConfig, [{
    key: "__registerDataType",
    value: function __registerDataType(dataType, componentMap) {
      var _this = this;

      var componentTypes = Object.keys(componentMap);
      this.dataTypeConfigurations[dataType] = _defineProperty({
        dataType: dataType
      }, COMPONENT_CONFIGS, (0, _zipObject["default"])(componentTypes, componentTypes.map(function (componentType) {
        var config = {
          dataType: dataType,
          component: {
            type: componentType,
            element: componentMap[componentType]
          },
          actions: {
            onUpdate: _this.getOperationsByOperationType(dataType, componentType, _formOperations.OPERATION_TYPES.ON_UPDATE)
          }
        };

        if (_this.hasDefaultDecorators(componentType)) {
          config.defaultDecorators = _this.getDefaultDecorators(componentType);
        }

        return config;
      })));
    }
    /**
     * Given a data type, return a map of React components keyed by component type
     * @param dataType
     * @returns {TResult|_.Dictionary<any>|Object|*}
     */

  }, {
    key: "getComponentConfigurationByDataType",
    value: function getComponentConfigurationByDataType(dataType) {
      if (!dataType) throw new Error('Type cannot be null/undefined');

      if (!this.dataTypeConfigurations[dataType]) {
        throw new Error("Unmapped data type config: ".concat(dataType));
      }

      return this.dataTypeConfigurations[dataType][COMPONENT_CONFIGS];
    }
    /**
     * Return a component configuration given a combination of data type
     * and component type
     * @param dataType
     * @param componentType
     * @returns {*}
     */

  }, {
    key: "getComponentConfigurationByTypes",
    value: function getComponentConfigurationByTypes(dataType, componentType) {
      var components = this.getComponentConfigurationByDataType(dataType) || {};
      if (components[componentType]) return components[componentType];
      console.warn("Unmapped component type \"".concat(componentType, "\" for data type: \"").concat(dataType, "\""));
    }
    /**
     * Given a field definition, return the component type that should be rendered.
     * If a user specifies an Allowed Control override within a decorator, use that,
     * otherwise return the Default Control for the data type.
     * @param field
     * @returns {*}
     */

  }, {
    key: "getComponentTypeByField",
    value: function getComponentTypeByField(field) {
      if (!field) throw new Error('field cannot be null/undefined');
      var componentDecorator = this.getComponentDecoratorFromField(field);

      if (componentDecorator.isJust()) {
        return componentDecorator.join();
      }

      return this.getDefaultComponentTypeByField(field);
    }
    /**
     * Return the default component type
     * @param field
     * @returns {string}
     */

  }, {
    key: "getDefaultComponentTypeByField",
    value: function getDefaultComponentTypeByField(field) {
      if (!field) throw new Error('field cannot be null/undefined');

      var hasOptions = _maybeBaby["default"].of(function () {
        return field.options;
      }).isJust();

      switch (field.type) {
        case _formConst.DATA_TYPE.BOOLEAN:
          return hasOptions ? _formConst.COMPONENT_TYPE.RADIO : _formConst.COMPONENT_TYPE.CHECKBOX;

        case _formConst.DATA_TYPE.STRING:
          return hasOptions ? _formConst.COMPONENT_TYPE.SELECT : _formConst.COMPONENT_TYPE.TEXT;

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
            console.warn("Unmapped component by field data type: \"".concat(field.type, "\""));
          }
      }
    }
    /**
     * Return a monad containing field decorators than may be a part of
     * the form definition
     * @param field
     * @returns {Maybe}
     */

  }, {
    key: "getComponentDecoratorFromField",
    value: function getComponentDecoratorFromField(field) {
      return _maybeBaby["default"].of(function () {
        return field.uiDecorators.component.type;
      });
    }
    /**
     * Data types and component types maintain a set of specific operation
     * functions that control their interaction with the DOM. For example
     * a "number" data type will return "event.target.valueAsNumber", where
     * as a "string" data type will simply return "event.target.value".
     * @param dataType
     * @param componentType
     * @param operationType
     * @returns {*}
     */

  }, {
    key: "getOperationsByOperationType",
    value: function getOperationsByOperationType(dataType, componentType, operationType) {
      // dataType/componentType of INFO has no end-user operations
      if (componentType === _formConst.COMPONENT_TYPE.INFO) return; // Return the operation function for the given dataType of componentType

      var _this$getFieldAndComp = this.getFieldAndComponentOperations(dataType, componentType),
          field = _this$getFieldAndComp.field,
          component = _this$getFieldAndComp.component;

      if (component[operationType]) return component[operationType];
      if (field[operationType]) return field[operationType];
      console.warn("Unmapped operations for field/component type: ".concat(dataType, "/").concat(componentType));
    }
    /**
     * Get field and/or component operation functions (e.g. onUpdate)
     * @param fieldType
     * @param componentType
     * @returns {{field: (()|{}), component: (undefined|{})}}
     */

  }, {
    key: "getFieldAndComponentOperations",
    value: function getFieldAndComponentOperations(dataType, componentType) {
      return {
        field: _formOperations.DATA_TYPE_OPERATIONS[dataType] || {},
        component: _formOperations.COMPONENT_TYPE_OPERATIONS[componentType] || {}
      };
    }
    /**
     * Check if a component type has default decorators
     * @param componentType
     * @returns {boolean}
     */

  }, {
    key: "hasDefaultDecorators",
    value: function hasDefaultDecorators(componentType) {
      return Boolean(this.getDefaultDecorators(componentType));
    }
    /**
     * Get the default decorators for a component
     * @param componentType
     * @returns {}
     */

  }, {
    key: "getDefaultDecorators",
    value: function getDefaultDecorators(componentType) {
      return _formConst.COMPONENT_DECORATORS[componentType];
    }
  }]);

  return FormConfig;
}();

var _default = new FormConfig();

exports["default"] = _default;