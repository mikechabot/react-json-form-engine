import React from 'react';
import BSCheckbox from 'react-bootstrap/lib/Checkbox';
import _ from 'lodash';
import FormField from '../form-field';

class CheckboxGroup extends React.Component {
    renderChildren (children) {
        const { instance, onUpdate } = this.props;
        children = _.orderBy(children, 'sortOrder');
        return _.map(children, (child) => {
            const tag = child.tag;
            if (instance.evaluateShowCondition(child, tag)) {
                return (
                    <ul style={{listStyle: 'none'}} key={tag}>
                        <li>
                            <FormField
                                tag={tag}
                                id={tag}
                                field={child}
                                value={instance.getModelValue(tag)}
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
        const { tag, field, value, onUpdate } = this.props;
        if (!field.options) {
            console.warn(`${field.type} is missing required "options" (tag: ${tag}`);
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
                                    id={tag}
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

    _renderIcon(option) {
        if(option && option.parent && option.parent.icon) {
            return <i style={{marginLeft: 5}} className={option.parent.icon} />
        }
    }
}

CheckboxGroup.propTypes = {
    tag     : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.array
};

export default CheckboxGroup;
