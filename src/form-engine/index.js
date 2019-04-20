import { decorate, observable } from 'mobx';

import Maybe from 'maybe-baby';
import isString from 'lodash/isString';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import ValidationService from './service/validation-service';
import ExpressionService from './service/expression-service';
import FormApiService from './service/form-api-service';

import FormConfig from './config/form-config';
import FormValidator from './validation/form-validator';
import ValidationResults from './validation/validation-results';

import { clone, isBlank } from '../common';
import { NO_VALUE, PROPERTY, DATA_TYPE, VALIDATION_CONST } from './config/form-const';

const { FIELD, DEFINITION } = PROPERTY;

class FormEngine {
    constructor(definition, model) {
        try {
            FormApiService.validateDefinitionShape(definition);
            this.__isDefinitionValid = true;
        } catch (error) {
            this.__isDefinitionValid = false;
            this.error = error;
            return;
        }

        this.definition = definition; // Form definition
        this.decorators = definition.decorators || {}; // UI decorators

        this.showConditionTriggerMap = {}; // Map of field ids keyed by trigger id

        this.validationResults = new ValidationResults(); // Stores validation results

        this.validationMap = {
            sections: {},
            subsections: {},
            fields: {}
        };

        this.model = {}; // Map of form responses keyed by id
        this.sections = []; // Array of form sections
        this.fields = {}; // Map of form fields keyed by ids

        this.__initInstance(model);
    }
    /**
     * Initialize the form instance
     * @private
     */
    __initInstance(model) {
        this.__cloneSections();
        this.__initFieldMetadata();
        this.__hydrateModel(model);
    }
    /**
     * Hydrate the instance mode with existing data
     * @param model
     * @private
     */
    __hydrateModel(model) {
        if (!model || isEmpty(model)) return;
        let parsed = model;
        if (typeof model === 'string') {
            try {
                parsed = JSON.parse(model);
            } catch (e) {
                console.error('** FormEngine.__hydrateModel: Unable to parse JSON model!');
                console.error(`** You passed: ${model}`);
                parsed = {};
            }
        }

        Object.keys(parsed).forEach(key => {
            this.model[key] = parsed[key];
        });
    }
    /**
     * Don't modify the original definition. Instead, clone each section
     * into a map; all form instance data will then be
     * applied from these cloned sections, such as validation errors, etc.
     * @private
     */
    __cloneSections() {
        this.getDefinitionSections().forEach(section => {
            this.sections.push(clone(section));
        });
    }
    /**
     * Add each cloned subsection a map
     * @private
     */
    __initFieldMetadata() {
        this.sections.forEach(section => {
            section.subsections.forEach(subsection => {
                subsection.section = section;
                this.__decorateFields(subsection.fields, subsection);
            });
        });
    }
    /**
     * Decorate an array of fields
     * @param fields
     * @private
     */
    __decorateFields(fields, parent) {
        if (Array.isArray(fields) && !isEmpty(fields)) {
            fields.forEach(field => {
                this.__decorateField(field, parent);
                this.__decorateFields(field[FIELD.FIELDS], field);
                if (Array.isArray(field[FIELD.OPTIONS]) && !isEmpty(field[FIELD.OPTIONS])) {
                    field[FIELD.OPTIONS].forEach(option => {
                        option[FIELD.PARENT] = field;
                        this.__decorateFields(option[FIELD.FIELDS], option);
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
    __decorateField(field, parent) {
        try {
            // Validate the basic shape of the object by ensuring there is
            // at least an "id", "type", and "title", as well as certain data
            // type checks (e.g min/max must be numbers, etc.)
            FormApiService.validateFieldShape(field);
        } catch (error) {
            this.__isDefinitionValid = false;
            this.error = error;
            return;
        }

        field[FIELD.PARENT] = parent;
        field[FIELD.UI_DECORATORS] = this.getCustomUIDecorators(field[FIELD.ID]);

        const { actions, component, defaultDecorators } = FormConfig.getComponentConfig(
            field[FIELD.TYPE],
            FormConfig.getComponentTypeByField(field)
        );

        field[FIELD.ACTIONS] = actions;
        field[FIELD.COMPONENT] = component;

        try {
            // Validate data and component types shape. Ensure that
            // "array" type fields contain "option" array, "range"
            // type fields contain min/max, etc.
            FormApiService.validateFieldTypesShape(field);
        } catch (error) {
            this.__isDefinitionValid = false;
            this.error = error;
            return;
        }

        // Apply any default decorators
        if (defaultDecorators) {
            field[FIELD.UI_DECORATORS] = {
                ...field[FIELD.UI_DECORATORS],
                ...defaultDecorators
            };
        }

        // Convert string pattern to RegEx if specified
        if (isString(field[FIELD.PATTERN])) {
            field[FIELD.PATTERN] = new RegExp(field[FIELD.PATTERN]);
        }

        // Register a show condition if specified
        if (field[FIELD.SHOW_CONDITION]) {
            this.__registerShowCondition(field);
        }

        // Add the field to fields
        this.fields[field[FIELD.ID]] = field;
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
    __registerShowCondition(field) {
        const { expression, expression1, expression2 } = field.showCondition;
        [expression, expression1, expression2].forEach(_expression => {
            if (ExpressionService.isFormResponseExpression(_expression)) {
                let list = this.showConditionTriggerMap[_expression.id];
                if (!list) {
                    list = [];
                    this.showConditionTriggerMap[_expression.id] = list;
                }
                list.push(field[FIELD.ID]);
            }
        });
    }
    /**
     * Get form title
     * @returns {*}
     */
    getFormTitle() {
        return this.getDefinition().title;
    }
    /**
     * Get form icon
     * @returns {*}
     */
    getFormIcon() {
        return Maybe.of(this.definition)
            .prop('faIcon')
            .prop('name')
            .join();
    }
    /**
     * Get form icon prefix
     * @returns {*}
     */
    getFormIconPrefix() {
        return Maybe.of(this.definition)
            .prop('faIcon')
            .prop('prefix')
            .join();
    }
    /**
     * Return whether the form is valid
     * @returns {boolean}
     */
    isValidDefinition() {
        return this.__isDefinitionValid;
    }
    /**
     * Get form error
     * @returns {*}
     */
    getError() {
        return this.error;
    }
    /**
     * Get form definition
     * @returns {*}
     */
    getDefinition() {
        return this.definition;
    }
    /**
     * Get the form definition id
     */
    getId() {
        return this.getDefinition()[DEFINITION.ID];
    }

    /**
     * Get form model
     * @returns {*}
     */
    getModel() {
        return this.model;
    }

    /**
     * Serialize the model to json
     * @returns {string}
     */
    serializeModel() {
        return JSON.stringify(this.model);
    }
    /**
     * Determine if the model contains a key
     * @param id
     * @returns {LoDashExplicitWrapper<boolean>|boolean|Assertion}
     */
    hasModelValue(id) {
        return Boolean(this.getModelValue(id));
    }
    /**
     * Get form decorators
     * @returns {*|decorators|{str2, str3, str4}|{}}
     */
    getDecorators() {
        return this.decorators;
    }
    /**
     * Get UI decorator by field id
     * @param id
     * @returns {*}
     */
    getCustomUIDecorators(id) {
        return this.getDecorators()[id];
    }
    /**
     * Get sections from the definition
     * @returns {*|Array|sections|{id, title, subtitle, sortOrder, subsections}}
     */
    getDefinitionSections() {
        return this.getDefinition().sections;
    }
    /**
     * Get form sections
     * @returns {{}|*}
     */
    getSections() {
        return this.sections;
    }

    /**
     * Get form fields
     * @returns {{}|*}
     */
    getFields() {
        return this.fields;
    }
    /**
     * Get single form field
     * @param id
     * @returns {*}
     */
    getField(id) {
        return this.fields[id];
    }

    /**
     * Determine if the field is a boolean data type
     * @param field
     * @returns {boolean}
     */
    isBooleanField(field) {
        return field[FIELD.TYPE] === DATA_TYPE.BOOLEAN;
    }

    getModelValue(id) {
        return this.model[id];
    }

    /**
     * Set a model value
     * @param id
     * @param value
     * @param field
     */
    setModelValue(id, value, field) {
        // Set or reset the model value
        if (value === this.getModelValue(id)) return;

        if (value === NO_VALUE) {
            field.dirty = false;
            delete this.model[id];
        } else {
            field.dirty = true;
            this.model[id] = value;
        }

        // Reset children if necessary
        if (this.doResetChildren(field, value)) {
            this.resetFields(field[FIELD.FIELDS]);
        }

        // Reset the children of any option fields if the option is not selected
        if (field[FIELD.OPTIONS]) {
            field[FIELD.OPTIONS].forEach(option => {
                if (
                    option[FIELD.FIELDS] &&
                    ((this.isBooleanField(field) && !value) || !includes(value, option[FIELD.ID]))
                ) {
                    this.resetFields(option[FIELD.FIELDS]);
                }
            });
        }

        // Evaluate the show condition of dependent fields if this field is a trigger
        if (this.showConditionTriggerMap[id]) {
            this.showConditionTriggerMap[id].forEach(fieldId => {
                if (this.hasModelValue(fieldId) && !this.isVisible(this.getField(fieldId))) {
                    this.setModelValue(fieldId, NO_VALUE, this.getField(fieldId));
                }
            });
        }
    }
    /**
     * Reset a specific list of fields, if they contain a model value
     * @param fields
     */
    resetFields(fields) {
        if (fields) {
            fields.forEach(field => {
                if (this.hasModelValue(field[FIELD.ID]) && !this.isVisible(field)) {
                    this.setModelValue(field[FIELD.ID], NO_VALUE, field);
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
    doResetChildren(field, value) {
        if (!field[FIELD.FIELDS]) return false;
        switch (field[FIELD.TYPE]) {
            case DATA_TYPE.DATE:
                return isNil(value);
            case DATA_TYPE.NUMBER:
                return Number.isNaN(value);
            case DATA_TYPE.BOOLEAN:
                return value === false;
            case DATA_TYPE.STRING:
                return isBlank(value);
            case DATA_TYPE.ARRAY:
                return isEmpty(value);
            default: {
                console.warn(`Unmapped field type: ${field[FIELD.TYPE]} (id: ${field[FIELD.ID]})`);
                return false;
            }
        }
    }
    hasShowCondition(field) {
        return Boolean(field[FIELD.SHOW_CONDITION]);
    }
    /**
     * Evaluate the show condition of the field
     * @param field
     * @param tag
     * @returns {*}
     */
    isVisible(field) {
        if (!this.hasShowCondition(field)) return true;
        return this.evaluateCondition(field[FIELD.SHOW_CONDITION]);
    }
    /**
     * Evaluate a condition
     * @param condition
     * @returns {*}
     */
    evaluateCondition(condition) {
        if (!condition) return false;
        return ExpressionService.evalCondition(condition, this);
    }
    validate(comprehensive = false) {
        this.validationResults = FormValidator.validate(this, this.validationResults, comprehensive);
        this.rebuildValidationMap();
    }
    validateOnSubmit() {
        this.validate(true);
    }
    rebuildValidationMap() {
        this.sections.forEach(section => {
            this.validationMap.sections[section[FIELD.ID]] = this.sectionHasError(section);
            section.subsections.forEach(subsection => {
                this.validationMap.subsections[subsection[FIELD.ID]] = this.subsectionHasError(subsection);
            });
        });
        Object.keys(this.fields).forEach(id => {
            this.validationMap.fields[id] = this.fieldHasError(id);
        });
    }
    hasError() {
        return this.validationResults.hasError();
    }
    getValidationResults() {
        return this.validationResults;
    }
    getValidationResultByTag(id) {
        return this.validationResults.getResults(id);
    }
    getValidationStatusByTag(id) {
        return this.getValidationResultByTag(id).status;
    }
    getDeepValidationStatusByTag(id) {
        let status = this.getValidationResultByTag(id).status;
        const newStatus = this.findStatus(
            this.getField(id)[FIELD.FIELDS],
            this.getDeepValidationStatusByTag.bind(this),
            true
        );
        if (ValidationService.isMoreSevereStatus(newStatus, status)) {
            status = newStatus;
        }
        return status;
    }
    findStatus(list = [], getStatus, useId) {
        let status = VALIDATION_CONST.STATUS.OK;
        list.forEach(entry => {
            const newStatus = getStatus(useId ? entry[FIELD.ID] : entry);
            if (ValidationService.isMoreSevereStatus(newStatus, status)) {
                status = newStatus;
            }
        });
        return status;
    }
    getSubsectionStatus(subsection) {
        return this.findStatus(subsection.fields, this.getDeepValidationStatusByTag.bind(this), true);
    }
    getSectionStatus(section) {
        return this.findStatus(section.subsections, this.getSubsectionStatus.bind(this));
    }
    fieldHasError(id) {
        return ValidationService.isError(this.getValidationStatusByTag(id));
    }
    subsectionHasError(subsection) {
        return ValidationService.isError(this.getSubsectionStatus(subsection));
    }
    sectionHasError(section) {
        return ValidationService.isError(this.getSectionStatus(section));
    }
}

decorate(FormEngine, {
    model: observable,
    validationMap: observable
});
export default FormEngine;
