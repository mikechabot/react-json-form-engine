import SortableMap from 'sortable-map';
import Maybe from 'maybe-baby';
import _forEach from 'lodash/forEach';
import _isString from 'lodash/isString';
import _includes from 'lodash/includes';
import _isEmpty from 'lodash/isEmpty';
import _omit from 'lodash/omit';

import ValidationService from '../form/service/validation-service';
import ExpressionService from '../form/service/expression-service';
import FormApiService from '../form/service/form-api-service';

import FormConfig from '../form/config/form-config';
import FormValidator from '../form/validation/form-validator';
import ValidationResults from '../form/validation/validation-results';

import { __clone, __blank, __hasValue } from '../common';
import { NO_VALUE, PROPERTY, DATA_TYPE, VALIDATION_CONST } from './config/form-const';

const { FIELD, DEFINITION } = PROPERTY;

class FormEngine {
    constructor(definition, model, options) {
        try {
            FormApiService.__validateDefinitionShape(definition);
            this.__isDefinitionValid = true;
        } catch (error) {
            this.__isDefinitionValid = false;
            this.error = error;
            return;
        }

        this.definition = definition; // Form definition
        this.decorators = definition.decorators || {}; // UI decorators

        this.showConditionTriggerMap = new SortableMap(); // Map of field ids keyed by trigger id

        this.validator = FormValidator; // Form validator class
        this.validationResults = new ValidationResults(); // Stores validation results

        this.model = this.__hydrateModel(model); // Map of form responses keyed by field id

        this.sections = new SortableMap(); // Map of form sections keyed by id
        this.subsections = new SortableMap(); // Map of form subsections keyed by id
        this.fields = new SortableMap(); // Map of form fields keyed by ids

        this.__initInstance(options);
    }

    /**
     * Hydrate the instance mode with existing data
     * @param model
     * @private
     */
    __hydrateModel(model) {
        let hydratedModel = new SortableMap();
        _forEach(model, (value, key) => {
            hydratedModel.add(key, value);
        });
        return hydratedModel;
    }

