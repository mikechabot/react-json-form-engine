import React from 'react';
import PropTypes from 'prop-types';

import FormSubsectionTitle from './helpers/FormSubsectionTitle';
import FormSubsection from './FormSubsection';
import { Tabs, Tab } from '../common/tabs';
import { Flex } from '../common';

class FormSection extends React.Component {
    render() {
        const { section } = this.props;
        const { subsections } = section;

        return (
            <Flex id={section.id} flexShrink={0}>
                {this._renderSubsections(section, subsections)}
            </Flex>
        );
    }

    _renderSubsections(section, subsections) {
        return subsections.length === 1
            ? this._renderSingleSubsection(subsections[0])
            : this._renderTabs(section, subsections);
    }

    _renderTabs(section, subsections) {
        return (
            <Tabs id={`${section.id}-subsection-tabs`} defaultActiveKey={0}>
                {subsections.map(this._renderSubsectionTab.bind(this, this.props.instance))}
            </Tabs>
        );
    }

    _renderSubsectionTab(instance, subsection, index) {
        return (
            <Tab
                key={index}
                eventKey={index}
                label={<FormSubsectionTitle subsection={subsection} instance={instance} isTab={true} />}
            >
                {this._renderSingleSubsection(subsection, true)}
            </Tab>
        );
    }

    _renderSingleSubsection(subsection, hideTitle) {
        const { instance, onUpdate } = this.props;
        return (
            <FormSubsection
                hideTitle={hideTitle}
                title={subsection.title}
                subsection={subsection}
                instance={instance}
                onUpdate={onUpdate}
            />
        );
    }
}

FormSection.propTypes = {
    section: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subsections: PropTypes.array.isRequired
    }),
    onUpdate: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired
};

export default FormSection;
