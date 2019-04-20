import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Maybe from 'maybe-baby';

import FormControlTitle from './helpers/FormControlTitle';
import FormControlHint from './helpers/FormControlHint';
import ValidationFieldError from './validation/ValidationFieldError';

@inject('instance', 'onUpdate')
@observer
class FormControl extends Component {
    static propTypes = {
        instance: PropTypes.instanceOf(Object).isRequired,
        field: PropTypes.object.isRequired,
        onUpdate: PropTypes.func.isRequired
    };

    maybeRenderHint(uiDecorators) {
        if (Maybe.of(() => uiDecorators.hint).isJust()) {
            return <FormControlHint text={uiDecorators.hint} />;
        }
    }

    renderErrors(id) {
        const { instance } = this.props;
        const { messages } = instance.getValidationResultByTag(id);
        return Object.keys(messages).map(key => (
            <FormControlHint key={key} icon="asterisk" className="is-danger" text={messages[key].message} />
        ));
    }

    render() {
        const { field, onUpdate, instance } = this.props;
        const { component, uiDecorators } = field;

        const { id, type } = field;

        console.log('Render FormControl', id);

        if (!component || !component.element) {
            console.error(`Field of type "${type}" is missing required "component" (id: ${id})`);
            return <ValidationFieldError id={id} />;
        }

        const hasError = instance.validationMap.fields[id] || false;
        const value = instance.getModelValue(id);

        const Control = component.element;
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
                    />
                </div>
                {this.maybeRenderHint(uiDecorators)}
                {hasError ? this.renderErrors(id) : null}
            </span>
        );
    }
}

export default FormControl;
