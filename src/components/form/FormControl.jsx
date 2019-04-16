import React from 'react';
import PropTypes from 'prop-types';
import Maybe from 'maybe-baby';

import FormControlTitle from './helpers/FormControlTitle';
import FormControlHint from './helpers/FormControlHint';
import ValidationFieldError from './validation/ValidationFieldError';
import { FormConsumer } from '../../context';

class FormControl extends React.Component {
    maybeRenderHint(uiDecorators) {
        if (Maybe.of(() => uiDecorators.hint).isJust()) {
            return <FormControlHint text={uiDecorators.hint} />;
        }
    }

    render() {
        const { value, field, fieldId, onUpdate, hasError } = this.props;
        const { component, uiDecorators } = field;

        if (!component || !component.element) {
            console.error(`Field of type "${field.type}" is missing required "component" (id: ${field.id})`);
            return <ValidationFieldError id={field.id} />;
        }

        console.log('Render FormControl', field.id);

        const Control = component.element;

        return (
            <FormConsumer>
                {instance => {
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
                            {hasError ? renderErrors(id) : null}
                        </span>
                    );
                }}
            </FormConsumer>
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
