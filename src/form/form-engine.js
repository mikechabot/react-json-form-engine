import _ from 'lodash';
import SortableMap from 'sortable-map';
import FormConfig from '../form/config/form-config';
import FormValidator from '../form/validation/form-validator';
import ValidationResults from '../form/validation/validation-results';
import ExpressionService from '../form/service/expression-service';
import Maybe from 'maybe-baby';
import ValidationService from '../form/service/validation-service';
import { __clone, __blank, hasValue } from '../common/common';
import { NO_VALUE, PROPERTY, DATA_TYPE } from './config/form-const';
const apiCheck = require('api-check')({output: { prefix: 'FormEngine:' }});

const { FIELD, SECTION, SUBSECTION, DEFINITION, CALCULATIONS } = PROPERTY;

export default class FormEngine {
    constructor (definition, model) {
        try {
            this._validateDefinition(definition);           // Throw error on misshapen definition
            this.__isValid = true;
        } catch (error) {
            this.__isValid = false;
            this.error = error;
            return;
        }

        this.definition = definition;                       // Form definition
        this.decorators = definition.decorators || {};      // UI decorators
        this.model = new SortableMap();                     // Map of form responses keyed by field id

        this.showConditionTriggerMap = new SortableMap();   // Map of field ids keyed by trigger id

        this.validator = FormValidator;                     // Form validator class
        this.validationResults = new ValidationResults();   // Stores validation results

        this.sections = new SortableMap();                  // Map of form sections keyed by id
        this.subsections = new SortableMap();               // Map of form subsections keyed by id
        this.fields = new SortableMap();                    // Map of form fields keyed by ids

        this.__initInstance();
    }

    /**
     * Initialize the form instance
     * @private
     */
    __initInstance () {
        this.__cloneSections();
        this.__initFieldMetadata();
    }
    /**
     * Don't modify the original definition. Instead, clone each section
     * into a sortable map; all form instance data will then be
     * applied from these cloned sections, such as validation errors, etc.
     * @private
     */
    __cloneSections () {
        this.getDefinitionSections().forEach(section => {
            this.sections.add(section.id, __clone(section));
        });
    }
    /**
     * Add each cloned subsection a sortable map
     * @private
     */
    __initFieldMetadata () {
        this.sections.forEachValue(section => {
            section.subsections.forEach(subsection => {
                subsection.section = section;
                this.__decorateFields(subsection.fields);
                this.subsections.add(subsection.id, subsection);
            });
        });
    }
    /**
     * Decorate an array of fields
     * @param fields
     * @private
     */
    __decorateFields (fields, parent) {
        _.forEach(fields, field => {
            this.__decorateField(field, parent);
            if (field.fields) {
                this.__decorateFields(field.fields, field);
            }
            _.forEach(field.options, option => {
                option.parent = field;
                if (option.fields) {
                    this.__decorateFields(option.fields, option);
                }
            });
        });
    }

