import React from 'react';
import BSCheckbox from 'react-bootstrap/lib/Checkbox';
import _ from 'lodash';
import FormField from '../FormField';

class CheckboxGroup extends React.Component {
    renderChildren (children) {
        const { instance, onUpdate } = this.props;
        children = _.orderBy(children, 'sortOrder');
        return _.map(children, (child) => {
            const id = child.id;
            if (instance.evaluateShowCondition(child, id)) {
                return (
                    <ul style={{listStyle: 'none'}} key={id}>
                        <li>
                            <FormField
                                id={id}
                                field={child}
                                value={instance.getModelValue(id)}
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
        const { id, field, value, onUpdate } = this.props;
        if (!field.options) {
            console.warn(`${field.type} is missing required "options" (id: ${id}`);
            return <span />;
        }
        return (
            <div>
                {
                    _.map(field.options, (option, index) => {
                        return (
                            <div key={index}>
                                <BSCheckbox
                                    style={{margin: '5px 0px'}}
                                    id={id}
                                    onChange={onUpdate}
                                    value={option.id}
                                    checked={_.includes(value, option.id.toString())}>
                                    <span style={{fontWeight: 300}}>{ option.title }</span>{this._renderIcon(option)}
                                </BSCheckbox>
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

    _renderIcon (option) {
        if (option && option.parent && option.parent.icon) {
            return <i style={{marginLeft: 5}} className={option.parent.icon} />;
        }
    }
}

CheckboxGroup.propTypes = {
    id      : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.array
};

export default CheckboxGroup;
