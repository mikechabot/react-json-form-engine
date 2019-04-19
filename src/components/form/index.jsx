import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'mobx-react';
import isEmpty from 'lodash/isEmpty';

import FormConsumer from './FormConsumer';
import ValidationAPIError from './validation/ValidationAPIError';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount() {
        const { instance } = this.props;
        if (instance.isValid()) {
            instance.validate();
        }
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.log(error);
    }

    static getDerivedStateFromError(error) {
        console.log(error);
        return { hasError: true };
    }

    onSubmit() {
        const { instance, onSubmit } = this.props;
        instance.validateOnSubmit();
        if (onSubmit) onSubmit();
    }

    onUpdate(event, id) {
        const { instance, onUpdate } = this.props;

        id = id || event.target.id;
        const field = instance.getField(id);

        const value = field.actions.onUpdate(event, field, instance.getModelValue(id));

        instance.setModelValue(id, value, field);
        instance.validate();

        if (onUpdate) {
            onUpdate({ id, value }); // Notify parent
        }
    }

    render() {
        const { instance, hideFormTitle, hideSubsectionTitles, hideSubsectionSubtitles } = this.props;

        console.log('Rendering Form');

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        // No instance
        if (!instance || isEmpty(instance)) {
            return <em className="has-text-danger">No form instance</em>;
        }

        // Invalid definition
        if (!instance.isValid()) {
            return <ValidationAPIError error={instance.error} />;
        }

        if (isEmpty(instance.getSections())) {
            return <em className="has-text-danger">No sections</em>;
        }

        console.log(hideSubsectionTitles);

        return (
            <Provider
                instance={instance}
                onSubmit={this.onSubmit}
                onUpdate={this.onUpdate}
                hideFormTitle={hideFormTitle}
                hideSubsectionTitles={hideSubsectionTitles}
                hideSubsectionSubtitles={hideSubsectionSubtitles}
            >
                <FormConsumer />
            </Provider>
        );
    }
}

Form.propTypes = {
    instance: PropTypes.object.isRequired,
    submitButtonLabel: PropTypes.string,
    hideFormTitle: PropTypes.bool,
    hideSubsectionTitles: PropTypes.bool,
    hideSubsectionSubtitles: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onSubmit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func
};

export default Form;
