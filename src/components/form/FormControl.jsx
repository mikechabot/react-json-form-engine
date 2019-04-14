import React from 'react';
import PropTypes from 'prop-types';
import Maybe from 'maybe-baby';

import FormControlTitle from './helpers/FormControlTitle';
import FormControlHint from './helpers/FormControlHint';
import ValidationFieldError from './validation/ValidationFieldError';

class FormControl extends React.Component {
    maybeRenderHint(uiDecorators) {
        if (Maybe.of(() => uiDecorators.hint).isJust()) {
            return <FormControlHint text={uiDecorators.hint} />;
        }
    }

    maybeRenderError(id, instance) {
        const { messages } = instance.getValidationResultByTag(id);
        return Object.keys(messages).map(key => (
            <FormControlHint key={key} icon="asterisk" className="is-danger" text={messages[key].message} />
        ));
    }

    render() {
        const { id, value, field, instance, onUpdate } = this.props;
        const { component, uiDecorators } = field;

        if (!component || !component.element) {
            console.error(`Field of type "${field.type}" is missing required "component" (id: ${id})`);
            return <ValidationFieldError id={field.id} />;
        }

        console.log('Render FormControl', id);

        const Control = component.element;

        const hasError = instance.fieldHasError(id);

        return (
            <span>
                <FormControlTitle field={field} decorators={uiDecorators} />
                <div className="control">
                    <Control
                        id={id}
                        value={value}
                        field={field}
                        hasError={hasError}
                        uiDecorators={uiDecorators}
                        onUpdate={onUpdate}
                        instance={instance}
                    />
                </div>
                {this.maybeRenderHint(uiDecorators)}
                {hasError ? this.maybeRenderError(id, instance) : null}
            </span>
        );
    }
}

FormControl.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.array,
        PropTypes.object
    ]),
    instance: PropTypes.object.isRequired
};

export default FormControl;
