import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import isEmpty from 'lodash/isEmpty';

import FormControl from './FormControl';
import FormChildren from './FormChildren';

import { PROPERTY } from '../../../form-engine/config/form-const';

const {
    FIELD: { ID, FIELDS }
} = PROPERTY;

@inject('instance')
@observer
class FormField extends Component {
    static propTypes = {
        field: PropTypes.instanceOf(Object).isRequired,
        instance: PropTypes.instanceOf(Object).isRequired
    };

    getDerivedStyles(hasVisibleChildren) {
        return {
            marginBottom: hasVisibleChildren ? 0 : '0.75rem'
        };
    }

    render() {
        const { field, instance } = this.props;
        if (!field) return null;

        const hasChildren = !isEmpty(field[FIELDS]);
        const hasVisibleChildren = hasChildren && field[FIELDS].some(c => instance.isVisible(c));

        return (
            <div
                style={this.getDerivedStyles(hasVisibleChildren)}
                className="field"
                id={`field-${field[ID]}`}
            >
                <FormControl field={field} hasChildren={hasChildren} />
                <FormChildren field={field} />
            </div>
        );
    }
}

export default FormField;
