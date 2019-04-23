import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import Checkbox from './Checkbox';
import FormChildren from '../FormField/FormChildren';
import { PROPERTY } from '../../../form-engine/config/form-const';
import { inject, observer } from 'mobx-react';

const {
    FIELD: { ID, FIELDS, OPTIONS }
} = PROPERTY;

const flexColumn = {
    display: 'flex',
    flexDirection: 'column'
};

const optionStyle = {
    ...flexColumn,
    marginBottom: '0.25rem'
};

@inject('instance')
@observer
class CheckboxGroup extends Component {
    hasChildren(option) {
        return !isEmpty(option[FIELDS]);
    }

    getDerivedStyle(index, length, hasVisibleChildren) {
        if (index === length - 1 || hasVisibleChildren) return {};
        return optionStyle;
    }

    render() {
        const { id, field, value, onUpdate, instance } = this.props;
        const length = field[OPTIONS].length;
        return (
            <div style={flexColumn}>
                {field[OPTIONS].map((o, index) => {
                    const hasChildren = this.hasChildren(o);
                    const hasVisibleChildren = hasChildren && o[FIELDS].some(c => instance.isVisible(c));
                    return (
                        <div key={index} style={this.getDerivedStyle(index, length, hasVisibleChildren)}>
                            <Checkbox
                                id={o[ID]}
                                option={o}
                                onUpdate={() => onUpdate(o[ID], id)}
                                value={!value ? false : value.includes(o.id)}
                            />
                            {hasChildren ? <FormChildren field={o} /> : null}
                        </div>
                    );
                })}
            </div>
        );
    }
}

CheckboxGroup.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    value: PropTypes.array,
    onUpdate: PropTypes.func.isRequired
};

export default CheckboxGroup;
