'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _zipObject2 = require('lodash/zipObject');

var _zipObject3 = _interopRequireDefault(_zipObject2);

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _maybeBaby = require('maybe-baby');

var _maybeBaby2 = _interopRequireDefault(_maybeBaby);

var _formConst = require('./form-const');

var _formOperations = require('./form-operations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var COMPONENT_CONFIGS = 'componentConfigs';

/**
 * The FormEngine is capable of storing various data types in the instance model (e.g. string, number, date).
 * And for each given data type, there is a set form controls available to the UI. For instance, if a field is
 * of type "array" it can be rendered as a checkbox group, or select dropdown. A "number" type can be displayed
 * as a standard number input, or a range slider.
 *
 */

var FormConfig = function () {
    function FormConfig() {
        var _registerDataType, _registerDataType2, _registerDataType3, _registerDataType5;

        _classCallCheck(this, FormConfig);

        this.typeConfigs = {};
        this.__registerDataType(_formConst.DATA_TYPE.STRING, (_registerDataType = {}, _defineProperty(_registerDataType, _formConst.COMPONENT_TYPE.TEXT, require('../../components/form/controls/Text').default), _defineProperty(_registerDataType, _formConst.COMPONENT_TYPE.PASSWORD, require('../../components/form/controls/Text').default), _defineProperty(_registerDataType, _formConst.COMPONENT_TYPE.TEXTAREA, require('../../components/form/controls/Textarea').default), _defineProperty(_registerDataType, _formConst.COMPONENT_TYPE.SELECT, require('../../components/form/controls/Select').default), _defineProperty(_registerDataType, _formConst.COMPONENT_TYPE.RADIO, require('../../components/form/controls/Radio').default), _registerDataType));
        this.__registerDataType(_formConst.DATA_TYPE.BOOLEAN, (_registerDataType2 = {}, _defineProperty(_registerDataType2, _formConst.COMPONENT_TYPE.CHECKBOX, require('../../components/form/controls/Checkbox').default), _defineProperty(_registerDataType2, _formConst.COMPONENT_TYPE.RADIO, require('../../components/form/controls/Radio').default), _registerDataType2));
        this.__registerDataType(_formConst.DATA_TYPE.NUMBER, (_registerDataType3 = {}, _defineProperty(_registerDataType3, _formConst.COMPONENT_TYPE.NUMBER, require('../../components/form/controls/Number').default), _defineProperty(_registerDataType3, _formConst.COMPONENT_TYPE.RANGE, require('../../components/form/controls/Range').default), _registerDataType3));
        this.__registerDataType(_formConst.DATA_TYPE.DATE, _defineProperty({}, _formConst.COMPONENT_TYPE.DATE, require('../../components/form/controls/DateTime').default));
        this.__registerDataType(_formConst.DATA_TYPE.ARRAY, (_registerDataType5 = {}, _defineProperty(_registerDataType5, _formConst.COMPONENT_TYPE.SELECT, require('../../components/form/controls/Select').default), _defineProperty(_registerDataType5, _formConst.COMPONENT_TYPE.CHECKBOXGROUP, require('../../components/form/controls/CheckboxGroup').default), _registerDataType5));
    }

    _createClass(FormConfig, [{
        key: '__registerDataType',
        value: function __registerDataType(type, components) {
            var _this = this;

            this.typeConfigs[type] = _defineProperty({
                type: type
            }, COMPONENT_CONFIGS, (0, _zipObject3.default)((0, _keys3.default)(components), (0, _map3.default)(components, function (component, key) {
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
        key: 'getTypeConfig',
        value: function getTypeConfig(type) {
            if (!type) throw new Error('Type cannot be null/undefined');
            if (this.typeConfigs[type]) {
                return this.typeConfigs[type];
            }
            console.warn('Unmapped data type: ' + type);
        }
        /**
         * Given a data type, Return a map of React components keyed by component type
         * @param dataType
         * @returns {TResult|_.Dictionary<any>|Object|*}
         */

    }, {
        key: 'getComponentConfigsByDataType',
        value: function getComponentConfigsByDataType(dataType) {
            var typeConfig = this.getTypeConfig(dataType);
            if (typeConfig) return this.getComponentConfigsByTypeConfig(typeConfig);
            console.warn('Unmapped data type: ' + dataType);
        }
    }, {
        key: 'getComponentConfigsByTypeConfig',
        value: function getComponentConfigsByTypeConfig(typeConfig) {
            if (typeConfig && typeConfig[COMPONENT_CONFIGS]) {
                return typeConfig[COMPONENT_CONFIGS];
            }
            console.warn('Unmapped type config: ' + typeConfig);
        }
    }, {
        key: 'getComponentConfig',
        value: function getComponentConfig(dataType, componentType) {
            var components = this.getComponentConfigsByDataType(dataType);
            if (components && components[componentType]) {
                return components[componentType];
            }
            console.warn('Unmapped component type "' + componentType + '" for data type: "' + dataType + '"');
        }
    }, {
        key: 'getComponentTypeByField',
        value: function getComponentTypeByField(field) {
            if (!field) throw new Error('field is required');
            if (this.hasComponentDecorator(field)) {
                return this.getComponentDecorator(field);
            }
            return this.getDefaultComponentTypeByDataType(field);
        }
    }, {
        key: 'getDefaultComponentTypeByDataType',
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
                default:
                    {
                        console.warn('Unmapped data type: "' + field.type + '"');
                    }
            }
        }
    }, {
        key: 'hasComponentDecorator',
        value: function hasComponentDecorator(field) {
            return _maybeBaby2.default.of(field).prop('uiDecorators').prop('component').prop('type').isJust();
        }
    }, {
        key: 'getComponentDecorator',
        value: function getComponentDecorator(field) {
            return _maybeBaby2.default.of(field).prop('uiDecorators').prop('component').prop('type').join();
        }
    }, {
        key: 'hasOptions',
        value: function hasOptions(field) {
            return _maybeBaby2.default.of(field).prop('options').isJust();
        }
    }, {
        key: '_getOperation',
        value: function _getOperation(fieldType, componentType, operation) {
            var _getOperations2 = this._getOperations(fieldType, componentType),
                field = _getOperations2.field,
                component = _getOperations2.component;

            if (component && component[operation]) {
                return component[operation];
            } else if (field && field[operation]) {
                return field[operation];
            }
            console.warn('Unmapped operations for field/component type: ' + fieldType + '/' + componentType);
        }
    }, {
        key: '_getOperations',
        value: function _getOperations(fieldType, componentType) {
            return {
                field: _formOperations.DATA_TYPE_OPERATIONS[fieldType],
                component: _formOperations.COMPONENT_OPERATIONS[componentType]
            };
        }
    }, {
        key: '_hasDecorators',
        value: function _hasDecorators(componentType) {
            return !!this._getDefaultDecorators(componentType);
        }
    }, {
        key: '_getDefaultDecorators',
        value: function _getDefaultDecorators(componentType) {
            return _formConst.COMPONENT_DECORATORS[componentType];
        }
    }]);

    return FormConfig;
}();

exports.default = new FormConfig();