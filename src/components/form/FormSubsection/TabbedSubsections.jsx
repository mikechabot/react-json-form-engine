import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Tabs, Tab } from 'react-tabify';

import { Asterisk } from '../../util';
import FormSubsection from './';
import { COMMON_PROPERTY, PROPERTY } from '../../../form-engine/config/form-const';

const { ID, TITLE } = COMMON_PROPERTY;
const {
    SECTION: { SUBSECTIONS }
} = PROPERTY;

@inject('instance', 'hideFormTitle', 'hideSubsectionTitles', 'hideSubsectionSubtitles', 'submitButtonLabel')
@observer
class TabbedSubsections extends Component {
    static propTypes = {
        instance: PropTypes.instanceOf(Object).isRequired,
        section: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            subsections: PropTypes.array.isRequired
        })
    };

    getTabbedTitle(subsection) {
        const { instance } = this.props;
        if (!instance.subsectionHasError(subsection[ID])) return subsection[TITLE];
        return (
            <span>
                {subsection[TITLE]} <Asterisk />
            </span>
        );
    }

    render() {
        const { section } = this.props;
        if (!section) return;
        return (
            <Tabs id={`${section[ID]}-subsection-tabs`} defaultActiveKey={0}>
                {section[SUBSECTIONS].map((subsection, index) => (
                    <Tab key={index} eventKey={index} label={this.getTabbedTitle(subsection)}>
                        <FormSubsection isTabbed={true} hideSubsectionTitles={true} subsection={subsection} />
                    </Tab>
                ))}
            </Tabs>
        );
    }
}

export default TabbedSubsections;
