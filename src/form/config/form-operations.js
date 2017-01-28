import _ from 'lodash';
import { DATA_TYPE, COMPONENT_TYPE } from './form-const';

export const OPERATION_TYPES = {
    ON_UPDATE: 'onUpdate'
};

const common = {
    onUpdate: (event) => {
        const { target } = event;
        return target.value;
    }
};

export const DATA_TYPE_OPERATIONS = {
    [DATA_TYPE.STRING]: {
        onUpdate: common.onUpdate
    },
    [DATA_TYPE.BOOLEAN]: {
        onUpdate: (event) => {
            const { target } = event;
            return target.checked;
        }
    },
    [DATA_TYPE.NUMBER]: {
        onUpdate: (event) => {
            const { target } = event;
            return target.valueAsNumber;
        }
    },
    [DATA_TYPE.DATE]: {
        onUpdate: (event) => {
            return event;
        }
    },
    [DATA_TYPE.ARRAY]: {
        onUpdate: (event, fieldInfo, existingModelValue, newValue) => {
            const { target } = event;
            if (fieldInfo.componentType === COMPONENT_TYPE.SELECT) {
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

export const COMPONENT_OPERATIONS = {
    [COMPONENT_TYPE.RADIO]: {
        onUpdate: (event, fieldInfo) => {
            if (fieldInfo.type === DATA_TYPE.STRING) {
                return common.onUpdate(event);
            } else {
                return common.onUpdate(event) === 'true';
            }
        }
    }
};
