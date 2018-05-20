import _filter from 'lodash/filter';
import _remove from 'lodash/remove';
import _includes from 'lodash/includes';
import { DATA_TYPE, COMPONENT_TYPE } from './form-const';

export const OPERATION_TYPES = {
    ON_UPDATE: 'onUpdate'
};

const common = {
    onUpdate: event => {
        const { target } = event;
        return target.value;
    }
};

export const DATA_TYPE_OPERATIONS = {
    [DATA_TYPE.STRING]: {
        onUpdate: common.onUpdate
    },
    [DATA_TYPE.BOOLEAN]: {
        onUpdate: value => value
    },
    [DATA_TYPE.NUMBER]: {
        onUpdate: event => {
            const { target } = event;
            return target.valueAsNumber;
        }
    },
    [DATA_TYPE.DATE]: {
        onUpdate: event => {
            return event;
        }
    },
    [DATA_TYPE.ARRAY]: {
        onUpdate: (eventOrValue, field, oldValue, newValue) => {
            if (field.component.type === COMPONENT_TYPE.SELECT) {
                return _filter(eventOrValue.target.options, option => option.selected).map(
                    option => option.value
                );
            } else {
                const val = newValue || eventOrValue;
                if (!oldValue) return [val];
                return !_includes(oldValue, val)
                    ? [...oldValue, ...[val]]
                    : [..._remove(oldValue, eachVal => eachVal !== val)];
            }
        }
    }
};

export const COMPONENT_OPERATIONS = {
    [COMPONENT_TYPE.RADIO]: {
        onUpdate: value => value
    }
};
