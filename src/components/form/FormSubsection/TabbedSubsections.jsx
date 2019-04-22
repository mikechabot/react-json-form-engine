import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Tabs, Tab } from 'react-tabify';

import { Asterisk } from '../../util';
import FormSubsection from './';

@inject('instance', 'hideFormTitle', 'hideSubsectionTitles', 'hideSubsectionSubtitles', 'submitButtonLabel')
@observer
class TabbedSubsections extends Component {
    static propTypes = {
        instance: PropTypes.instanceOf(Object).isRequired,
        section: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            subsections: PropTypes.array.isRequired
        }),
        submitButton: PropTypes.node
    };

    getTabbedTitle(subsection) {
        const { instance } = this.props;
        if (!instance.validationMap.subsections[subsection.id]) return subsection.title;
        return (
            <span>
                {subsection.title} <Asterisk />
            </span>
        );
    }

    render() {
        const { section } = this.props;
        if (!section) return;
        return (
            <Tabs id={`${section.id}-subsection-tabs`} defaultActiveKey={0}>
                {section.subsections.map((subsection, index) => (
                    <Tab key={index} eventKey={index} label={this.getTabbedTitle(subsection)}>
                        <FormSubsection
                            isTabbed={true}
                            hideSubsectionTitles={true}
                            subsection={subsection}
                            submitButton={this.props.submitButton}
                        />
                    </Tab>
                ))}
            </Tabs>
        );
    }
}

export default TabbedSubsections;