    /**
     * Decorate a field with metadata such as the React component
     * to render in the UI, the onUpdate function, and any child
     * or option fields.
     * @param id
     * @param field
     * @private
     */
    __decorateField (field, parent) {
        this._validateField(field);

        field[FIELD.PARENT] = parent;
        field[FIELD.UI_DECORATORS] = this.getCustomUIDecorators(field[FIELD.ID]);

        const { actions, component, defaultDecorators } = FormConfig.getComponentConfig(
            field[FIELD.TYPE], FormConfig.getComponentTypeByField(field)
        );

        field[FIELD.ACTIONS] = actions;
        field[FIELD.COMPONENT] = component;

        // Apply any default decorators
        if (defaultDecorators) {
            field[FIELD.UI_DECORATORS] = {
                ...field[FIELD.UI_DECORATORS],
                ...defaultDecorators
            };
        }

        // Convert string pattern to RegEx if specified
        if (_.isString(field[FIELD.PATTERN])) {
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
    __registerShowCondition (field) {
        const { expression, expression1, expression2 } = field.showCondition;
        [expression, expression1, expression2].forEach(_expression => {
            if (ExpressionService.isFormResponseExpression(_expression)) {
                let list = this.showConditionTriggerMap.find(_expression.id);
                if (!list) {
                    list = [];
                    this.showConditionTriggerMap.add(_expression.id, list);
                }
                list.push(field[FIELD.ID]);
            }
        });
    }
    _validateField (field) {
        apiCheck.throw([
            apiCheck.shape({
                [FIELD.ID]      : apiCheck.oneOfType([apiCheck.string, apiCheck.number]),
                [FIELD.TYPE]    : apiCheck.string,
                [FIELD.TITLE]   : apiCheck.string,
                [FIELD.SUBTITLE]: apiCheck.string.optional
            })
        ], arguments, {
            prefix: `[Field: ${_getObjectIdDisplay(field)}]`
        });
    }
    _validateDefinition (definition) {
        apiCheck.throw([
            apiCheck.shape({
                [DEFINITION.ID]      : apiCheck.string,
                [DEFINITION.TITLE]   : apiCheck.string,
                [DEFINITION.SUBTITLE]: apiCheck.string.optional,
                [DEFINITION.SECTIONS]: apiCheck.arrayOf(apiCheck.shape({
                    [SECTION.ID]         : apiCheck.string,
                    [SECTION.TITLE]      : apiCheck.string,
                    [SECTION.SUBTITLE]   : apiCheck.string.optional,
                    [SECTION.SORT_ORDER] : apiCheck.number.optional,
                    [SECTION.SUBSECTIONS]: apiCheck.arrayOf(apiCheck.shape({
                        [SUBSECTION.ID]        : apiCheck.string,
                        [SUBSECTION.TITLE]     : apiCheck.string,
                        [SUBSECTION.SUBTITLE]  : apiCheck.string.optional,
                        [SUBSECTION.SORT_ORDER]: apiCheck.number.optional,
                        [SUBSECTION.FIELDS]    : apiCheck.arrayOf(apiCheck.object)
                    }).strict)
                }).strict),
                [DEFINITION.DECORATORS]  : apiCheck.object.optional,
                [DEFINITION.CALCULATIONS]: apiCheck.shape({
                    [CALCULATIONS.EXPRESSION_MAP]: apiCheck.object.optional,
                    [CALCULATIONS.TRIGGER_MAP]   : apiCheck.object.optional
                }).optional,
                [DEFINITION.DEFAULT_VALUE_TRIGGERS]: apiCheck.object.optional

            }).strict
        ], arguments, {
            prefix: `[Definition: "${_getObjectIdDisplay(definition)}"]`
        });
    }
    /**
     * Return whether the form is valid
     * @returns {boolean}
     */
    isValid () {
        return this.__isValid;
    }
    /**
     * Get form error
     * @returns {*}
     */
    getError () {
        return this.error;
    }
    /**
     * Get form definition
     * @returns {*}
     */
    getDefinition () {
        return this.definition;
    }
    /**
     * Get form model
     * @returns {SortableMap}
     */
    getModel () {
        return this.model;
    }
    /**
     * Get form model values
     * @returns {*}
     */
    getModelValues () {
        return this.model.findAll();
    }
    /**
     * Get single model value (e.g. form response)
     * @param id
     */
    getModelValue (id) {
        return this.model.find(id);
    }
    /**
     * Determine if the model contains a key
     * @param id
     * @returns {LoDashExplicitWrapper<boolean>|boolean|Assertion}
     */
    hasModelValue (id) {
        return this.model.has(id);
    }
    /**
     * Get form decorators
     * @returns {*|decorators|{str2, str3, str4}|{}}
     */
    getDecorators () {
        return this.decorators;
    }
    /**
     * Get UI decorator by field id
     * @param id
     * @returns {*}
     */
    getCustomUIDecorators (id) {
        return this.getDecorators()[id];
    }
    /**
     * Get sections from the definition
     * @returns {*|Array|sections|{id, title, subtitle, sortOrder, subsections}}
     */
    getDefinitionSections () {
        return this.getDefinition().sections;
    }
    /**
     * Get form sections
     * @returns {SortableMap|*}
     */
    getSections () {
        return this.sections;
    }
    /**
     * Get single form section
     * @param id
     * @returns {*}
     */
    getSection (id) {
        return this.getSections().find(id);
    }
    /**
     * Get form subsections
     * @returns {SortableMap|*}
     */
    getSubsections () {
        return this.subsections;
    }
    /**
     * Get single form subsection
     * @param id
     * @returns {*}
     */
    getSubsection (id) {
        return this.getSubsections().find(id);
    }
    /**
     * Get form fields
     * @returns {SortableMap|*}
     */
    getFields () {
        return this.fields;
    }
    /**
     * Get single form field
     * @param id
     * @returns {*}
     */
    getField (id) {
        return this.getFields().find(id);
    }
    /**
     * Set a model value
     * @param id
     * @param value
     * @param field
     */
    setModelValue (id, value, field) {
        // Set or reset the model value
        if (value === NO_VALUE) {
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
        _.forEach(field[FIELD.OPTIONS], option => {
            if (option[FIELD.FIELDS] && !_.includes(value, option[FIELD.ID])) {
                this.resetFields(option[FIELD.FIELDS]);
            }
        });

        // Evaluate the show condition of dependent fields if this field is a trigger
        if (this.showConditionTriggerMap.has(id)) {
            this.showConditionTriggerMap.find(id).forEach(fieldId => {
                if (this.hasModelValue(fieldId) && !this.evaluateFieldShowCondition(this.getField(fieldId))) {
                    this.setModelValue(fieldId, NO_VALUE, this.getField(fieldId));
                }
            });
        }
    }
    /**
     * Reset a specific list of fields, if they contain a model value
     * @param fields
     */
    resetFields (fields) {
        _.forEach(fields, field => {
            if (this.hasModelValue(field[FIELD.ID])) {
                this.setModelValue(field[FIELD.ID], NO_VALUE, field);
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
    doResetChildren (field, value) {
        if (!field[FIELD.FIELDS]) return false;
        switch (field[FIELD.TYPE]) {
            case DATA_TYPE.DATE : return !hasValue(value);
            case DATA_TYPE.NUMBER: return Number.isNaN(value);
            case DATA_TYPE.BOOLEAN: return value === false;
            case DATA_TYPE.STRING: return __blank(value);
            case DATA_TYPE.ARRAY: return _.isEmpty(value);
            default: {
                console.warn(`Unmapped field type: ${field[FIELD.TYPE]} (id: ${field[FIELD.ID]})`);
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
    evaluateFieldShowCondition (field) {
        if (!field.showCondition) return true;
        return this.evaluateCondition(field.showCondition);
    }
    /**
     * Evaluate a condition
     * @param condition
     * @returns {*}
     */
    evaluateCondition (condition) {
        if (!condition) return false;
        return ExpressionService.evalCondition(condition, this);
    }
}

function _getObjectIdDisplay (field) {
    return Maybe.of(field)
        .prop(FIELD.ID)
        .orElse('[No Id]')
        .join();
}
