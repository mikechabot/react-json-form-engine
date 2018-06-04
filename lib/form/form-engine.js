'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sortableMap = require('sortable-map');

var _sortableMap2 = _interopRequireDefault(_sortableMap);

var _maybeBaby = require('maybe-baby');

var _maybeBaby2 = _interopRequireDefault(_maybeBaby);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _validationService = require('../form/service/validation-service');

var _validationService2 = _interopRequireDefault(_validationService);

var _expressionService = require('../form/service/expression-service');

var _expressionService2 = _interopRequireDefault(_expressionService);

var _formApiService = require('../form/service/form-api-service');

var _formApiService2 = _interopRequireDefault(_formApiService);

var _formConfig = require('../form/config/form-config');

var _formConfig2 = _interopRequireDefault(_formConfig);

var _formValidator = require('../form/validation/form-validator');

var _formValidator2 = _interopRequireDefault(_formValidator);

var _validationResults = require('../form/validation/validation-results');

var _validationResults2 = _interopRequireDefault(_validationResults);

var _common = require('../common');

var _formConst = require('./config/form-const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FIELD = _formConst.PROPERTY.FIELD,
    DEFINITION = _formConst.PROPERTY.DEFINITION;

var FormEngine = function () {
    function FormEngine(definition, model, options) {
        _classCallCheck(this, FormEngine);

        try {
            _formApiService2.default.__validateDefinitionShape(definition);
            this.__isDefinitionValid = true;
        } catch (error) {
            this.__isDefinitionValid = false;
            this.error = error;
            return;
        }

        this.definition = definition; // Form definition
        this.decorators = definition.decorators || {}; // UI decorators

        this.showConditionTriggerMap = new _sortableMap2.default(); // Map of field ids keyed by trigger id

        this.validator = _formValidator2.default; // Form validator class
        this.validationResults = new _validationResults2.default(); // Stores validation results

        this.model = new _sortableMap2.default();
        this.sections = new _sortableMap2.default(); // Map of form sections keyed by id
        this.subsections = new _sortableMap2.default(); // Map of form subsections keyed by id
        this.fields = new _sortableMap2.default(); // Map of form fields keyed by ids

        this.__initInstance(model, options);
    }
    /**
     * Initialize the form instance
     * @private
     */


    _createClass(FormEngine, [{
        key: '__initInstance',
        value: function __initInstance(model, options) {
            this.__hydrateModel(model);
            this.__parseOptions(options);
            this.__cloneSections();
            this.__initFieldMetadata();
        }
        /**
         * Hydrate the instance mode with existing data
         * @param model
         * @private
         */

    }, {
        key: '__hydrateModel',
        value: function __hydrateModel(model) {
            var _this = this;

            if (!model || (0, _isEmpty3.default)(model)) return;

            var parsed = model;
            if (typeof model === 'string') {
                try {
                    parsed = JSON.parse(model);
                } catch (e) {
                    console.error('** FormEngine.__hydrateModel: Unable to parse JSON model!');
                    console.error('** You passed: ' + model);
                    parsed = {};
                }
            }

            Object.keys(parsed).forEach(function (key) {
                _this.model.add(key, model[key]);
            });
        }
        /**
         * Parse and apply form options
         * @param options
         * @private
         */

    }, {
        key: '__parseOptions',
        value: function __parseOptions(options) {
            if (!options) return;
            this.__liveValidation = options.liveValidation || false;
        }
        /**
         * Don't modify the original definition. Instead, clone each section
         * into a sortable map; all form instance data will then be
         * applied from these cloned sections, such as validation errors, etc.
         * @private
         */

    }, {
        key: '__cloneSections',
        value: function __cloneSections() {
            var _this2 = this;

            this.getDefinitionSections().forEach(function (section) {
                _this2.sections.add(section.id, (0, _common.__clone)(section));
            });
        }
        /**
         * Add each cloned subsection a sortable map
         * @private
         */

    }, {
        key: '__initFieldMetadata',
        value: function __initFieldMetadata() {
            var _this3 = this;

            this.sections.forEachValue(function (section) {
                section.subsections.forEach(function (subsection) {
                    subsection.section = section;
                    _this3.__decorateFields(subsection.fields);
                    _this3.subsections.add(subsection.id, subsection);
                });
            });
        }
        /**
         * Decorate an array of fields
         * @param fields
         * @private
         */

    }, {
        key: '__decorateFields',
        value: function __decorateFields(fields, parent) {
            var _this4 = this;

            if (Array.isArray(fields) && !(0, _isEmpty3.default)(fields)) {
                fields.forEach(function (field) {
                    _this4.__decorateField(field, parent);
                    _this4.__decorateFields(field[FIELD.FIELDS], field);
                    if (Array.isArray(field[FIELD.OPTIONS]) && !(0, _isEmpty3.default)(field[FIELD.OPTIONS])) {
                        field[FIELD.OPTIONS].forEach(function (option) {
                            option[FIELD.PARENT] = field;
                            _this4.__decorateFields(option[FIELD.FIELDS], option);
                        });
                    }
                });
            }
        }

        /**
         * Decorate a field with metadata such as the React component
         * to render in the UI, the onUpdate function, and any child
         * or option fields.
         * @param id
         * @param field
         * @private
         */

    }, {
        key: '__decorateField',
        value: function __decorateField(field, parent) {
            try {
                _formApiService2.default.__validateFieldShape(field);
            } catch (error) {
                this.__isDefinitionValid = false;
                this.error = error;
                return;
            }

            field[FIELD.PARENT] = parent;
            field[FIELD.UI_DECORATORS] = this.getCustomUIDecorators(field[FIELD.ID]);

            var _FormConfig$getCompon = _formConfig2.default.getComponentConfig(field[FIELD.TYPE], _formConfig2.default.getComponentTypeByField(field)),
                actions = _FormConfig$getCompon.actions,
                component = _FormConfig$getCompon.component,
                defaultDecorators = _FormConfig$getCompon.defaultDecorators;

            field[FIELD.ACTIONS] = actions;
            field[FIELD.COMPONENT] = component;

            // Apply any default decorators
            if (defaultDecorators) {
                field[FIELD.UI_DECORATORS] = _extends({}, field[FIELD.UI_DECORATORS], defaultDecorators);
            }

            // Convert string pattern to RegEx if specified
            if ((0, _isString3.default)(field[FIELD.PATTERN])) {
                field[FIELD.PATTERN] = new RegExp(field[FIELD.PATTERN]);
            }

            // Register a show condition if specified
            if (field[FIELD.SHOW_CONDITION]) {
                this.__registerShowCondition(field);
            }

            // Add the field to fields
            this.fields.add(field[FIELD.ID], field);
        }
        /**
         * Register a field's showCondition with the instance. For any
         * form response expressions within the condition, add the form
         * response id (the trigger) to the map, along with the show
         * condition. When given model value is updated in setModelValue(),
         * we check the trigger map and evaluate any available show conditions.
         * If the condition evaluates to false, the field is cleared.
         * @param field
         */

    }, {
        key: '__registerShowCondition',
        value: function __registerShowCondition(field) {
            var _this5 = this;

            var _field$showCondition = field.showCondition,
                expression = _field$showCondition.expression,
                expression1 = _field$showCondition.expression1,
                expression2 = _field$showCondition.expression2;

            [expression, expression1, expression2].forEach(function (_expression) {
                if (_expressionService2.default.isFormResponseExpression(_expression)) {
                    var list = _this5.showConditionTriggerMap.find(_expression.id);
                    if (!list) {
                        list = [];
                        _this5.showConditionTriggerMap.add(_expression.id, list);
                    }
                    list.push(field[FIELD.ID]);
                }
            });
        }
        /**
         * Get form title
         * @returns {*}
         */

    }, {
        key: 'getFormTitle',
        value: function getFormTitle() {
            return this.getDefinition().title;
        }
        /**
         * Get form icon
         * @returns {*}
         */

    }, {
        key: 'getFormIcon',
        value: function getFormIcon() {
            return _maybeBaby2.default.of(this.definition).prop('faIcon').prop('name').join();
        }
        /**
         * Get form icon prefix
         * @returns {*}
         */

    }, {
        key: 'getFormIconPrefix',
        value: function getFormIconPrefix() {
            return _maybeBaby2.default.of(this.definition).prop('faIcon').prop('prefix').join();
        }
        /**
         * Return whether the form consists only
         * of one section and one subsection
         */

    }, {
        key: 'isSimpleForm',
        value: function isSimpleForm() {
            return this.getSections().count() === 1 && this.getSubsections().count() === 1;
        }
        /**
         * Return whether the form is valid
         * @returns {boolean}
         */

    }, {
        key: 'isValid',
        value: function isValid() {
            return this.__isDefinitionValid;
        }
        /**
         * Get form error
         * @returns {*}
         */

    }, {
        key: 'getError',
        value: function getError() {
            return this.error;
        }
        /**
         * Get form definition
         * @returns {*}
         */

    }, {
        key: 'getDefinition',
        value: function getDefinition() {
            return this.definition;
        }
        /**
         * Get the form definition id
         */

    }, {
        key: 'getId',
        value: function getId() {
            return this.getDefinition()[DEFINITION.ID];
        }
        /**
         * Get form model
         * @returns {SortableMap}
         */

    }, {
        key: 'getModel',
        value: function getModel() {
            return this.model;
        }
        /**
         * Get form model values
         * @returns {*}
         */

    }, {
        key: 'getModelValues',
        value: function getModelValues() {
            return this.model.findAll();
        }

        /**
         * Serialize the model to json
         * @returns {string}
         */

    }, {
        key: 'serializeModel',
        value: function serializeModel() {
            var store = {};
            this.getModelValues().forEach(function (entry) {
                store[entry.key] = entry.value;
            });
            return JSON.stringify(store);
        }
        /**
         * Get single model value (e.g. form response)
         * @param id
         */

    }, {
        key: 'getModelValue',
        value: function getModelValue(id) {
            return this.model.find(id);
        }
        /**
         * Determine if the model contains a key
         * @param id
         * @returns {LoDashExplicitWrapper<boolean>|boolean|Assertion}
         */

    }, {
        key: 'hasModelValue',
        value: function hasModelValue(id) {
            return this.model.has(id);
        }
        /**
         * Get form decorators
         * @returns {*|decorators|{str2, str3, str4}|{}}
         */

    }, {
        key: 'getDecorators',
        value: function getDecorators() {
            return this.decorators;
        }
        /**
         * Get UI decorator by field id
         * @param id
         * @returns {*}
         */

    }, {
        key: 'getCustomUIDecorators',
        value: function getCustomUIDecorators(id) {
            return this.getDecorators()[id];
        }
        /**
         * Get sections from the definition
         * @returns {*|Array|sections|{id, title, subtitle, sortOrder, subsections}}
         */

    }, {
        key: 'getDefinitionSections',
        value: function getDefinitionSections() {
            return this.getDefinition().sections;
        }
        /**
         * Get form sections
         * @returns {SortableMap|*}
         */

    }, {
        key: 'getSections',
        value: function getSections() {
            return this.sections;
        }
        /**
         * Get single form section
         * @param id
         * @returns {*}
         */

    }, {
        key: 'getSection',
        value: function getSection(id) {
            return this.getSections().find(id);
        }
        /**
         * Get form subsections
         * @returns {SortableMap|*}
         */

    }, {
        key: 'getSubsections',
        value: function getSubsections() {
            return this.subsections;
        }
        /**
         * Get single form subsection
         * @param id
         * @returns {*}
         */

    }, {
        key: 'getSubsection',
        value: function getSubsection(id) {
            return this.getSubsections().find(id);
        }
        /**
         * Get form fields
         * @returns {SortableMap|*}
         */

    }, {
        key: 'getFields',
        value: function getFields() {
            return this.fields;
        }
        /**
         * Get single form field
         * @param id
         * @returns {*}
         */

    }, {
        key: 'getField',
        value: function getField(id) {
            return this.getFields().find(id);
        }

        /**
         * Get all subsection fields (including conditional children)
         * @param subsection
         */

    }, {
        key: 'getAllSubsectionFields',
        value: function getAllSubsectionFields(subsection) {
            if (!subsection || (0, _isEmpty3.default)(subsection.fields)) {
                return [];
            }
            return this.__buildFlatFieldList([], subsection.fields);
        }
        /**
         * Detemrine if the field is a boolen data type
         * @param field
         * @returns {boolean}
         */

    }, {
        key: 'isBooleanField',
        value: function isBooleanField(field) {
            return field[FIELD.TYPE] === _formConst.DATA_TYPE.BOOLEAN;
        }
        /**
         * Set a model value
         * @param id
         * @param value
         * @param field
         */

    }, {
        key: 'setModelValue',
        value: function setModelValue(id, value, field) {
            var _this6 = this;

            // Set or reset the model value
            if (value === this.getModelValue(id)) return;

            if (value === _formConst.NO_VALUE) {
                field.dirty = false;
                this.model.delete(id);
            } else {
                field.dirty = true;
                this.model.add(id, value);
            }

            // Reset children if necessary
            if (this.doResetChildren(field, value)) {
                this.resetFields(field[FIELD.FIELDS]);
            }
            // Reset the children of any option fields if the option is not selected
            (0, _forEach3.default)(field[FIELD.OPTIONS], function (option) {
                if (option[FIELD.FIELDS] && (_this6.isBooleanField(field) && !value || !(0, _includes3.default)(value, option[FIELD.ID]))) {
                    _this6.resetFields(option[FIELD.FIELDS]);
                }
            });

            // Evaluate the show condition of dependent fields if this field is a trigger
            if (this.showConditionTriggerMap.has(id)) {
                this.showConditionTriggerMap.find(id).forEach(function (fieldId) {
                    if (_this6.hasModelValue(fieldId) && !_this6.evaluateFieldShowCondition(_this6.getField(fieldId))) {
                        _this6.setModelValue(fieldId, _formConst.NO_VALUE, _this6.getField(fieldId));
                    }
                });
            }
        }
        /**
         * Reset a specific list of fields, if they contain a model value
         * @param fields
         */

    }, {
        key: 'resetFields',
        value: function resetFields(fields) {
            var _this7 = this;

            (0, _forEach3.default)(fields, function (field) {
                if (_this7.hasModelValue(field[FIELD.ID])) {
                    _this7.setModelValue(field[FIELD.ID], _formConst.NO_VALUE, field);
                }
            });
        }
        /**
         * Determine whether to clear the children of a given field
         * based on its value
         * @param field
         * @param value
         * @returns {*}
         */

    }, {
        key: 'doResetChildren',
        value: function doResetChildren(field, value) {
            if (!field[FIELD.FIELDS]) return false;
            switch (field[FIELD.TYPE]) {
                case _formConst.DATA_TYPE.DATE:
                    return !(0, _common.__hasValue)(value);
                case _formConst.DATA_TYPE.NUMBER:
                    return Number.isNaN(value);
                case _formConst.DATA_TYPE.BOOLEAN:
                    return value === false;
                case _formConst.DATA_TYPE.STRING:
                    return (0, _common.__isBlank)(value);
                case _formConst.DATA_TYPE.ARRAY:
                    return (0, _isEmpty3.default)(value);
                default:
                    {
                        console.warn('Unmapped field type: ' + field[FIELD.TYPE] + ' (id: ' + field[FIELD.ID] + ')');
                        return false;
                    }
            }
        }
        /**
         * Evaluate the show condition of the field
         * @param field
         * @param tag
         * @returns {*}
         */

    }, {
        key: 'evaluateFieldShowCondition',
        value: function evaluateFieldShowCondition(field) {
            if (!field.showCondition) return true;
            return this.evaluateCondition(field.showCondition);
        }
        /**
         * Evaluate a condition
         * @param condition
         * @returns {*}
         */

    }, {
        key: 'evaluateCondition',
        value: function evaluateCondition(condition) {
            if (!condition) return false;
            return _expressionService2.default.evalCondition(condition, this);
        }
    }, {
        key: 'isLiveValidation',
        value: function isLiveValidation() {
            return this.__liveValidation;
        }
    }, {
        key: 'validate',
        value: function validate() {
            this.validationResults.clear();
            this.validator.validate(this, this.validationResults);
            this.validationResults.postProcess();
        }
    }, {
        key: 'hasError',
        value: function hasError() {
            return this.validationResults.hasError();
        }
    }, {
        key: 'getValidationResults',
        value: function getValidationResults() {
            return this.validationResults;
        }
    }, {
        key: 'getValidationResultByTag',
        value: function getValidationResultByTag(id) {
            return this.validationResults.getResults(id);
        }
    }, {
        key: 'getValidationStatusByTag',
        value: function getValidationStatusByTag(id, doNotRecurse) {
            var _this8 = this;

            var status = this.getValidationResultByTag(id).status;
            if (doNotRecurse) {
                return status;
            }

            var field = this.getField(id);
            (0, _forEach3.default)(field.fields, function (child, index) {
                var newStatus = _this8.findStatus(field.fields, _this8.getValidationStatusByTag.bind(_this8), true);
                if (_validationService2.default.isMoreSevereStatus(newStatus, status)) {
                    status = newStatus;
                }
            });

            return status;
        }
    }, {
        key: 'findStatus',
        value: function findStatus(list, getStatus, useId) {
            var status = _formConst.VALIDATION_CONST.STATUS.OK;
            (0, _forEach3.default)(list, function (entry) {
                var newStatus = getStatus(useId ? entry[FIELD.ID] : entry);
                if (_validationService2.default.isMoreSevereStatus(newStatus, status)) {
                    status = newStatus;
                }
            });
            return status;
        }
    }, {
        key: 'getSubsectionStatus',
        value: function getSubsectionStatus(subsection) {
            return this.findStatus(subsection.fields, this.getValidationStatusByTag.bind(this), true);
        }
    }, {
        key: 'getSectionStatus',
        value: function getSectionStatus(section) {
            return this.findStatus(section.subsections, this.getSubsectionStatus.bind(this));
        }
    }, {
        key: 'fieldHasError',
        value: function fieldHasError(id) {
            return _validationService2.default.isError(this.getValidationStatusByTag(id, true));
        }
    }, {
        key: 'subsectionHasError',
        value: function subsectionHasError(subsection) {
            return _validationService2.default.isError(this.getSubsectionStatus(subsection));
        }
    }, {
        key: 'sectionHasError',
        value: function sectionHasError(section) {
            return _validationService2.default.isError(this.getSectionStatus(section));
        }
    }, {
        key: '__buildFlatFieldList',
        value: function __buildFlatFieldList() {
            var _this9 = this;

            var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var fields = arguments[1];

            if (fields) {
                fields.forEach(function (field) {
                    list.push(Object.assign({}, (0, _omit3.default)(field, _formConst.PROPERTY.FIELDS, _formConst.PROPERTY.OPTIONS)));
                    if (field.fields) {
                        _this9.__buildFlatFieldList(list, field.fields);
                    }
                    if (field.options) {
                        field.options.forEach(function (option) {
                            if (option.fields) {
                                _this9.__buildFlatFieldList(list, option.fields);
                            }
                        });
                    }
                });
            }
            return list;
        }
    }]);

    return FormEngine;
}();

exports.default = FormEngine;