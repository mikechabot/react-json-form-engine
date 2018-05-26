import React from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { Tabs, Tab } from 'react-tabify';

import Asterisk from '../common/Asterisk';
import FormSubmitButton from './helpers/FormSubmitButton';
import FormTitle from '../common/bulma/FormTitle';
import FormSection from './FormSection';
import { APICheckError, Flex } from '../common';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount() {
        const { instance } = this.props;
        if (instance.isValid()) {
            instance.validate();
        }
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
            <Flex
                id={`form-${instance.getId()}`}
                column
                flex={1}
                flexShrink={0}
                border="1px solid #dbdbdb"
                overflow="auto"
            >
                {this._renderFormTitle(instance)}
                {this._renderForm(instance.getSections())}
            </Flex>
        );
    }

    _renderFormTitle(instance) {
        return (
            <FormTitle
                id={`form-title-${instance.getId()}`}
                iconPrefix={instance.getFormIconPrefix()}
                icon={instance.getFormIcon()}
                label={instance.getFormTitle()}
                controlsRight={<FormSubmitButton onSubmit={this.props.onSubmit} />}
            />
        );
    }

    _renderForm(sections) {
        return sections.count() > 1
            ? this._renderTabbedSections(sections)
            : this._renderSingleSection(sections.values()[0]);
    }

    _renderTabbedSections(sections) {
        return (
            <Tabs stacked id={`form-tabs-${this.props.instance.getId()}`} defaultActiveKey={0}>
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
        return (
            <FormSection
                section={section}
                instance={this.props.instance}
                onUpdate={this.onUpdate}
                onSubmit={this.props.onSubmit}
            />
        );
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
    instance: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    sectionMenuWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    submitButtonLabel: PropTypes.string,
    onUpdate: PropTypes.func
};

export default Form;
