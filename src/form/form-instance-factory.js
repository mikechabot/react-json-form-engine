import FormConfig from './config/form-config';
import ExpressionService from './services/expression-service';
import ValidationResults from './validation/validation-results';
import ValidationService from './validation/form-validation-service';
import FormValidator from './validation/form-validator';
import VALIDATION_CONST from './validation/validation-const';
import { __hasValue, __blank } from '../common/common';
import { FORM_COMPONENT_KEYS, FIELD_TYPE_KEYS } from './config/form-const';
import _ from 'lodash';

class Form {
    constructor (definition, model) {
        // Check for valid definition
        if (!__hasValue(definition) || _.isEmpty(definition)) {
            throw new Error('Form definition cannot be null/undefined/empty');
        }

        this.definition = definition;   // Form definition
        this.model = model;        // Map of form responses keyed by tag

        // Check for valid schemas
        const { schema } = definition;
        if (!__hasValue(schema) || _.isEmpty(schema)) {
            throw new Error('Schema cannot cannot be null/undefined/empty');
        }

        // Instance data
        this.sections = [];           // List of form sections. Holds subsections and fields.
        this.fields = {};           // Map of fields keyed by tag. Entry contains field metadata
        this.validationResults = {};           // Class that holds form validation results
        this.validator = {};           // Form validator service
    }

    /**
     * Initialize the form instance
     * @param validator
     * @private
     */
    __initInstance (validator, isOffline) {
        const instance = this;

        return this.__initPrerequisiteData(isOffline)
            .then(() => {
                // Register field info with the form instance
                instance.initFields();

                // Register validation services
                // TODO: Combine validators
                instance.validator = validator || FormValidator;
                instance.validationResults = new ValidationResults();

                // Validate
                instance.validate();
                console.debug(instance);

            })
            .catch(error => {
                console.error('Error initializing form instance: ', error);
            });
    }

