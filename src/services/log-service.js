import _isArray from 'lodash/isArray';

const LogService = {
    logGroup(label, data) {
        console.group(label);
        if (!_isArray(data)) {
            console.log(data);
        } else {
            data.forEach(entry => {
                __logKeyValue(entry);
            });
        }
        console.groupEnd();
    }
};

const __logKeyValue = entry => {
    if (entry) {
        console.log(`${entry.key} -> ${entry.value}`);
    }
};

export default LogService;
