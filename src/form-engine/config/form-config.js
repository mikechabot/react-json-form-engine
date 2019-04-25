import Maybe from 'maybe-baby';
import zipObject from 'lodash/zipObject';

import { DATA_TYPE, COMPONENT_DECORATORS, COMPONENT_TYPE } from './form-const';
import { DATA_TYPE_OPERATIONS, COMPONENT_TYPE_OPERATIONS, OPERATION_TYPES } from './form-operations';

const COMPONENT_CONFIGS = 'componentConfigs';

/**
 * The FormEngine is capable of storing various data types in the instance model (e.g. string, number, date).
 * And for each given data type, there is a set form controls available to the UI. For instance, if a field is
 * of type "array" it can be rendered as a checkbox group, or select dropdown. A "number" type can be displayed
 * as a standard number input, or a range slider.
 *
 */
class FormConfig {
    constructor() {
        this.dataTypeConfigurations = {};
        this.__registerDataType(DATA_TYPE.INFO, {
            [COMPONENT_TYPE.INFO]: require('../../components/form/controls/Info').default
        });
        this.__registerDataType(DATA_TYPE.STRING, {
            [COMPONENT_TYPE.TEXT]: require('../../components/form/controls/Text').default,
            [COMPONENT_TYPE.PASSWORD]: require('../../components/form/controls/Text').default,
            [COMPONENT_TYPE.TEXTAREA]: require('../../components/form/controls/Textarea').default,
            [COMPONENT_TYPE.SELECT]: require('../../components/form/controls/Select').default,
            [COMPONENT_TYPE.RADIO]: require('../../components/form/controls/Radio').default
        });
        this.__registerDataType(DATA_TYPE.BOOLEAN, {
            [COMPONENT_TYPE.CHECKBOX]: require('../../components/form/controls/Checkbox').default,
            [COMPONENT_TYPE.RADIO]: require('../../components/form/controls/Radio').default
        });
        this.__registerDataType(DATA_TYPE.NUMBER, {
            [COMPONENT_TYPE.NUMBER]: require('../../components/form/controls/Number').default,
            [COMPONENT_TYPE.RANGE]: require('../../components/form/controls/Range').default
        });
        this.__registerDataType(DATA_TYPE.DATE, {
            [COMPONENT_TYPE.DATE]: require('../../components/form/controls/DateTime').default
        });
        this.__registerDataType(DATA_TYPE.ARRAY, {
            [COMPONENT_TYPE.SELECT]: require('../../components/form/controls/Select').default,
            [COMPONENT_TYPE.CHECKBOXGROUP]: require('../../components/form/controls/CheckboxGroup').default
        });
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
    __registerDataType(dataType, componentMap) {
        const componentTypes = Object.keys(componentMap);
        this.dataTypeConfigurations[dataType] = {
            dataType,
            [COMPONENT_CONFIGS]: zipObject(
                componentTypes,
                componentTypes.map(componentType => {
                    const config = {
                        dataType: dataType,
                        component: {
                            type: componentType,
                            element: componentMap[componentType]
                        },
                        actions: {
                            onUpdate: this.getOperationsByOperationType(
                                dataType,
                                componentType,
                                OPERATION_TYPES.ON_UPDATE
                            )
                        }
                    };
                    if (this.hasDefaultDecorators(componentType)) {
                        config.defaultDecorators = this.getDefaultDecorators(componentType);
                    }
                    return config;
                })
            )
        };
    }
    /**
     * Given a data type, return a map of React components keyed by component type
     * @param dataType
     * @returns {TResult|_.Dictionary<any>|Object|*}
     */
    getComponentConfigurationByDataType(dataType) {
        if (!dataType) throw new Error('Type cannot be null/undefined');
        if (!this.dataTypeConfigurations[dataType]) {
            throw new Error(`Unmapped data type config: ${dataType}`);
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
    getComponentConfigurationByTypes(dataType, componentType) {
        const components = this.getComponentConfigurationByDataType(dataType) || {};
        if (components[componentType]) return components[componentType];
        console.warn(`Unmapped component type "${componentType}" for data type: "${dataType}"`);
    }

    /**
     * Given a field definition, return the component type that should be rendered.
     * If a user specifies an Allowed Control override within a decorator, use that,
     * otherwise return the Default Control for the data type.
     * @param field
     * @returns {*}
     */
    getComponentTypeByField(field) {
        if (!field) throw new Error('field cannot be null/undefined');
        const componentDecorator = this.getComponentDecoratorFromField(field);
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
    getDefaultComponentTypeByField(field) {
        if (!field) throw new Error('field cannot be null/undefined');
        const hasOptions = Maybe.of(() => field.options).isJust();
        switch (field.type) {
            case DATA_TYPE.BOOLEAN:
                return hasOptions ? COMPONENT_TYPE.RADIO : COMPONENT_TYPE.CHECKBOX;
            case DATA_TYPE.STRING:
                return hasOptions ? COMPONENT_TYPE.SELECT : COMPONENT_TYPE.TEXT;
            case DATA_TYPE.NUMBER:
                return COMPONENT_TYPE.NUMBER;
            case DATA_TYPE.DATE:
                return COMPONENT_TYPE.DATE;
            case DATA_TYPE.ARRAY:
                return COMPONENT_TYPE.SELECT;
            case DATA_TYPE.INFO:
                return COMPONENT_TYPE.INFO;
            default: {
                console.warn(`Unmapped component by field data type: "${field.type}"`);
            }
        }
    }

    /**
     * Return a monad containing field decorators than may be a part of
     * the form definition
     * @param field
     * @returns {Maybe}
     */
    getComponentDecoratorFromField(field) {
        return Maybe.of(() => field.uiDecorators.component.type);
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
    getOperationsByOperationType(dataType, componentType, operationType) {
        // dataType/componentType of INFO has no end-user operations
        if (componentType === COMPONENT_TYPE.INFO) return;

        // Return the operation function for the given dataType of componentType
        const { field, component } = this.getFieldAndComponentOperations(dataType, componentType);
        if (component[operationType]) return component[operationType];
        if (field[operationType]) return field[operationType];

        console.warn(`Unmapped operations for field/component type: ${dataType}/${componentType}`);
    }

    /**
     * Get field and/or component operation functions (e.g. onUpdate)
     * @param fieldType
     * @param componentType
     * @returns {{field: (()|{}), component: (undefined|{})}}
     */
    getFieldAndComponentOperations(dataType, componentType) {
        return {
            field: DATA_TYPE_OPERATIONS[dataType] || {},
            component: COMPONENT_TYPE_OPERATIONS[componentType] || {}
        };
    }

    /**
     * Check if a component type has default decorators
     * @param componentType
     * @returns {boolean}
     */
    hasDefaultDecorators(componentType) {
        return Boolean(this.getDefaultDecorators(componentType));
    }

    /**
     * Get the default decorators for a component
     * @param componentType
     * @returns {}
     */
    getDefaultDecorators(componentType) {
        return COMPONENT_DECORATORS[componentType];
    }
}

export default new FormConfig();
