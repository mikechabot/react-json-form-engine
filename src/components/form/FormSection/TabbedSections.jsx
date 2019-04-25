import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Tabs, Tab } from 'react-tabify';

import { Asterisk } from '../../util';

import FormSection from './';
import { PROPERTY } from '../../../form-engine/config/form-const';

const {
    SECTION: { ID, TITLE }
} = PROPERTY;

@inject('instance', 'hideFormTitle', 'hideSubsectionTitles', 'hideSubsectionSubtitles', 'submitButtonLabel')
@observer
class TabbedSections extends Component {
    static propTypes = {
        instance: PropTypes.instanceOf(Object).isRequired,
        hideFormTitle: PropTypes.bool,
        submitButtonLabel: PropTypes.string
    };

    getDerivedSectionTitle(instance, section) {
        return (
            <span>
                {section[TITLE]}&nbsp;
                {instance.sectionHasError(section[ID]) ? <Asterisk /> : null}
            </span>
        );
    }

    render() {
        const { instance } = this.props;
        return (
            <Tabs stacked id={`form-tabs-${instance.getId()}`} defaultActiveKey={0}>
                {instance.getSections().map((section, index) => (
                    <Tab key={index} eventKey={index} label={this.getDerivedSectionTitle(instance, section)}>
                        <FormSection section={section} isTabbed={true} />
                    </Tab>
                ))}
            </Tabs>
        );
    }
}

export default TabbedSections;
