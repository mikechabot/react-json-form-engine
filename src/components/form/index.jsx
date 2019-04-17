import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Tabs, Tab } from 'react-tabify';

import { Asterisk } from '../util';

import FormSubmitButton from './helpers/FormSubmitButton';
import ValidationAPIError from './validation/ValidationAPIError';
import FormSection from './FormSection';
import FormTitle from './helpers/FormTitle';

import { observer, Provider, inject } from 'mobx-react';
import { decorate, observable } from 'mobx';

// if (process.env.NODE_ENV !== 'production') {
//     const { whyDidYouUpdate } = require('why-did-you-update');
//     whyDidYouUpdate(React);
// }

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instance: props.instance
        };
        this.onUpdate = this.onUpdate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderSectionTabPane = this.renderSectionTabPane.bind(this);
    }

    static getDerivedStateFromError(error) {
        console.log(error);
        return { hasError: true };
    }

    componentDidMount() {
        const { instance } = this.state;
        if (instance.isValid()) {
            instance.validate();
        }
    }

    renderFormTitle() {
        const { instance } = this.state;
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

    renderTabbedSections(sections) {
        return (
            <Tabs stacked id={`form-tabs-${this.props.instance.getId()}`} defaultActiveKey={0}>
                {this.renderSectionContent(sections)}
            </Tabs>
        );
    }

    renderSectionContent(sections) {
        return sections.map(this.renderSectionTabPane);
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
                onUpdate={this.onUpdate}
                submitButton={this.props.hideTitle ? this.renderSubmitButton() : null}
            />
        );
    }

    getDerivedSectionTitle(section) {
        if (!this.state.instance.sectionHasError(section)) return section.title;
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
        const { instance } = this.state;
        const { onSubmit } = this.props;
        instance.validateOnSubmit();
        if (onSubmit) onSubmit();
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.log(error);
    }

    onUpdate(event, id) {
        const { instance } = this.state;
        const { onUpdate } = this.props;

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
        const { instance } = this.state;
        const { hideTitle, hideSectionTitles, hideSectionSubtitles } = this.props;

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

        const sections = instance.getSections();

        // No sections
        if (isEmpty(sections)) {
            return <em className="has-text-danger">No sections</em>;
        }

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    flexShrink: 0,
                    border: '1px solid #dbdbdb'
                }}
            >
                {this.renderFormTitle(instance)}
                <Provider instance={instance} color="red">
                    {sections.length > 1
                        ? this.renderTabbedSections(sections)
                        : this.renderSingleSection(sections[0])}
                </Provider>
            </div>
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
