import _zipObject from 'lodash/zipObject';
import _keys from 'lodash/keys';
import _map from 'lodash/map';
import Maybe from 'maybe-baby';
import { DATA_TYPE, COMPONENT_DECORATORS, COMPONENT_TYPE } from './form-const';
import { DATA_TYPE_OPERATIONS, COMPONENT_OPERATIONS, OPERATION_TYPES } from './form-operations';

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
        this.typeConfigs = {};
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
            [COMPONENT_TYPE.CHECKBOXGROUP]: require('../../components/form/controls/CheckboxGroup')
                .default
        });
    }
    __registerDataType(type, components) {
        this.typeConfigs[type] = {
            type,
            [COMPONENT_CONFIGS]: _zipObject(
                _keys(components),
                _map(components, (component, key) => {
                    const config = {
                        dataType: type,
                        component: {
                            type: key,
                            element: component
                        },
                        actions: {
                            onUpdate: this._getOperation(type, key, OPERATION_TYPES.ON_UPDATE)
                        }
                    };
                    if (this._hasDecorators(key)) {
                        config.defaultDecorators = this._getDefaultDecorators(key);
                    }
                    return config;
                })
            )
        };
    }
    /**
     * Return a typeConfig, which is a map of React components and metadata keyed by component type
     * @param type
     * @returns {*}
     */
    getTypeConfig(type) {
        if (!type) throw new Error('Type cannot be null/undefined');
        if (this.typeConfigs[type]) {
            return this.typeConfigs[type];
        }
        console.warn(`Unmapped data type: ${type}`);
    }
    /**
     * Given a data type, Return a map of React components keyed by component type
     * @param dataType
     * @returns {TResult|_.Dictionary<any>|Object|*}
     */
    getComponentConfigsByDataType(dataType) {
        const typeConfig = this.getTypeConfig(dataType);
        if (typeConfig) return this.getComponentConfigsByTypeConfig(typeConfig);
        console.warn(`Unmapped data type: ${dataType}`);
    }
    getComponentConfigsByTypeConfig(typeConfig) {
        if (typeConfig && typeConfig[COMPONENT_CONFIGS]) {
            return typeConfig[COMPONENT_CONFIGS];
        }
        console.warn(`Unmapped type config: ${typeConfig}`);
    }
    getComponentConfig(dataType, componentType) {
        const components = this.getComponentConfigsByDataType(dataType);
        if (components && components[componentType]) {
            return components[componentType];
        }
        console.warn(`Unmapped component type "${componentType}" for data type: "${dataType}"`);
    }
    getComponentTypeByField(field) {
        if (!field) throw new Error('field is required');
        if (this.hasComponentDecorator(field)) {
            return this.getComponentDecorator(field);
        }
        return this.getDefaultComponentTypeByDataType(field);
    }
    getDefaultComponentTypeByDataType(field) {
        if (!field) throw new Error('field is required');
        switch (field.type) {
            case DATA_TYPE.BOOLEAN:
                return this.hasOptions(field) ? COMPONENT_TYPE.RADIO : COMPONENT_TYPE.CHECKBOX;
            case DATA_TYPE.STRING:
                return this.hasOptions(field) ? COMPONENT_TYPE.SELECT : COMPONENT_TYPE.TEXT;
            case DATA_TYPE.NUMBER:
                return COMPONENT_TYPE.NUMBER;
            case DATA_TYPE.DATE:
                return COMPONENT_TYPE.DATE;
            case DATA_TYPE.ARRAY:
                return COMPONENT_TYPE.SELECT;
            default: {
                console.warn(`Unmapped data type: "${field.type}"`);
            }
        }
    }
    hasComponentDecorator(field) {
        return Maybe.of(field)
            .prop('uiDecorators')
            .prop('component')
            .prop('type')
            .isJust();
    }
    getComponentDecorator(field) {
        return Maybe.of(field)
            .prop('uiDecorators')
            .prop('component')
            .prop('type')
            .join();
    }
    hasOptions(field) {
        return Maybe.of(field)
            .prop('options')
            .isJust();
    }
    _getOperation(fieldType, componentType, operation) {
        const { field, component } = this._getOperations(fieldType, componentType);
        if (component && component[operation]) {
            return component[operation];
        } else if (field && field[operation]) {
            return field[operation];
        }
        console.warn(`Unmapped operations for field/component type: ${fieldType}/${componentType}`);
    }
    _getOperations(fieldType, componentType) {
        return {
            field: DATA_TYPE_OPERATIONS[fieldType],
            component: COMPONENT_OPERATIONS[componentType]
        };
    }
    _hasDecorators(componentType) {
        return !!this._getDefaultDecorators(componentType);
    }
    _getDefaultDecorators(componentType) {
        return COMPONENT_DECORATORS[componentType];
    }
}

export default new FormConfig();
