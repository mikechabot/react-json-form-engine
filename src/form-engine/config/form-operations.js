import { DATA_TYPE, COMPONENT_TYPE } from './form-const';

export const OPERATION_TYPES = {
    ON_UPDATE: 'onUpdate'
};

/**
 * Basic operations by data type
 * @type {{[p: string]: }}
 */
export const DATA_TYPE_OPERATIONS = {
    [DATA_TYPE.STRING]: {
        onUpdate: ({ target }) => target.value
    },
    [DATA_TYPE.BOOLEAN]: {
        onUpdate: value => value
    },
    [DATA_TYPE.NUMBER]: {
        onUpdate: ({ target }) => target.valueAsNumber
    },
    [DATA_TYPE.DATE]: {
        onUpdate: event => event
    },
    [DATA_TYPE.ARRAY]: {
        onUpdate: (eventOrValue, field, oldVal, newVal) => {
            if (field.component.type === COMPONENT_TYPE.SELECT) {
                return [...eventOrValue.target.options].filter(o => o.selected).map(o => o.value);
            }
            const val = newVal || eventOrValue;
            if (!oldVal) return [val];
            return !oldVal.includes(val) ? [...oldVal, ...[val]] : oldVal.filter(v => v !== val);
        }
    }
};

/**
 * Basic operations by component type
 * @type {{[p: string]: undefined}}
 */
export const COMPONENT_TYPE_OPERATIONS = {
    [COMPONENT_TYPE.RADIO]: {
        onUpdate: value => value
    }
};