    /**
     * Preload data needed by the form instance
     * @returns {Promise}
     * @private
     */
    __initPrerequisiteData (isOffline) {
        if (isOffline) return Promise.resolve();
        return new Promise((resolve, reject) => {
            Promise
                .all([ ])
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }

    /**
     * Apply metadata to each field in the form definition, such as the
     * React component to render in the UI, and any related information
     * in the uiSchema.
     * @private
     */
    initFields () {
        /**
         * Don't modify the original form definition
         *
         * Instead, make a copy of the schema (sections) and apply all instance
         * metadata to the copy. This is necessary if we want to have
         * two separate instances of the same form definition active at the
         * same time.
         */
        this.sections = JSON.parse(
            JSON.stringify(_.sortBy(this.getSchema().sections, 'sortOrder'))
        );

        //  Register field info
        _.forEach(this.sections, section => {
            _.forEach(section.subsections, subsection => {
                _.forEach(subsection.fields, (field, tag) => {
                    this.__decorateField(field, tag);
                });
            });
        });
    }
    __decorateField (field, tag, formComponentKey) {
        if (!field.type) {
            console.debug(field);
        }
        // Obtain uiField definition
        field.uiField = formComponentKey
            ? this.__addComponentToUiSchemaAndReturnUiField(tag, formComponentKey)
            : this.getUiSchemaField(tag) || {};

        // Obtain field component type
        field.componentType = FormConfig.getComponentType(field, field.uiField);

        // Set the form component
        field.component = FormConfig.getFieldTypeComponent(field.type, field.componentType);

        // Add RegExp if specified
        if (field.pattern) {
            const pattern = new String(field.pattern);
            field.pattern = new RegExp(pattern);
        }

        // Build field children
        if (field.fields) {
            field.fields = this.__decorateChildren(field, field.fields);
        }

        // Build children of options
        if (field.options) {
            _.forEach(field.options, option => {
                option.parent = field;
                option.fields = {
                    ...this.__decorateChildren(option, option.fields),
                    ...this.__buildFieldsFromMetadata('goals', this.__buildGoals.bind(this), option, field, tag),
                    ...this.__buildFieldsFromMetadata('tasks', this.__buildTasks.bind(this), option, field, tag)
                };
                if (_.isEmpty(option.fields)) {
                    delete option.fields;
                }
            });
        }

        if (this.fields[tag]) {
            console.debug('ALREADY EXISTS?', this.fields[tag], field);
        }

        this.fields[tag] = field;
    }
    __decorateChildren (parent, children) {
        const childFields = {};
        _.forEach(children, (child, tag) => {
            this.__decorateField(child, tag);
            child.parent = parent;
            childFields[tag] = child;
        });
        return childFields;
    }
    __buildFieldsFromMetadata (property, build, option, field, tag) {
        const newFields = {};
        _.forEach(option[property], (metadata, metadataTag) => {
            const newField = build(metadata, metadataTag, option, field, tag);
            this.__decorateField(newField, metadataTag, FORM_COMPONENT_KEYS.CHECKBOXGROUP);
            newFields[metadataTag] = newField;
        });
        return newFields;
    }
    __getComparisonCondition (type, value, tag) {
        return {
            type,
            expression1: { type: 'CONST', value },
            expression2: { type: 'FORM_RESPONSE', tag }
        };
    }
    __buildGoals (goals, tag, parentOption, parentField, parentTag) {
        const { list } = goals;

        const field = {
            icon                  : 'fa fa-crosshairs',
            tag                   : tag,
            type                  : FIELD_TYPE_KEYS.ARRAY,
            showCondition         : goals.showCondition,
            parent                : parentField,
            options               : [],
            defaultValueConditions: _.some(list, goal => goal.auto) ? [] : undefined
        };

        _.forEach(list, (goal, index) => {
            const goalObj = DefinitionService.getCachedGoalById(goal.id);
            if (goalObj) {
                // Create option
                const option = {
                    id    : goalObj._id,
                    title : goalObj.label,
                    fields: {}
                };

                if (goal.interventions) {
                    const intTag = `${tag}Intervention`;
                    option.fields = {
                        [intTag]: this.__buildGoalInterventions(goal, intTag, option, field, tag)
                    };
                    this.__addComponentToUiSchemaAndReturnUiField(intTag, FORM_COMPONENT_KEYS.CHECKBOXGROUP);
                }

                // Generate default value condition
                if (goal.auto) {
                    this.__addDefaultValueCondition(
                        field, tag, option.id,
                        parentField.type, parentOption.id, parentTag
                    );
                }

                // Add option to options
                field.options.push(option);
            } else {
                console.warn(`Missing goal object with id: "${goal.id}". A re-translation may be required.`);
            }
        });

        return field;
    }

    __buildGoalInterventions (goalRef, tag, parentOption, parentField, parentTag) {
        const { interventions } = goalRef;
        const { list } = interventions;

        const field = {
            icon                  : 'fa fa-tasks',
            tag                   : tag,
            type                  : FIELD_TYPE_KEYS.ARRAY,
            options               : [],
            parent                : parentField,
            showCondition         : interventions.showCondition,
            defaultValueConditions: _.some(list, intervention => intervention.auto) ? [] : undefined
        };

        _.forEach(list, intervention => {
            const interventionObj = DefinitionService.getCachedInterventionById(intervention.id);
            if (interventionObj) {
                // Create option
                const option = {
                    id   : interventionObj._id,
                    title: interventionObj.label
                };

                // Add option to options
                field.options.push(option);

                // Generate default value condition
                if (intervention.auto) {
                    this.__addDefaultValueCondition(
                        field, tag, option.id,
                        parentField.type, parentOption.id, parentTag
                    );
                }
            } else {
                console.warn(`Missing intervention object with id: "${intervention.id}". A re-translation may be required.`);
            }
        });

        return field;
    }
    __buildTasks (tasks, tag, parentOption, parentField, parentTag) {
        const { list } = tasks;

        const field = {
            icon                  : 'fa fa-tasks',
            tag                   : tag,
            type                  : FIELD_TYPE_KEYS.ARRAY,
            parent                : parentField,
            options               : [],
            showCondition         : tasks.showCondition,
            defaultValueConditions: _.some(list, task => task.auto) ? [] : undefined
        };

        _.forEach(list, task => {
            // Get cached intervention
            const interventionObj = DefinitionService.getCachedInterventionById(task.id);
            if (interventionObj) {
                // Create option
                const option = {
                    id   : interventionObj._id,
                    title: interventionObj.label
                };

                // Add option to options
                field.options.push(option);

                // Generate default value condition
                if (task.auto) {
                    this.__addDefaultValueCondition(
                        field, tag, option.id,
                        parentField.type, parentOption.id, parentTag
                    );
                }
            } else {
                console.warn(`Missing task (intervention) object with id: "${task.id}". A re-translation may be required.`);
            }
        });

        return field;
    }
    /**
     * Add the field to the UI schema.
     *
     * For most fields, the UI schema typically already contains. However when we
     * convert goal & task metadata into form fields, we need to add
     * UI definitions for checkbox groups.
     *
     * The translation process could take care of this, however, by letting the instance
     * factory determine what form control is built, it grants us greater flexibility.
     * @param tag
     * @param type
     * @returns {{component: {type: *}}}
     * @private
     */
    __addComponentToUiSchemaAndReturnUiField (tag, type) {
        let uiField = this.definition.uiSchema[tag];
        if (!uiField) {
            uiField = {};
            this.definition.uiSchema[tag] = uiField;
        }
        uiField.component = { type };
        return uiField;
    }
    __addDefaultValueCondition (field, tag, defaultValue, parentFieldType, conditionValue, conditionTag) {
        const conditionType = parentFieldType === FIELD_TYPE_KEYS.ARRAY ? 'CONTAINS' : 'EQUAL';
        field.defaultValueConditions.push({
            condition : this.__getComparisonCondition(conditionType, conditionValue, conditionTag),
            expression: {
                type : 'CONST',
                value: defaultValue
            }
        });
        this.__addDefaultValueTriggerTag(conditionTag, tag);
    }
    __addDefaultValueTriggerTag (triggerTag, tagToEvaluate) {
        // Create the trigger map
        let defaultValueTriggerMap = this.getDefaultValueTriggerMap();
        if (!defaultValueTriggerMap) {
            defaultValueTriggerMap = {};
            this.definition.defaultValueTriggerMap = defaultValueTriggerMap;
        }

        // Add trigger tags
        let tagsToEvaluate = defaultValueTriggerMap[triggerTag];
        if (!tagsToEvaluate) {
            tagsToEvaluate = [];
            this.definition.defaultValueTriggerMap[triggerTag] = tagsToEvaluate;
        }
        // Don't duplicate tags, otherwise we'll run the conditions/expressions multiple times
        if (!tagsToEvaluate.includes(tagToEvaluate)) {
            tagsToEvaluate.push(tagToEvaluate);
        }
    }
    __clearOptionChildren (options, value) {
        _.forEach(options, option => {
            if (option.fields && !_.includes(value, option.id.toString())) {
                this.__clearFields(option.fields);
            }
        });
    }
    __clearFields (fields) {
        _.forEach(fields, (field, tag) => {
            if (__hasValue(this.getModelValue(tag))) {
                this.setModelValue(tag, undefined, field);
            }
        });
    }
    getField (tag) {
        return this.fields[tag];
    }
    evaluateShowCondition (field, tag) {
        if (!field.showCondition) return true;
        const showField = ExpressionService.evalCondition(field.showCondition, this);
        if (!showField) {
            // Clear non-child fields that are conditionally hidden
            if (!__blank(this.getModelValue(tag))) {
                this.setModelValue(tag, undefined, field);
            }
        }
        return showField;
    }
    getModel () {
        return this.model;
    }
    getModelValue (tag) {
        return this.model[tag] ? this.model[tag].value : this.model[tag];
    }
    setModelValue (tag, value, field) {
        // Set the model value accordingly, update the dirty flag
        if (value === undefined) {
            delete this.model[tag];
            field.dirty = false;
        } else {
            const modelValue = {
                value : value
            }
            if(field.definition) {
                modelValue.fieldType = field.definition.type;
                modelValue.definitionId = field.definition.definitionId;
            }
            this.model[tag] = modelValue;
            field.dirty = true;
        }

        // Clear option children
        if (field.options) {
            this.__clearOptionChildren(field.options, value);
        }

        // Clear child fields
        if (field.fields) {
            switch (field.type) {
            case FIELD_TYPE_KEYS.BOOLEAN: {
                if (value === false) {
                    this.__clearFields(field.fields);
                }
                break;
            }
            case FIELD_TYPE_KEYS.NUMBER: {
                if (Number.isNaN(value)) {
                    this.__clearFields(field.fields);
                }
                break;
            }
            case FIELD_TYPE_KEYS.ARRAY: {
                if (_.isEmpty(value)) {
                    this.__clearFields(field.fields);
                }
                break;
            }
            case FIELD_TYPE_KEYS.DATE:
            case FIELD_TYPE_KEYS.STRING:
            default: {
                if (__blank(value)) {
                    this.__clearFields(field.fields);
                }
                break;
            }
            }
        }
    }
    calculateFields (field) {
        // Recalculate list of tags
        // TODO: Why do we need id here? Use tag?
        const tagList = this.getCalcTriggerMap()[field.id];
        _.forEach(tagList, tag => {
            // Get a list of expressions to evaluate that will determine the value of tag
            const expression = this.getCalcExpressionByTag(tag);
            if (expression) {
                const value = ExpressionService.evalExpression(expression, this);
                this.setModelValue(tag, value, this.getField(tag));
                this.triggerDefaultValueEvaluation(tag);
            }
        });
    }
    // Evaluate default values
    triggerDefaultValueEvaluation (tag) {
        const tagsToEvaluate = this.getDefaultValueTriggerMap()[tag];
        if (tagsToEvaluate) {
            this.evaluateDefaultValueConditions(tagsToEvaluate);
        }
    }
    evaluateDefaultValueConditions (tags) {
        _.forEach(tags, tag => {
            const field = this.getField(tag);

            // Generate a flat array of default value conditions from an arbitrary number of options
            const defaultValueConditions = field.defaultValueConditions || _.flatten(
                _.map(field.options, option => option.defaultValueConditions)
            );

            _.forEach(defaultValueConditions, conditionalExpression => {
                const conditionMet = ExpressionService.evalCondition(conditionalExpression.condition, this);
                if (conditionMet) {
                    // Evaluate the expression to obtain the default value
                    let defaultValue = ExpressionService.evalExpression(conditionalExpression.expression, this);

                    if (field.type === FIELD_TYPE_KEYS.ARRAY) {
                        // Pass the value through the applicable "onUpdate" method to
                        // mimic an update from the UI. This is important since it will
                        // concatenate or pop array values for checkbox groups and selects
                        defaultValue = field.component.onUpdate(event, field, this.getModelValue(tag), defaultValue);
                    }

                    // Update the model value
                    this.setModelValue(tag, defaultValue, field);
                }
            });
        });
    }
    getSchema () {
        return this.definition.schema;
    }
    getUiSchema () {
        return this.definition.uiSchema || {};
    }
    /**
     * CalcExpressionMap is a map of objects keyed by tag.
     * Each entry contains a "type" and an "expression"
     * property, where "type" is a String that determines the
     * type of calc expression, and "expression" is an array
     * of expressions to be evaluated for the keyed tag.
     *
     * It it assumed all expressions in the array are included
     * in the same calculation.
     *
     * Example entry:
     *
     *      "totalScore":{
     *         "type":"ADD"
     *         "expressions":[
     *            {
     *               "type":"FORM_RESPONSE",
     *               "tag":"ageGroup"
     *            },
     *            {
     *               "type":"FORM_RESPONSE",
     *               "tag":"gender"
     *            },
     *            {
     *               "type":"FORM_RESPONSE",
     *               "tag":"liveCaregiver"
     *            }
     *         ]
     *      }
     *
     *  The expressions above are added together ("ADD")
     *  to resolve the value for tag "totalScore"
     *
     * @returns {calcExpressionMap|{}}
     */
    getCalcExpressionMap () {
        return this.definition.calcExpressionMap;
    }
    /**
     * Map of tags keyed by field id. Each entry is an array of tags
     * that require calculation when the value of the field associated
     * with the field id changes. When we detect a change on a calc field,
     * we use it's id to lookup which tags must be recalculated. Using these
     * tags, we do a lookup in "calcExpressionMap" for the expressions
     * we must run for the tag in question.
     *
     * Example entries:
     *    {
     *      "0e25b3f7-74d5-46ce-b4d6-73d00c6a09af": ["totalScore"],
     *      "a48a2ea2-4ac1-48a2-8622-1fe03a5b496f": ["totalScore"],
     *      "cd8a345a-0d74-4d55-a795-eb9dac622fee": ["totalScore"],
     *    }
     *
     * The exported spreadsheets do not utilize this behavior to its full potential,
     * however this design allows us to evaluate the expressions of multiple tags
     * given that only a single field value changed.
     *
     * @returns {calcTriggerMap|{}}
     */
    getCalcTriggerMap () {
        return this.definition.calcTriggerMap;
    }
    /**
     * Map of fields to evaluate the default value of when the key's value changes.
     * For instance, when the model value of "totalScore" changes, we must run the
     * default value conditions for "totalScoreRadio". These conditions live on
     * the field object as 'defaultValueConditions'
     *
     * Example entries:
     *    {
     *       "totalScore": ["totalScoreRadio"]
     *    }
     *
     * @returns {defaultValueTriggerMap|{}}
     */
    getDefaultValueTriggerMap () {
        return this.definition.defaultValueTriggerMap;
    }
    getCalcExpressionByTag (tag) {
        if (this.getCalcExpressionMap()) {
            return this.getCalcExpressionMap()[tag];
        }
    }
    getDefaultValueConditionsByTag (tag) {
        if (this.getDefaultValueTriggerMap()) {
            return this.getDefaultValueTriggerMap()[tag];
        }
    }
    getSections () {
        return this.sections;
    }
    getUiSchemaField (tag) {
        return this.getUiSchema()[tag];
    }
    hasValidator () {
        return __hasValue(this.validator);
    }
    validate () {
        if (this.hasValidator()) {
            this.validationResults.clear();
            this.validator.validate(this, this.validationResults);
            this.validationResults.postProcess();
        }
    }
    getValidationResults () {
        return this.validationResults;
    }
    getValidationResultByTag (tag) {
        return this.validationResults.getResults(tag);
    }
    getValidationStatusByTag (tag) {
        return this.getValidationResultByTag(tag).status;
    }
    hasError (tag) {
        return !tag
            ? this.validationResults.hasError()                     // Return overall validation status
            : this.isError(this.getValidationStatusByTag(tag));     // Return validation status of given tag
    }
    isError (status) {
        return ValidationService.isError(status);
    }
    getStatus (iterator, getStatus, useTag) {
        let status = VALIDATION_CONST.STATUS.OK;
        _.forEach(iterator, (i, tag) => {
            const iStatus = getStatus(useTag ? tag : i);
            if (ValidationService.isMoreSevereStatus(iStatus, status)) {
                status = iStatus;
            }
        });
        return status;
    }
    getSubsectionStatus (subsection) {
        return this.getStatus(
            subsection.fields,
            this.getValidationStatusByTag.bind(this),
            true
        );
    }
    getSectionStatus (section) {
        return this.getStatus(
            section.subsections,
            this.getSubsectionStatus.bind(this)
        );
    }
}

function newInstance (definition, model, validator, isOffline) {
    return new Promise((resolve, reject) => {
        let instance = new Form(definition, model);
        instance.__initInstance(validator, isOffline)
            .then(() => {
                resolve(instance);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export default (
    definition,
    model,
    validator,
    isOffline
) =>
new newInstance(
    definition,
    model,
    validator,
    isOffline
);
