import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Tabs, Tab } from 'react-tabify';

import { Asterisk } from '../../util/index';

import FormSubmitButton from '../helpers/FormSubmitButton';
import FormSection from '../FormSection';

@inject('instance', 'hideFormTitle')
@observer
class TabbedSections extends Component {
    static propTypes = {
        instance: PropTypes.instanceOf(Object).isRequired,
        hideFormTitle: PropTypes.bool,
        submitButtonLabel: PropTypes.string,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    };

    getDerivedSectionTitle(instance, section) {
        if (!instance.validationMap.sections[section.id]) return section.title;
        return (
            <span>
                {section.title} <Asterisk />
            </span>
        );
    }

    renderSubmitButton() {
        return <FormSubmitButton label={this.props.submitButtonLabel} />;
    }

    render() {
        const { instance } = this.props;

        console.log('Rendering TabbedForm', instance);

        return (
            <Tabs stacked id={`form-tabs-${instance.getId()}`} defaultActiveKey={0}>
                {instance.getSections().map((section, index) => (
                    <Tab key={index} eventKey={index} label={this.getDerivedSectionTitle(instance, section)}>
                        <FormSection
                            section={section}
                            isTabbed={true}
                            submitButton={this.props.hideFormTitle ? this.renderSubmitButton() : null}
                        />
                    </Tab>
                ))}
            </Tabs>
        );
    }
}

export default TabbedSections;
