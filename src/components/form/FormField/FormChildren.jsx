import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import FormField from './';

import { PROPERTY } from '../../../form-engine/config/form-const';

const {
    FIELD: { FIELDS, ID }
} = PROPERTY;

const styles = {
    list: {
        marginTop: '0.50rem',
        marginBottom: '0.50rem',
        marginLeft: '0.30rem',
        paddingLeft: '0.75rem',
        borderLeft: '3px double #dbdbdb'
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
        if (!field[FIELDS] || !field[FIELDS].some(child => instance.isVisible(child))) {
            return null;
        }
        return (
            <ul style={styles.list}>
                {field[FIELDS].map(child => {
                    if (instance.isVisible(child)) {
                        return (
                            <li key={child[ID]}>
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
