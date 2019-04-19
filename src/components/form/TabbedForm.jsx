import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Tabs, Tab } from 'react-tabify';

import { Asterisk } from '../util';

import FormSubmitButton from './helpers/FormSubmitButton';
import FormSection from './FormSection';

@inject('instance', 'hideTitle', 'onSubmit')
@observer
class TabbedForm extends Component {
    getDerivedSectionTitle(instance, section) {
        if (!instance.validationMap.sections[section.id]) return section.title;
        return (
            <span>
                {section.title} <Asterisk />
            </span>
        );
    }

    renderSubmitButton() {
        return <FormSubmitButton onSubmit={this.props.onSubmit} label={this.props.submitButtonLabel} />;
    }

    render() {
        const { instance, hideSectionTitles, hideSectionSubtitles } = this.props;

        console.log('Rendering TabbedForm');

        return (
            <Tabs stacked id={`form-tabs-${instance.getId()}`} defaultActiveKey={0}>
                {instance.getSections().map((section, index) => (
                    <Tab key={index} eventKey={index} label={this.getDerivedSectionTitle(instance, section)}>
                        <FormSection
                            section={section}
                            isTabbed={true}
                            onUpdate={this.props.onUpdate}
                            submitButton={this.props.hideTitle ? this.renderSubmitButton() : null}
                        />
                    </Tab>
                ))}
            </Tabs>
        );
    }
}

TabbedForm.propTypes = {
    instance: PropTypes.object.isRequired,
    submitButtonLabel: PropTypes.string,
    hideTitle: PropTypes.bool,
    hideSectionTitles: PropTypes.bool,
    hideSectionSubtitles: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onSubmit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func
};

export default TabbedForm;
