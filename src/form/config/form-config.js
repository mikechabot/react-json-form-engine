import {
    FIELD_TYPE_KEYS,
    FORM_COMPONENT_DECORATORS,
    FORM_COMPONENT_KEYS
} from './form-const';
import {
    FIELD_TYPE_OPERATIONS,
    FORM_CONTROL_OPERATIONS,
    OPERATION_TYPES
} from './form-operations';

class FormConfig {
    constructor () {
        /**
         * fieldTypes is a map keyed by field type ('string', 'array', etc).
         * Each entry is a map of React components keyed by component type ('text', 'select', etc).
         *
         * Within the form instance, the value of a given form component input
         * is stored in the model according to its field type.
         *
         * For instance, the Radio form component is utilized in both the 'string' and
         * 'boolean' field types. However, only true/false will be stored in
         * the model when a Radio of type 'boolean' is instantiated, whereas the
         * 'id' of the radio option will be stored when instantiated as a 'string' field
         * type.
         *
         * Example:
         *   {
         *      'string': {
         *          'text'          : Text,
         *          'textarea'      : Textarea,
         *          'radio'         : Radio         // Stores [tag]:[value:STRING]
         *      },
         *      'boolean': {
         *          'checkbox'      : Checkbox,
         *          'radio'         : Radio         // Stores [tag]:[true/false:BOOLEAN]
         *      }
         *   }
         *
         */

        this.fieldTypes = {};
    }

    /**
     * Return a Field Type object, which is a map of React components keyed by component type
     * @param type
     * @returns {*}
     */
    getFieldType (type) {
        if (!type) throw new Error('Type cannot be null/undefined');
        if (this.fieldTypes[type]) {
            return this.fieldTypes[type];
        }
        console.warn(`Unmapped field type: ${type}`);
    }

    /**
     * Given a field type, Return a map of React components keyed by component type
     * @param type
     * @returns {TResult|_.Dictionary<any>|Object|*}
     */
    getComponentsByType (type) {
        const fieldType = this.getFieldType(type);
        if (fieldType) return this.getComponentsByFieldType(fieldType);
        console.warn(`Unmapped field type components: ${type}`);
    }
    getComponentsByFieldType (fieldType) {
        if (fieldType && fieldType.components) {
            return fieldType.components;
        }
        console.warn(`Unmapped field type: ${fieldType}`);
    }
    getComponent (type, componentType) {
        const components = this.getComponentsByType(type);
        if (components && components[componentType]) {
            return components[componentType];
        }
        console.warn(`Unmapped component type "${componentType}" for field type: "${type}"`);
    }
    getComponentType (field, uiField) {
        const { component } = uiField;

        // User-defined in uiSchema
        if (component) return component.type;

        if (field) {
            switch (field.type) {
                case FIELD_TYPE_KEYS.BOOLEAN: {
                    return !field.options
                        ? FORM_COMPONENT_KEYS.CHECKBOX
                        : FORM_COMPONENT_KEYS.RADIO;
                }
                case FIELD_TYPE_KEYS.STRING: {
                    return field.options
                        ? FORM_COMPONENT_KEYS.SELECT
                        : FORM_COMPONENT_KEYS.TEXT;
                }
                case FIELD_TYPE_KEYS.NUMBER: {
                    return FORM_COMPONENT_KEYS.NUMBER;
                }
                case FIELD_TYPE_KEYS.DATE: {
                    return FORM_COMPONENT_KEYS.DATE;
                }
                case FIELD_TYPE_KEYS.ARRAY: {
                    return FORM_COMPONENT_KEYS.SELECT;
                }
                default: {
                    console.warn(`Unmapped field type: "${field.type}"`);
                    break;
                }
            }
        }
    }
    registerFieldType (type, formComponents) {
        const fieldType = { type };
        fieldType.components = _.zipObject(
            _.keys(formComponents),
            _.map(formComponents, (formComponent, key) => {
                // Create component definition
                const component = {};
                component.control = formComponent;
                component.onUpdate = this._getOperation(type, key, OPERATION_TYPES.ON_UPDATE);

                // Assign decorators
                if (this._hasDecorators(key)) {
                    component.decorators = this._getDecorators(key);
                }

                return component;
            })
        );
        this.fieldTypes[type] = fieldType;
    }
    _getOperation (fieldType, componentType, operation) {
        const { field, component } = this._getOperations(fieldType, componentType);
        if (component && component[operation]) {
            return component[operation];
        } else if (field && field[operation]) {
            return field[operation];
        }
        console.warn(`Unmapped operations for field/component type: ${fieldType}/${componentType}`);
    }
    _getOperations (fieldType, componentType) {
        return {
            field    : FIELD_TYPE_OPERATIONS[fieldType],
            component: FORM_CONTROL_OPERATIONS[componentType]
        };
    }
    _hasDecorators (componentType) {
        return !!this._getDecorators(componentType);
    }
    _getDecorators (componentType) {
        return FORM_COMPONENT_DECORATORS[componentType];
    }
}

const formConfig = new FormConfig();

formConfig.registerFieldType(FIELD_TYPE_KEYS.STRING, {
    [FORM_COMPONENT_KEYS.TEXT]    : require('../../components/form/controls/text').default,
    [FORM_COMPONENT_KEYS.TEXTAREA]: require('../../components/form/controls/textarea').default,
    [FORM_COMPONENT_KEYS.SELECT]  : require('../../components/form/controls/select').default,
    [FORM_COMPONENT_KEYS.RADIO]   : require('../../components/form/controls/radio').default,
    [FORM_COMPONENT_KEYS.LABEL]   : require('../../components/form/controls/label').default
});

formConfig.registerFieldType(FIELD_TYPE_KEYS.BOOLEAN, {
    [FORM_COMPONENT_KEYS.CHECKBOX]: require('../../components/form/controls/checkbox').default,
    [FORM_COMPONENT_KEYS.RADIO]   : require('../../components/form/controls/radio').default
});

formConfig.registerFieldType(FIELD_TYPE_KEYS.NUMBER, {
    [FORM_COMPONENT_KEYS.NUMBER]: require('../../components/form/controls/number').default,
    [FORM_COMPONENT_KEYS.RANGE] : require('../../components/form/controls/range').default
});

formConfig.registerFieldType(FIELD_TYPE_KEYS.DATE, {
    [FORM_COMPONENT_KEYS.DATE]: require('../../components/form/controls/datetime').default
});

formConfig.registerFieldType(FIELD_TYPE_KEYS.ARRAY, {
    [FORM_COMPONENT_KEYS.SELECT]       : require('../../components/form/controls/select').default,
    [FORM_COMPONENT_KEYS.CHECKBOXGROUP]: require('../../components/form/controls/checkbox-group').default
});

export default formConfig;
