import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FIELD_TYPE_KEYS } from '../../../form/config/form-const';

class Select extends React.Component {
    render () {
        const { tag, value, field, onUpdate } = this.props;
        const isMultiple = isMultiselect(field);

        let defaultValue = value;
        if (!defaultValue) {
            defaultValue = isMultiple
                ? []
                : (field.placeholder || '-- select value --');
        }

        if (!field.options) {
            console.warn(`${field.type} is missing required "options" (tag: ${tag}`);
            return <span />;
        }

        return (
            <div style={{ marginRight: 40 }}>
                <FormControl
                    value={value}
                    id={tag}
                    name={tag}
                    onChange={onUpdate}
                    multiple={isMultiple}
                    defaultValue={defaultValue}
                    componentClass='select'>
                    {
                        !value && !isMultiple
                            ? <option style={{fontWeight: 300}} value=''>{field.placeholder || '-- select value --'}</option>
                            : undefined
                    }
                    {
                        field.options.map((option, index) => (
                            <option style={{fontWeight: 300}} key={index} value={option.id}>
                                { option.title }
                            </option>
                        ))
                    }
                </FormControl>
            </div>
        );
    }
}

function isMultiselect (field) {
    return field.type === FIELD_TYPE_KEYS.ARRAY;
}

Select.propTypes = {
    tag  : React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.string
    ]),
    field   : React.PropTypes.object.isRequired,
    uiField : React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
};

export default Select;
