import React from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

import Asterisk from '../common/Asterisk';
import Navbar from '../common/bulma/Navbar';
import FormSection from './FormSection';
import { Tabs, Tab } from '../common/tabs';
import { Flex, APICheckError } from '../common';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount() {
        const { instance } = this.props;
        instance.validate();
    }

    render() {
        const { instance } = this.props;
        // No instance
        if (!instance || _isEmpty(instance)) {
            return <em className="text-danger">No form instance</em>;
        }
        // Invalid definition
        if (!instance.isValid()) {
            return <APICheckError error={instance.error} />;
        }
        // No sections
        if (instance.getSections().isEmpty()) {
            return <em className="text-danger">No sections</em>;
        }
        return (
            <Flex id={instance.getId()} column flex={1}>
                {this._renderFormTitle(instance)}
                {this._renderForm(instance.getSections())}
                <Flex hAlignCenter flexShrink={0} className="m-top--small m-bottom--small">
                    <button className="button" onClick={this.props.onSubmit}>
                        {this.props.submitButtonLabel || 'Submit'}
                    </button>
                </Flex>
            </Flex>
        );
    }

    _renderFormTitle(instance) {
        return <Navbar icon="cloud" label={instance.getTitle()} />;
    }

    _renderForm(sections) {
        return sections.count() > 1
            ? this._renderTabbedSections(sections)
            : this._renderSingleSection(sections.values()[0]);
    }

    _renderTabbedSections(sections) {
        return (
            <Tabs id="tabs" defaultActiveKey={0}>
                {this._renderSectionContent(sections)}
            </Tabs>
        );
    }

    _renderSectionContent(sections) {
        return sections.values().map(this._renderSectionTabPane.bind(this));
    }

    _renderSectionTabPane(section, index) {
        let label = section.title;
        if (this.props.instance.sectionHasError(section)) {
            label = (
                <span>
                    {label} <Asterisk />
                </span>
            );
        }
        return (
            <Tab key={index} eventKey={index} label={label}>
                {this._renderSingleSection(section)}
            </Tab>
        );
    }

    _renderSingleSection(section) {
        return <FormSection section={section} instance={this.props.instance} onUpdate={this.onUpdate} />;
    }

    onUpdate(event, id) {
        const { instance, onUpdate } = this.props;

        id = id || event.target.id;
        const field = instance.getField(id);

        const value = field.actions.onUpdate(event, field, instance.getModelValue(id));

        instance.setModelValue(id, value, field); // Set model value
        // instance.calculateFields(field);               // Calculate fields if necessary
        // instance.triggerDefaultValueEvaluation(tag);   // Trigger default value evaluation
        if (instance.isLiveValidation()) {
            instance.validate(); // Validate the form
        }
        onUpdate({ id, value }); // Notify parent
    }
}

Form.propTypes = {
    onUpdate: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired,
    sectionMenuWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    submitButtonLabel: PropTypes.string
};

export default Form;
