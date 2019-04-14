"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sortableMap = _interopRequireDefault(require("sortable-map"));

var _maybeBaby = _interopRequireDefault(require("maybe-baby"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _includes = _interopRequireDefault(require("lodash/includes"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _get = _interopRequireDefault(require("lodash/get"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _validationService = _interopRequireDefault(require("./service/validation-service"));

var _expressionService = _interopRequireDefault(require("./service/expression-service"));

var _formApiService = _interopRequireDefault(require(".//service/form-api-service"));

var _formConfig = _interopRequireDefault(require("./config/form-config"));

var _formValidator = _interopRequireDefault(require("./validation/form-validator"));

var _validationResults = _interopRequireDefault(require("./validation/validation-results"));

var _common = require("../common");

var _formConst = require("./config/form-const");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FIELD = _formConst.PROPERTY.FIELD,
    DEFINITION = _formConst.PROPERTY.DEFINITION;

var FormEngine =
/*#__PURE__*/
function () {
  function FormEngine(definition, model) {
    _classCallCheck(this, FormEngine);

    try {
      _formApiService.default.__validateDefinitionShape(definition);

      this.__isDefinitionValid = true;
    } catch (error) {
      this.__isDefinitionValid = false;
      this.error = error;
      return;
    }

    this.definition = definition; // Form definition

    this.decorators = definition.decorators || {}; // UI decorators

    this.showConditionTriggerMap = new _sortableMap.default(); // Map of field ids keyed by trigger id

    this.validationResults = new _validationResults.default(); // Stores validation results

    this.model = new _sortableMap.default(); // Map of form responses keyed by id

    this.sections = new _sortableMap.default(); // Map of form sections keyed by id

    this.subsections = new _sortableMap.default(); // Map of form subsections keyed by id

    this.fields = new _sortableMap.default(); // Map of form fields keyed by ids

    this.__initInstance(model);
  }
  /**
   * Initialize the form instance
   * @private
   */


  _createClass(FormEngine, [{
    key: "__initInstance",
    value: function __initInstance(model) {
      this.__hydrateModel(model);

      this.__cloneSections();

      this.__initFieldMetadata();
    }
    /**
     * Hydrate the instance mode with existing data
     * @param model
     * @private
     */

  }, {
    key: "__hydrateModel",
    value: function __hydrateModel(model) {
      var _this = this;

      if (!model || (0, _isEmpty.default)(model)) return;
      var parsed = model;

      if (typeof model === 'string') {
        try {
          parsed = JSON.parse(model);
        } catch (e) {
          console.error('** FormEngine.__hydrateModel: Unable to parse JSON model!');
          console.error("** You passed: ".concat(model));
          parsed = {};
        }
      }

      Object.keys(parsed).forEach(function (key) {
        _this.model.add(key, model[key]);
      });
    }
    /**
     * Don't modify the original definition. Instead, clone each section
     * into a sortable map; all form instance data will then be
     * applied from these cloned sections, such as validation errors, etc.
     * @private
     */

  }, {
    key: "__cloneSections",
    value: function __cloneSections() {
      var _this2 = this;

      this.getDefinitionSections().forEach(function (section) {
        _this2.sections.add(section.id, (0, _common.clone)(section));
      });
    }
    /**
     * Add each cloned subsection a sortable map
     * @private
     */

  }, {
    key: "__initFieldMetadata",
    value: function __initFieldMetadata() {
      var _this3 = this;

      this.sections.forEachValue(function (section) {
        section.subsections.forEach(function (subsection) {
          subsection.section = section;
          subsection.fieldIds = _this3.buildDeepFieldIdList([], subsection.fields);

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
    key: "__decorateFields",
    value: function __decorateFields(fields, parent) {
      var _this4 = this;

      if (Array.isArray(fields) && !(0, _isEmpty.default)(fields)) {
        fields.forEach(function (field) {
          _this4.__decorateField(field, parent);

          _this4.__decorateFields(field[FIELD.FIELDS], field);

          if (Array.isArray(field[FIELD.OPTIONS]) && !(0, _isEmpty.default)(field[FIELD.OPTIONS])) {
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
    key: "__decorateField",
    value: function __decorateField(field, parent) {
      try {
        _formApiService.default.__validateFieldShape(field);
      } catch (error) {
        this.__isDefinitionValid = false;
        this.error = error;
        return;
      }

      field[FIELD.PARENT] = parent;
      field[FIELD.UI_DECORATORS] = this.getCustomUIDecorators(field[FIELD.ID]);

      var _FormConfig$getCompon = _formConfig.default.getComponentConfig(field[FIELD.TYPE], _formConfig.default.getComponentTypeByField(field)),
          actions = _FormConfig$getCompon.actions,
          component = _FormConfig$getCompon.component,
          defaultDecorators = _FormConfig$getCompon.defaultDecorators;

      field[FIELD.ACTIONS] = actions;
      field[FIELD.COMPONENT] = component; // Apply any default decorators

      if (defaultDecorators) {
        field[FIELD.UI_DECORATORS] = _objectSpread({}, field[FIELD.UI_DECORATORS], defaultDecorators);
      } // Convert string pattern to RegEx if specified


      if ((0, _isString.default)(field[FIELD.PATTERN])) {
        field[FIELD.PATTERN] = new RegExp(field[FIELD.PATTERN]);
      } // Register a show condition if specified


      if (field[FIELD.SHOW_CONDITION]) {
        this.__registerShowCondition(field);
      } // Add the field to fields


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
    key: "__registerShowCondition",
    value: function __registerShowCondition(field) {
      var _this5 = this;

      var _field$showCondition = field.showCondition,
          expression = _field$showCondition.expression,
          expression1 = _field$showCondition.expression1,
          expression2 = _field$showCondition.expression2;
      [expression, expression1, expression2].forEach(function (_expression) {
        if (_expressionService.default.isFormResponseExpression(_expression)) {
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
    key: "getFormTitle",
    value: function getFormTitle() {
      return this.getDefinition().title;
    }
    /**
     * Get form icon
     * @returns {*}
     */

  }, {
    key: "getFormIcon",
    value: function getFormIcon() {
      return _maybeBaby.default.of(this.definition).prop('faIcon').prop('name').join();
    }
    /**
     * Get form icon prefix
     * @returns {*}
     */

  }, {
    key: "getFormIconPrefix",
    value: function getFormIconPrefix() {
      return _maybeBaby.default.of(this.definition).prop('faIcon').prop('prefix').join();
    }
    /**
     * Return whether the form consists only
     * of one section and one subsection
     */

  }, {
    key: "isSimpleForm",
    value: function isSimpleForm() {
      return this.getSections().count() === 1 && this.getSubsections().count() === 1;
    }
    /**
     * Return whether the form is valid
     * @returns {boolean}
     */

  }, {
    key: "isValid",
    value: function isValid() {
      return this.__isDefinitionValid;
    }
    /**
     * Get form error
     * @returns {*}
     */

  }, {
    key: "getError",
    value: function getError() {
      return this.error;
    }
    /**
     * Get form definition
     * @returns {*}
     */

  }, {
    key: "getDefinition",
    value: function getDefinition() {
      return this.definition;
    }
    /**
     * Get the form definition id
     */

  }, {
    key: "getId",
    value: function getId() {
      return this.getDefinition()[DEFINITION.ID];
    }
    /**
     * Get form model
     * @returns {SortableMap}
     */

  }, {
    key: "getModel",
    value: function getModel() {
      return this.model;
    }
    /**
     * Get form model values
     * @returns {*}
     */

  }, {
    key: "getModelValues",
    value: function getModelValues() {
      return this.model.findAll();
    }
    /**
     * Serialize the model to json
     * @returns {string}
     */

  }, {
    key: "serializeModel",
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
    key: "getModelValue",
    value: function getModelValue(id) {
      return this.model.find(id);
    }
    /**
     * Determine if the model contains a key
     * @param id
     * @returns {LoDashExplicitWrapper<boolean>|boolean|Assertion}
     */

  }, {
    key: "hasModelValue",
    value: function hasModelValue(id) {
      return this.model.has(id);
    }
    /**
     * Get form decorators
     * @returns {*|decorators|{str2, str3, str4}|{}}
     */

  }, {
    key: "getDecorators",
    value: function getDecorators() {
      return this.decorators;
    }
    /**
     * Get UI decorator by field id
     * @param id
     * @returns {*}
     */

  }, {
    key: "getCustomUIDecorators",
    value: function getCustomUIDecorators(id) {
      return this.getDecorators()[id];
    }
    /**
     * Get sections from the definition
     * @returns {*|Array|sections|{id, title, subtitle, sortOrder, subsections}}
     */

  }, {
    key: "getDefinitionSections",
    value: function getDefinitionSections() {
      return this.getDefinition().sections;
    }
    /**
     * Get form sections
     * @returns {SortableMap|*}
     */

  }, {
    key: "getSections",
    value: function getSections() {
      return this.sections;
    }
    /**
     * Get single form section
     * @param id
     * @returns {*}
     */

  }, {
    key: "getSection",
    value: function getSection(id) {
      return this.getSections().find(id);
    }
    /**
     * Get form subsections
     * @returns {SortableMap|*}
     */

  }, {
    key: "getSubsections",
    value: function getSubsections() {
      return this.subsections;
    }
    /**
     * Get single form subsection
     * @param id
     * @returns {*}
     */

  }, {
    key: "getSubsection",
    value: function getSubsection(id) {
      return this.getSubsections().find(id);
    }
    /**
     * Get form fields
     * @returns {SortableMap|*}
     */

  }, {
    key: "getFields",
    value: function getFields() {
      return this.fields;
    }
    /**
     * Get single form field
     * @param id
     * @returns {*}
     */

  }, {
    key: "getField",
    value: function getField(id) {
      return this.getFields().find(id);
    }
    /**
     * Get all subsection fields id (including conditional children)
     * @param subsection
     */

  }, {
    key: "getSubsectionFieldIds",
    value: function getSubsectionFieldIds(subsection) {
      return subsection.fieldIds;
    }
    /**
     * Determine if the field is a boolean data type
     * @param field
     * @returns {boolean}
     */

  }, {
    key: "isBooleanField",
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
    key: "setModelValue",
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
      } // Reset children if necessary


      if (this.doResetChildren(field, value)) {
        this.resetFields(field[FIELD.FIELDS]);
      } // Reset the children of any option fields if the option is not selected


      if (field[FIELD.OPTIONS]) {
        field[FIELD.OPTIONS].forEach(function (option) {
          if (option[FIELD.FIELDS] && (_this6.isBooleanField(field) && !value || !(0, _includes.default)(value, option[FIELD.ID]))) {
            _this6.resetFields(option[FIELD.FIELDS]);
          }
        });
      } // Evaluate the show condition of dependent fields if this field is a trigger


      if (this.showConditionTriggerMap.has(id)) {
        this.showConditionTriggerMap.find(id).forEach(function (fieldId) {
          if (_this6.hasModelValue(fieldId) && !_this6.isVisible(_this6.getField(fieldId))) {
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
    key: "resetFields",
    value: function resetFields(fields) {
      var _this7 = this;

      if (fields) {
        fields.forEach(function (field) {
          if (_this7.hasModelValue(field[FIELD.ID]) && !_this7.isVisible(field)) {
            _this7.setModelValue(field[FIELD.ID], _formConst.NO_VALUE, field);
          }
        });
      }
    }
    /**
     * Determine whether to clear the children of a given field
     * based on its value
     * @param field
     * @param value
     * @returns {*}
     */

  }, {
    key: "doResetChildren",
    value: function doResetChildren(field, value) {
      if (!field[FIELD.FIELDS]) return false;

      switch (field[FIELD.TYPE]) {
        case _formConst.DATA_TYPE.DATE:
          return (0, _isNil.default)(value);

        case _formConst.DATA_TYPE.NUMBER:
          return Number.isNaN(value);

        case _formConst.DATA_TYPE.BOOLEAN:
          return value === false;

        case _formConst.DATA_TYPE.STRING:
          return (0, _common.__isBlank)(value);

        case _formConst.DATA_TYPE.ARRAY:
          return (0, _isEmpty.default)(value);

        default:
          {
            console.warn("Unmapped field type: ".concat(field[FIELD.TYPE], " (id: ").concat(field[FIELD.ID], ")"));
            return false;
          }
      }
    }
  }, {
    key: "hasShowCondition",
    value: function hasShowCondition(field) {
      return Boolean(field[FIELD.SHOW_CONDITION]);
    }
    /**
     * Evaluate the show condition of the field
     * @param field
     * @param tag
     * @returns {*}
     */

  }, {
    key: "isVisible",
    value: function isVisible(field) {
      if (!this.hasShowCondition(field)) return true;
      return this.evaluateCondition(field[FIELD.SHOW_CONDITION]);
    }
    /**
     * Evaluate a condition
     * @param condition
     * @returns {*}
     */

  }, {
    key: "evaluateCondition",
    value: function evaluateCondition(condition) {
      if (!condition) return false;
      return _expressionService.default.evalCondition(condition, this);
    }
  }, {
    key: "validate",
    value: function validate() {
      this.validationResults = _formValidator.default.validate(this, this.validationResults);
      console.log(this.validationResults);
    }
  }, {
    key: "validateOnSubmit",
    value: function validateOnSubmit() {
      this.validationResults = _formValidator.default.validate(this, this.validationResults, true);
      console.log(this.validationResults);
    }
  }, {
    key: "hasError",
    value: function hasError() {
      return this.validationResults.hasError();
    }
  }, {
    key: "getValidationResults",
    value: function getValidationResults() {
      return this.validationResults;
    }
  }, {
    key: "getValidationResultByTag",
    value: function getValidationResultByTag(id) {
      return this.validationResults.getResults(id);
    }
  }, {
    key: "getValidationStatusByTag",
    value: function getValidationStatusByTag(id) {
      return this.getValidationResultByTag(id).status;
    }
  }, {
    key: "getDeepValidationStatusByTag",
    value: function getDeepValidationStatusByTag(id) {
      var status = this.getValidationResultByTag(id).status;
      var newStatus = this.findStatus(this.getField(id)[FIELD.FIELDS], this.getDeepValidationStatusByTag.bind(this), true);

      if (_validationService.default.isMoreSevereStatus(newStatus, status)) {
        status = newStatus;
      }

      return status;
    }
  }, {
    key: "findStatus",
    value: function findStatus() {
      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var getStatus = arguments.length > 1 ? arguments[1] : undefined;
      var useId = arguments.length > 2 ? arguments[2] : undefined;
      var status = _formConst.VALIDATION_CONST.STATUS.OK;
      list.forEach(function (entry) {
        var newStatus = getStatus(useId ? entry[FIELD.ID] : entry);

        if (_validationService.default.isMoreSevereStatus(newStatus, status)) {
          status = newStatus;
        }
      });
      return status;
    }
  }, {
    key: "getSubsectionStatus",
    value: function getSubsectionStatus(subsection) {
      return this.findStatus(subsection.fields, this.getDeepValidationStatusByTag.bind(this), true);
    }
  }, {
    key: "getSectionStatus",
    value: function getSectionStatus(section) {
      return this.findStatus(section.subsections, this.getSubsectionStatus.bind(this));
    }
  }, {
    key: "fieldHasError",
    value: function fieldHasError(id) {
      return _validationService.default.isError(this.getValidationStatusByTag(id));
    }
  }, {
    key: "subsectionHasError",
    value: function subsectionHasError(subsection) {
      return _validationService.default.isError(this.getSubsectionStatus(subsection));
    }
  }, {
    key: "sectionHasError",
    value: function sectionHasError(section) {
      return _validationService.default.isError(this.getSectionStatus(section));
    }
  }, {
    key: "buildDeepFieldIdList",
    value: function buildDeepFieldIdList() {
      var _this8 = this;

      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      fields.forEach(function (field) {
        list.push(field[FIELD.ID]);

        _this8.buildDeepFieldIdList(list, field[FIELD.FIELDS]);

        (0, _get.default)(field, FIELD.OPTIONS, []).forEach(function (option) {
          _this8.buildDeepFieldIdList(list, option[FIELD.OPTIONS]);
        });
      });
      return list;
    }
  }]);

  return FormEngine;
}();

var _default = FormEngine;
exports.default = _default;