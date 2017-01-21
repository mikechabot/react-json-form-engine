import {
    FIELD_TYPE_KEYS,
    FORM_COMPONENT_KEYS
} from './form-const';
import _ from 'lodash';

export const OPERATION_TYPES = {
    ON_UPDATE: 'onUpdate'
};

const _COMMON_OPERATIONS = {
    onUpdate: (event) => {
        const { target } = event;
        return target.value;
    }
};

export const FIELD_TYPE_OPERATIONS = {
    'string': {
        onUpdate: _COMMON_OPERATIONS.onUpdate
    },
    'boolean': {
        onUpdate: (event) => {
            const { target } = event;
            return target.checked;
        }
    },
    'number': {
        onUpdate: (event) => {
            const { target } = event;
            return target.valueAsNumber;
        }
    },
    'date': {
        onUpdate: (event) => {
            return event;
        }
    },
    'array': {
        onUpdate: (event, fieldInfo, existingModelValue, newValue) => {
            const { target } = event;
            if (fieldInfo.componentType === FORM_COMPONENT_KEYS.SELECT) {
                return _.filter(target.options, (option) => option.selected)
                    .map(option => option.value);
            } else {
                const val = newValue || target.value;
                if (!existingModelValue) return [val];
                return !_.includes(existingModelValue, val)
                    ? [...existingModelValue, ...[val]]
                    : [..._.remove(existingModelValue, eachVal => eachVal !== val)];
            }
        }
    }
};

export const FORM_CONTROL_OPERATIONS = {
    'radio': {
        onUpdate: (event, fieldInfo) => {
            if (fieldInfo.type === FIELD_TYPE_KEYS.STRING) {
                return _COMMON_OPERATIONS.onUpdate(event);
            } else {
                return _COMMON_OPERATIONS.onUpdate(event) === 'true';
            }
        }
    }
};
