import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Maybe from 'maybe-baby';

import FormControlTitle from './helpers/FormControlTitle';
import FormControlHint from './helpers/FormControlHint';
import ValidationFieldError from './validation/ValidationFieldError';
import { inject, observer } from 'mobx-react';

@inject('instance')
@observer
class FormControl extends Component {
    maybeRenderHint(uiDecorators) {
        if (Maybe.of(() => uiDecorators.hint).isJust()) {
            return <FormControlHint text={uiDecorators.hint} />;
        }
    }

    render() {
        const { field, fieldId, onUpdate, instance } = this.props;
        const { component, uiDecorators } = field;

        if (!component || !component.element) {
            console.error(`Field of type "${field.type}" is missing required "component" (id: ${field.id})`);
            return <ValidationFieldError id={field.id} />;
        }

        const hasError = instance.fieldHasError(fieldId);
        const value = instance.modelValue(fieldId);
        console.log('Render FormControl', field.id);

        const Control = component.element;

        const renderErrors = id => {
            const { messages } = instance.getValidationResultByTag(id);
            return Object.keys(messages).map(key => (
                <FormControlHint
                    key={key}
                    icon="asterisk"
                    className="is-danger"
                    text={messages[key].message}
                />
            ));
        };

        return (
            <span>
                <FormControlTitle field={field} decorators={uiDecorators} />
                <div className="control">
                    <Control
                        id={fieldId}
                        value={value}
                        field={field}
                        hasError={hasError}
                        uiDecorators={uiDecorators}
                        onUpdate={onUpdate}
                    />
                </div>
                {this.maybeRenderHint(uiDecorators)}
                {hasError ? renderErrors(fieldId) : null}
            </span>
        );
    }
}

FormControl.propTypes = {
    fieldId: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.array,
        PropTypes.object
    ])
};

export default FormControl;
