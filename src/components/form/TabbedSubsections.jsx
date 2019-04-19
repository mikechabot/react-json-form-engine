import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-tabify';

import { Asterisk } from '../util';
import FormSubsection from './FormSubsection';
import { inject, observer } from 'mobx-react';

@inject('instance')
@observer
class TabbedSubsections extends Component {
    getDerivedSubsectionTitle(subsection) {
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
        const { subsections } = section;

        console.log('Rendering FormSection', section.title);

        return (
            <Tabs id={`${section.id}-subsection-tabs`} defaultActiveKey={0}>
                {subsections.map((subsection, index) => (
                    <Tab key={index} eventKey={index} label={this.getDerivedSubsectionTitle(subsection)}>
                        <FormSubsection
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

TabbedSubsections.propTypes = {
    section: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subsections: PropTypes.array.isRequired
    }),
    submitButton: PropTypes.node
};

export default TabbedSubsections;
