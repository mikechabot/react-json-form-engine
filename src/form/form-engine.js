import _ from 'lodash';
import SortableMap from 'sortable-map';
import FormConfig from '../form/config/form-config';
import FormValidator from '../form/validation/form-validator';
import ValidationResults from '../form/validation/validation-results';
import Maybe from 'maybe-baby';
import ValidationService from '../form/service/validation-service';
import { __clone } from '../common/common';
const apiCheck = require('api-check')({output: { prefix: 'FormEngine:' }});

export default class FormEngine {
    constructor (definition, model) {
        try {
            _validateDefinition(definition);                // Throw error on misshapen definition
            this.__isValid = true;
        } catch (error) {
            this.__isValid = false;
            this.error = error;
            return;
        }

        this.definition = definition;                       // Form definition
        this.decorators = definition.decorators || {};      // UI decorators
        this.model = model;                                 // Map of form responses keyed by field id

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
        _validateField(field);

        field.parent = parent;
        field.uiDecorator = this.getUIDecorator(field.id) || {};

        const { actions, component } = FormConfig.getComponentConfig(
            field.type, FormConfig.getComponentTypeByField(field)
        );

        field.actions = actions;
        field.component = component;

        // Add RegExp if specified
        if (_.isString(field.pattern)) {
            field.pattern = new RegExp(field.pattern);
        }

        // Add the field to fields
        this.fields.add(field.id, field);
    }

    /**
     * Return whether the form is valid
     * @returns {boolean}
     */
    isValid () {
        return this.__isValid;
    }
    getError () {
        return this.error;
    }
    /**
     * Get the form definition
     * @returns {*}
     */
    getDefinition () {
        return this.definition;
    }
    getDecorators () {
        return this.decorators;
    }
    /**
     * Get UI decorator by field id
     * @param id
     * @returns {*}
     */
    getUIDecorator (id) {
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
     *
     * @returns {SortableMap|*}
     */
    getSections () {
        return this.sections;
    }
}

function _validateField (field) {
    apiCheck.throw([
        apiCheck.shape({
            id      : apiCheck.oneOfType([apiCheck.string, apiCheck.number]),
            type    : apiCheck.string,
            title   : apiCheck.string,
            subtitle: apiCheck.string.optional
        })
    ], arguments, {
        prefix: 'field'
    });
}

function _validateDefinition (definition) {
    apiCheck.throw([
        apiCheck.shape({
            id      : apiCheck.oneOfType([apiCheck.string, apiCheck.number]),
            title   : apiCheck.string,
            subtitle: apiCheck.string.optional,
            sections: apiCheck.arrayOf(apiCheck.shape({
                id         : apiCheck.oneOfType([apiCheck.string, apiCheck.number]),
                title      : apiCheck.string,
                subtitle   : apiCheck.string.optional,
                sortOrder  : apiCheck.number.optional,
                subsections: apiCheck.arrayOf(apiCheck.shape({
                    id       : apiCheck.oneOfType([apiCheck.string, apiCheck.number]),
                    title    : apiCheck.string,
                    subtitle : apiCheck.string.optional,
                    sortOrder: apiCheck.number.optional,
                    fields   : apiCheck.arrayOf(apiCheck.object)
                }).strict)
            }).strict),
            decorators: apiCheck.object.optional,
            calcs     : apiCheck.shape({
                expressionMap: apiCheck.object.optional,
                triggerMap   : apiCheck.object.optional
            }).optional,
            defaultValueTriggers: apiCheck.object.optional

        }).strict
    ], arguments, {
        prefix: `[Definition: "${Maybe.of(definition).prop('title').orElse('[No Title]').join()}"]`
    });
}