    /**
     * Parse and apply form options
     * @param options
     * @private
     */
    __parseOptions(options) {
        if (!options) return;
        this.__liveValidation = options.liveValidation || false;
    }
    /**
     * Initialize the form instance
     * @private
     */
    __initInstance(options) {
        this.__parseOptions(options);
        this.__cloneSections();
        this.__initFieldMetadata();
    }
    /**
     * Don't modify the original definition. Instead, clone each section
     * into a sortable map; all form instance data will then be
     * applied from these cloned sections, such as validation errors, etc.
     * @private
     */
    __cloneSections() {
        this.getDefinitionSections().forEach(section => {
            this.sections.add(section.id, __clone(section));
        });
    }
    /**
     * Add each cloned subsection a sortable map
     * @private
     */
    __initFieldMetadata() {
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
    __decorateFields(fields, parent) {
        _forEach(fields, field => {
            this.__decorateField(field, parent);
            if (field.fields) {
                this.__decorateFields(field.fields, field);
            }
            _forEach(field.options, option => {
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
    __decorateField(field, parent) {
        FormApiService.__validateFieldShape(field);

        field[FIELD.PARENT] = parent;
        field[FIELD.UI_DECORATORS] = this.getCustomUIDecorators(field[FIELD.ID]);

        const { actions, component, defaultDecorators } = FormConfig.getComponentConfig(
            field[FIELD.TYPE],
            FormConfig.getComponentTypeByField(field)
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
        if (_isString(field[FIELD.PATTERN])) {
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
    __registerShowCondition(field) {
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
    isValid() {
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
     * @returns {SortableMap}
     */
    getModel() {
        return this.model;
    }
    /**
     * Get form model values
     * @returns {*}
     */
    getModelValues() {
        return this.model.findAll();
    }
    /**
     * Get single model value (e.g. form response)
     * @param id
     */
    getModelValue(id) {
        return this.model.find(id);
    }
    /**
     * Determine if the model contains a key
     * @param id
     * @returns {LoDashExplicitWrapper<boolean>|boolean|Assertion}
     */
    hasModelValue(id) {
        return this.model.has(id);
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
     * @returns {SortableMap|*}
     */
    getSections() {
        return this.sections;
    }
    /**
     * Get single form section
     * @param id
     * @returns {*}
     */
    getSection(id) {
        return this.getSections().find(id);
    }
    /**
     * Get form subsections
     * @returns {SortableMap|*}
     */
    getSubsections() {
        return this.subsections;
    }
    /**
     * Get single form subsection
     * @param id
     * @returns {*}
     */
    getSubsection(id) {
        return this.getSubsections().find(id);
    }
    /**
     * Get form fields
     * @returns {SortableMap|*}
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
        return this.getFields().find(id);
    }

    /**
     * Get all subsection fields (including conditional children)
     * @param subsection
     */
    getAllSubsectionFields(subsection) {
        if (!subsection || _isEmpty(subsection.fields)) {
            return [];
        }
        return this.__buildFlatFieldList([], subsection.fields);
    }
    /**
     * Detemrine if the field is a boolen data type
     * @param field
     * @returns {boolean}
     */
    isBooleanField(field) {
        return field[FIELD.TYPE] === DATA_TYPE.BOOLEAN;
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
        _forEach(field[FIELD.OPTIONS], option => {
            if (
                option[FIELD.FIELDS] &&
                ((this.isBooleanField(field) && !value) || !_includes(value, option[FIELD.ID]))
            ) {
                this.resetFields(option[FIELD.FIELDS]);
            }
        });

        // Evaluate the show condition of dependent fields if this field is a trigger
        if (this.showConditionTriggerMap.has(id)) {
            this.showConditionTriggerMap.find(id).forEach(fieldId => {
                if (
                    this.hasModelValue(fieldId) &&
                    !this.evaluateFieldShowCondition(this.getField(fieldId))
                ) {
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
        _forEach(fields, field => {
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
    doResetChildren(field, value) {
        if (!field[FIELD.FIELDS]) return false;
        switch (field[FIELD.TYPE]) {
            case DATA_TYPE.DATE:
                return !__hasValue(value);
            case DATA_TYPE.NUMBER:
                return Number.isNaN(value);
            case DATA_TYPE.BOOLEAN:
                return value === false;
            case DATA_TYPE.STRING:
                return __blank(value);
            case DATA_TYPE.ARRAY:
                return _isEmpty(value);
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
    evaluateFieldShowCondition(field) {
        if (!field.showCondition) return true;
        return this.evaluateCondition(field.showCondition);
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
    isLiveValidation() {
        return this.__liveValidation;
    }
    validate() {
        this.validationResults.clear();
        this.validator.validate(this, this.validationResults);
        this.validationResults.postProcess();
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
    findStatus(list, getStatus, useId) {
        let status = VALIDATION_CONST.STATUS.OK;
        _forEach(list, entry => {
            const newStatus = getStatus(useId ? entry[FIELD.ID] : entry);
            if (ValidationService.isMoreSevereStatus(newStatus, status)) {
                status = newStatus;
            }
        });
        return status;
    }
    getSubsectionStatus(subsection) {
        return this.findStatus(subsection.fields, this.getValidationStatusByTag.bind(this), true);
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
    __buildFlatFieldList(list = [], fields) {
        if (fields) {
            fields.forEach(field => {
                list.push(Object.assign({}, _omit(field, PROPERTY.FIELDS, PROPERTY.OPTIONS)));
                if (field.fields) {
                    this.__buildFlatFieldList(list, field.fields);
                }
                if (field.options) {
                    field.options.forEach(option => {
                        if (option.fields) {
                            this.__buildFlatFieldList(list, option.fields);
                        }
                    });
                }
            });
        }
        return list;
    }
}

export default FormEngine;
