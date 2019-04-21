import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import FormField from './FormField';

import { PROPERTY } from '../../form-engine/config/form-const';

const {
    FIELD: { FIELDS, ID }
} = PROPERTY;

const styles = {
    list: {
        marginLeft: '1rem'
    },
    listItem: {
        marginTop: '.75rem'
    }
};

@inject('instance')
@observer
class FormChildren extends Component {
    static propTypes = {
        instance: PropTypes.instanceOf(Object).isRequired,
        field: PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string.isRequired,
            fields: PropTypes.array,
            options: PropTypes.array
        })
    };

    render() {
        const { instance, field } = this.props;
        if (!field[FIELDS]) return null;
        return (
            <ul style={styles.list}>
                {field[FIELDS].map(child => {
                    if (instance.isVisible(child)) {
                        return (
                            <li key={child[ID]} style={styles.listItem}>
                                <FormField field={child} />
                            </li>
                        );
                    }
                })}
            </ul>
        );
    }
}

export default FormChildren;
