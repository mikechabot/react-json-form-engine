import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Tabs, Tab } from 'react-tabify';

import { Asterisk, Flex } from '../util';

import FormSubmitButton from './helpers/FormSubmitButton';
import ValidationAPIError from './validation/ValidationAPIError';
import FormSection from './FormSection';
import FormTitle from './helpers/FormTitle';

class Form extends Component {
    constructor(props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderSectionTabPane = this.renderSectionTabPane.bind(this);
    }

    componentDidMount() {
        const { instance } = this.props;
        if (instance.isValid()) {
            instance.validate();
        }
    }

    renderFormTitle(instance) {
        if (!this.props.hideTitle) {
            return (
                <FormTitle
                    id={`form-title-${instance.getId()}`}
                    iconPrefix={instance.getFormIconPrefix()}
                    icon={instance.getFormIcon()}
                    label={instance.getFormTitle()}
                    controlsRight={this.renderSubmitButton()}
                />
            );
        }
    }

    renderForm(sections) {
        return sections.count() > 1
            ? this.renderTabbedSections(sections)
            : this.renderSingleSection(sections.values()[0]);
    }

    renderTabbedSections(sections) {
        return (
            <Tabs stacked id={`form-tabs-${this.props.instance.getId()}`} defaultActiveKey={0}>
                {this.renderSectionContent(sections)}
            </Tabs>
        );
    }

    renderSectionContent(sections) {
        return sections.values().map(this.renderSectionTabPane);
    }

    renderSectionTabPane(section, index) {
        return (
            <Tab key={index} eventKey={index} label={this.getDerivedSectionTitle(section)}>
                {this.renderSingleSection(section)}
            </Tab>
        );
    }

    renderSingleSection(section) {
        return (
            <FormSection
                section={section}
                instance={this.props.instance}
                onUpdate={this.onUpdate}
                hideTitle={this.props.hideSectionTitles}
                hideSubtitle={this.props.hideSectionSubtitles}
                submitButton={this.props.hideTitle ? this.renderSubmitButton() : null}
            />
        );
    }

    getDerivedSectionTitle(section) {
        if (!this.props.instance.sectionHasError(section)) return section.title;
        return (
            <span>
                {section.title} <Asterisk />
            </span>
        );
    }

    renderSubmitButton() {
        return <FormSubmitButton onSubmit={this.onSubmit} label={this.props.submitButtonLabel} />;
    }

    onSubmit() {
        const { instance, onSubmit } = this.props;
        instance.validateOnSubmit();
        this.forceUpdate();
        if (onSubmit) onSubmit();
    }

    onUpdate(event, id) {
        const { instance, onUpdate } = this.props;

        id = id || event.target.id;
        const field = instance.getField(id);

        const value = field.actions.onUpdate(event, field, instance.getModelValue(id));

        // Set model value
        instance.setModelValue(id, value, field);
        instance.validate();

        if (!onUpdate) {
            this.forceUpdate();
        } else {
            onUpdate({ id, value }); // Notify parent
        }
    }

    render() {
        const { instance } = this.props;
        // No instance
        if (!instance || isEmpty(instance)) {
            return <em className="has-text-danger">No form instance</em>;
        }
        // Invalid definition
        if (!instance.isValid()) {
            return <ValidationAPIError error={instance.error} />;
        }
        // No sections
        if (instance.getSections().isEmpty()) {
            return <em className="has-text-danger">No sections</em>;
        }

        console.log('Rendering Form');

        return (
            <Flex
                width={this.props.width}
                id={`form-${instance.getId()}`}
                column
                flex={1}
                flexShrink={0}
                overflow="auto"
                border="1px solid #dbdbdb"
            >
                {this.renderFormTitle(instance)}
                {this.renderForm(instance.getSections())}
            </Flex>
        );
    }
}

Form.propTypes = {
    instance: PropTypes.object.isRequired,
    submitButtonLabel: PropTypes.string,
    hideTitle: PropTypes.bool,
    hideSectionTitles: PropTypes.bool,
    hideSectionSubtitles: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onSubmit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func
};

export default Form;
