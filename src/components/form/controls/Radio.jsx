import React from 'react';
import BSRadio from 'react-bootstrap/lib/Radio';
import FormField from '../FormField';
import { hasValue } from '../../../common/common';

class Radio extends React.Component {

    isChecked (option, value, isEven) {
        if (!hasValue(value)) return false;
        if (option.id) {
            return option.id === value;
        }
        return isEven ? value : !value;
    }

    renderChildren (children) {
        const { instance, onUpdate } = this.props;
        return _.map(children, (child) => {
            if (instance.evaluateFieldShowCondition(child)) {
                return (
                    <ul key={child.id}
                        style={{listStyle: 'none'}}>
                        <li>
                            <FormField
                                id={child.id}
                                field={child}
                                value={instance.getModelValue(child.id)}
                                instance={instance}
                                onUpdate={onUpdate}
                            />
                        </li>
                    </ul>
                );
            }
        });
    }

    render () {
        const { id, value, field, onUpdate } = this.props;
        if (!field.options) {
            console.warn(`${field.type} is missing required "options" (id: ${id})`);
            return <span />;
        }

        return (
            <div id={id}>
                {
                    field.options.map((option, index) => {
                        const isEven = index % 2 === 0;
                        return (
                                <div key={index} style={field.inline ? {display: 'inline', marginRight: 10} : {} }>
                                    <BSRadio
                                        id={id}
                                        disabled={field.disabled}
                                        style={!field.inline ? {margin: '5px 0px'} : {}}
                                        inline={field.inline}
                                        onChange={onUpdate}
                                        value={option.id || isEven}
                                        checked={this.isChecked(option, value, isEven)}>
                                        <span style={{fontWeight: 300}}>{ option.title || option }</span>
                                    </BSRadio>
                                    {
                                        option.fields
                                            ? this.renderChildren(option.fields)
                                            : ''
                                    }
                                </div>
                        );
                    })
                }
            </div>
        );
    }
}

Radio.propTypes = {
    id   : React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.bool
    ]),
    instance: React.PropTypes.object,
    field   : React.PropTypes.object.isRequired,
    uiField : React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
};

export default Radio;
